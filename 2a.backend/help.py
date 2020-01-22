from flask import Flask, request, jsonify
from DP1Database import Database
from flask_socketio import SocketIO
from flask_cors import CORS

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins='*')
CORS(app)


@socketio.on("test")
def home():
    print('hello')


if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)
