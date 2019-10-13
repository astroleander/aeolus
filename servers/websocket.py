from flask import Flask
from flask_socketio import SocketIO, emit

import time
import random
from threading import Lock

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")
thread = None
thread_lock = Lock()

@socketio.on("connect")
def connected():
    print('[socket.io] connected')

def threadFunc():
    while(True):
        print('[socket.io] send msg')
        emit("msg", "Hello web")
        socketio.sleep(3)

@socketio.on("msg")
def msg(msg):
    print('[socket.io][received]', msg)
    socketio.emit("msg", "Hello web")



if __name__ == "__main__":
    print('[socket.io] run at 22002')
    socketio.run(app, port=22002)


