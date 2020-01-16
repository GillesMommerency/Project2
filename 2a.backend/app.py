# Imports
from flask import Flask, jsonify, request, render_template, redirect
from flask_socketio import SocketIO
from flask_cors import CORS
# Custom imports
from DP1Database import Database


# Start app
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app)

conn = Database(app=app, user='root', password='root',
                db='quizdb', host='localhost', port=3306)
endpoint = '/api/v1'

@app.route(endpoint + '/addVraag', methods = ['POST'])
def addVraag():
    data = request.get_json();
    list = []
    for key in data:
        list.append(key)
    conn.set_data(
        'INSERT INTO vraag (QuizId, vraaginhoud, JuistAntwoord, VerkeerdAntwoord1, VerkeerdAntwoord2, VerkeerdAntwoord3) values (1, %s, %s, %s, %s, %s)',
        [list[0], list[1], list[2], list[3], list[4]])
    return "Added question!"

@app.route(endpoint + '/checkLogin', methods = ['POST'])
def checkLogin():
    data = request.get_json();
    list = []
    for key in data:
        list.append(key)
    print(list)
    check = conn.get_data("SELECT * FROM login where Gebruikersnaam = '%s' and Wachtwoord = '%s'" % (list[0], list[1]))
    print(check)
    return jsonify(check), 200

# Start app
if __name__ == '__main__':
    socketio.run(app, host="127.0.0.1", port=5000, debug=1, use_reloader=0)

