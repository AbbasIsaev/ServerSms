import io from 'socket.io-client';
import {toast} from "react-toastify";
import {Enam} from "../utils/Enam";

const socket = io(process.env.API_URL);

// socket.on('connect', () => {
//   // console.log('connect');
// });

socket.on('disconnect', () => {
  toast.error(Enam.ERROR_CONNECT);
});

class Socket {
  static getAnswer(cb) {
    socket.on('message:new', message => {
      cb(null, message)
    });
  }

  static setDate(message, cb) {
    socket.emit('message:create', message, error => {
      if (error) {
        cb(error)
      } else {
        cb()
      }
    });
  }

  static setJoin(user, cb) {
    socket.emit('join', user, data => {
      if (typeof data === 'string') {
        cb(data, null)
      } else {
        cb(null, data)
      }
    })
  }

  static getAuth(provider, cb) {
    socket.on(`auth:${provider}`, data => {
      cb(null, data)
    });
  }

  static offAll() {
    socket.off();
  }

  static off(eventStr) {
    socket.off(eventStr);
  }

  static getSocketId() {
    return socket.id
  }

}

export default Socket
