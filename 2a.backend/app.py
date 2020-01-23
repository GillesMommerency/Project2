# Imports
from flask import Flask, jsonify, request, render_template, redirect
from flask_socketio import SocketIO
from flask_cors import CORS
# Custom imports
from DP1Database import Database
import base64
# import eventlet
# eventlet.monkey_patch()

# Start app
app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY']= 'Secret'
socketio = SocketIO(app, cors_allowed_origins='*')


conn = Database(app=app, user='root', password='root',
                db='quizdb', host='localhost', port=3306)
endpoint = '/api/v1'

logginIn = False
Username = ''
@socketio.on('my event')
def handle_my_custom_event(json):
    print('received json: ' + str(json))

@socketio.on("logout")
def connecting():
    global Username
    Username = ''
    print('gelukt')
    print(Username)
    socketio.emit('done')

@app.route(endpoint + '/quiz', methods=['GET'])
def alle_bestemmingen():
    if request.method == 'GET':
        global Username
        quizzes = conn.get_data("SELECT * FROM quiz WHERE Gebruikersnaam = '%s'" % (Username))
        return jsonify(quizzes),200

@app.route(endpoint + '/addVraag/<quizid>', methods = ['POST'])
def addVraag(quizid):
    data = request.get_json();
    ret = conn.set_data(
        'INSERT INTO vraag (QuizId, vraaginhoud, JuistAntwoord, VerkeerdAntwoord1, VerkeerdAntwoord2, VerkeerdAntwoord3) values (%s, %s, %s, %s, %s, %s)',
        [quizid ,data[0], data[1], data[2], data[3], data[4]])
    if ret == 0:
        return jsonify(ret), 204
    else:
        return jsonify(ret), 200

@app.route(endpoint + '/vraag/<vraagid>', methods = ['GET','PUT','DELETE'])
def vraag(vraagid):
    if request.method == 'GET':
        check = conn.get_data(
            "SELECT * FROM vraag where VraagId = '%s'" % vraagid)
        return jsonify(check), 200
    elif request.method == 'PUT':
        data = request.get_json()
        conn.set_data(
            'update vraag set vraaginhoud=%s, JuistAntwoord=%s, VerkeerdAntwoord1=%s, VerkeerdAntwoord2=%s, VerkeerdAntwoord3=%s where VraagId=%s',
            [data[0], data[1], data[2], data[3], data[4], vraagid])
        return jsonify(vraagid=vraagid), 200
    elif request.method == 'DELETE':
        ret = conn.delete_data('delete from vraag where VraagId=%s', vraagid)
        if ret == 0:
            return jsonify(message='No records were deleted'), 204
        else:
            return jsonify(message=f'{ret} record(s) were deleted'), 200

@app.route(endpoint + '/checkLogin', methods = ['POST'])
def checkLogin():
    data = request.get_json();
    check = conn.get_data("SELECT count(*) as Amount FROM login where Gebruikersnaam = '%s' and Wachtwoord = '%s'" % (data[0], data[1]))
    succes = check[0]['Amount']
    if succes:
        global Username
        Username = data[0]
        print(Username)
        return jsonify(check), 200
    else:
        return jsonify(check),200

@app.route(endpoint + '/Register', methods=['POST'])
def checkRegister():
    data = request.get_json();
    print(data)
    if usernameExists(data[0]):
        print('bestaat')
        return jsonify(True), 200

    else:
        conn.set_data(
            'INSERT INTO login (Gebruikersnaam, Wachtwoord) '
            'values (%s, %s)',
            [data[0], data[1]])
        print('bestaat niet')
        return jsonify(False), 200

def usernameExists(username):
    print('here')
    check = conn.get_data(
        "SELECT count(*) as Amount FROM login where Gebruikersnaam = '%s'" % username)
    succes = check[0]['Amount']
    print(succes)
    if succes>0:
        return True
    else:
        return False



def Encryption(s, k):
    encstr = ""
    for i in s:
        if (ord(i)) >= 65 and (ord(i) <= 90):
            temp = (ord(i) + k)
            if temp > 90:
                temp = temp % 90 + 64
            encstr = encstr + chr(temp)
        elif (ord(i)) >= 97 and (ord(i) <= 122):
            temp = (ord(i) + k)
            if temp > 122:
                temp = temp % 122 + 96
            encstr = encstr + chr(temp)
        else:
            encstr = encstr + chr(ord(i) + k)
    return encstr

def Decryption(s, k):
    p = Encryption(s, k)
    decstr = ""
    for i in p:
        if ((ord(i)) >= 65) and (ord(i)) <= 90:
            decstr = decstr + chr((ord(i) - k - 65) % 26 + 65)
        elif ((ord(i)) >= 97) and (ord(i)) <= 122:
            decstr = decstr + chr((ord(i) - k - 97) % 26 + 97)
        else:
            decstr = decstr + chr(ord(i) - k)
    return decstr

@app.route(endpoint + '/quiz/<quizid>', methods=['GET', 'DELETE'])
def quiz(quizid):
    if request.method == 'GET':
        return jsonify(conn.get_data(
            'select * from vraag WHERE quizid=%s',
            quizid))
    elif request.method == 'DELETE':
        conn.delete_data('delete from vraag where QuizId=%s', quizid)
        ret = conn.delete_data('delete from quiz where QuizId=%s', quizid)
        if ret == 0:
            return jsonify(message='No records were deleted'), 204
        else:
            return jsonify(message=f'{ret} record(s) were deleted'), 200


@app.route(endpoint + '/adding', methods=['POST'])
def addQuiz():
    data = request.get_json();
    global Username
    print('jipla')
    conn.set_data(
        'INSERT INTO Quiz (Naam, Gebruikersnaam) values (%s, %s)',
        [data[0], 'Gilles'])
    return jsonify("Added question!")

# Start app
if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0", port=5000, debug=1, use_reloader=0)

