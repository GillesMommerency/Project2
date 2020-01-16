# Imports
from flask import Flask, jsonify, request
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

@socketio.on('addQuestion')
def question(data):
    conn.set_data('INSERT INTO vraag (QuizId, vraaginhoud, JuistAntwoord, VerkeerdAntwoord1, VerkeerdAntwoord2, VerkeerdAntwoord3) values (1, %s, %s, %s, %s, %s)', ['test', 'test', 'test', 'test', 'test'])

# BACKEND - NIET WIJZIGEN!!
# # Deze route wordt gebruikt voor het ophalen van de movies per beginletter.
@app.route(endpoint + '/movies/alfabet/<letter>', methods=['GET'])
def getmovie_by_letter(letter):
    if request.method == 'GET':
        genres = conn.get_data(
            "SELECT * FROM movies WHERE original_title LIKE %s LIMIT 25", letter.upper() + "%")
        return jsonify(genres), 200


# BACKEND - NIET WIJZIGEN!!
# Deze route wordt gebruikt voor het ophalen van de keywords van een bepaalde movie.
@app.route(endpoint + '/movies/<movie_id>/keywords', methods=['GET'])
def getmoviekeywords(movie_id):
    if request.method == 'GET':
        keywords = conn.get_data(
            "SELECT k.keyword_name FROM keywords k INNER JOIN movie_keywords mk ON mk.keyword_id = k.keyword_id WHERE movie_id = %s", movie_id)
        return jsonify(keywords), 200


# BACKEND - NIET WIJZIGEN!!
# Deze route wordt gebruikt voor het 'verwijderen' van een movie.
@app.route(endpoint + '/movies/<movie_id>', methods=['DELETE'])
def movie(movie_id):
    if request.method == 'DELETE':
        test = conn.get_data(
            "SELECT id FROM movies WHERE id= %s", movie_id, True)
        if test:
            return jsonify(removed=test, message="Mocht dit een echte API zijn, dan zou de record verwijderd zijn, maar aangezien dit een examen is doen we alsof"), 200
        else:
            return jsonify(message="Deze API Call is niet helemaal correct"), 422


# BACKEND - NIET WIJZIGEN!!
# Deze route wordt gebruikt voor het ophalen van de genres in de keuzelijst
@app.route(endpoint + '/favorites', methods=['GET'])
def get_data():
    if request.method == 'GET':
        return jsonify(conn.get_data("SELECT * FROM movies ORDER BY vote_average ASC LIMIT 20")), 200


# SOCKET IO PART
# Dit stuk code runt online op https://drb-examen.azurewebsites.net/ en kan normaalgezien in commentaar blijven staan.
# import threading
# def publishQuote():
#     quotes = json.loads(
#         '[{"Quote":"“Frankly, my dear, I don\'t give a damn.”","Movie":"Gone With the Wind","Year":1939},{"Quote":"“I\'m going to make him an offer he # can\'t refuse.”","Movie":"The Godfather","Year":1972},{"Quote":"“You don\'t understand! I coulda had class. I coulda been a contender. I could\'ve been somebody, instead of a bum, which is what I am.”","Movie":"On the Waterfront","Year":1954},{"Quote":"“Toto, I\'ve got a feeling we\'re not in Kansas anymore.”","Movie":"The Wizard of Oz","Year":1939},{"Quote":"“Here\'s looking at you, kid.”","Movie":"Casablanca","Year":1942},{"Quote":"“Go ahead, make my day.”","Movie":"Sudden Impact","Year":1983},{"Quote":"“All right, Mr. DeMille, I\'m ready for my close-up.”","Movie":"Sunset Blvd.","Year":1950},{"Quote":"“May the Force be with you.”","Movie":"Star Wars","Year":1977},{"Quote":"“Fasten your seatbelts. It\'s going to be a bumpy night.”","Movie":"All About Eve","Year":1950},{"Quote":"“You talking to me?”","Movie":"Taxi Driver","Year":1976},{"Quote":"“What we\'ve got here is failure to communicate.”","Movie":"Cool Hand Luke","Year":1967},{"Quote":"“I love the smell of napalm in the morning.”","Movie":"Apocalypse Now","Year":1979},{"Quote":"“Love means never having to say you\'re sorry.”","Movie":"Love Story","Year":1970},{"Quote":"“The stuff that dreams are made of.”","Movie":"The Maltese Falcon","Year":1941},{"Quote":"“E.T. phone home.”","Movie":"E.T. The Extra-Terrestrial","Year":1982}]')
#     socketio.emit("quote", random.choice(quotes))
#     threading.Timer(15, publishQuote).start()
#
# publishQuote()


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                            SCHRIJF HIERONDER DE CODE VOOR DE BACKEND VANUIT POSTMAN                                             #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

# SCHRIJF HIERONDER DE CODE VOOR DE BACKEND VANUIT POSTMAN VOOR OEFENING 1
@app.route(endpoint + '/movies/<id>', methods=['GET'])
def getFilmById(id):
    if request.method == 'GET':
        return jsonify(conn.get_data("select * from movies where id like %s", id))

# SCHRIJF HIERONDER DE CODE VOOR DE BACKEND VANUIT POSTMAN VOOR OEFENING 2
@app.route(endpoint + '/keywords' , methods= ['GET', 'POST'])
def getKeywords():
    if request.method == 'GET':
        return jsonify(conn.get_data("select   M.id , M.original_title from movies as M join keywords as K, movie_keywords as MK where (M.id = MK.movie_id) and (MK.keyword_id  > 9986)"))
    elif request.method == 'POST':
        # get the data from the form method
        client_data = request.get_json()

        naam = client_data['keyword_name']


        new_client_id = conn.set_data(
            "INSERT INTO keywords(keyword_name) VALUES(%s);",
            [
                naam
            ]
        )
        return jsonify(klantId=new_client_id), 201

# SCHRIJF HIERONDER DE CODE VOOR DE BACKEND VANUIT POSTMAN VOOR OEFENING 3
@app.route(endpoint + '/genres/<id>' , methods=['GET', 'PUT'])
def getGenres(id):
    if request.method == 'GET':
        return jsonify(conn.get_data("select   M.id , M.original_title from movies as M join movie_genre as MG, genres as G where (M.id = MG.movie_id) and (MG.genre_id > 38)"))
    elif request.method == 'PUT':
        data = request.get_json()
        if ('genre_name') in data.keys():
            naam = data['genre_name']
            conn.set_data(
                'update genres set genre_name=%s where genre_id=%s',
                [naam, id])
            return jsonify(genre_id=id), 200
        else:
            return jsonify(status="Wrong inputs"), 400
# Start app
if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0", port=5000, debug=1)

