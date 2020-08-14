/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 08:54:07 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 08:54:07 
 */
import io from 'socket.io-client';
import { SocketIOUrl } from 'commons/constants';
// Example conf. You can move this to your config file.
// const host = 'http://192.168.99.100:3000';

export default class SocketClient {
  socket;

  connect() {
    if (this.status()) {
      return new Promise(resolve => resolve(true));
    }
    console.log(` init new connection to ${SocketIOUrl}`);
    this.socket = io(SocketIOUrl, {
      path: '/socketio/socket.io',
      rejectUnauthorized: false,
      autoConnect: false,
      query: {
        token: 'cde',
      },
    });
    this.socket.connect();
    return new Promise((resolve, reject) => {
      this.socket.on('connect', () => {
        console.log(`Connected socketio with id ${this.socket.id}`);
        return resolve();
      });
      this.socket.on('connect_error', error => reject(error));
    });
  }

  disconnect() {
    return new Promise(resolve => {
      this.socket.disconnect(() => {
        this.socket = null;
        resolve();
      });
    });
  }

  emit(event, data) {
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject(new Error('No socket connection.'));

      return this.socket.emit(event, data, response => {
        // Response is the optional callback that you can use with socket.io in every request. See 1 above.
        if (response.error) {
          console.error(response.error);
          return reject(response.error);
        }
        return resolve();
      });
    });
  }

  on(event, fun) {
    // No promise is needed here, but we're expecting one in the middleware.
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject(new Error('No socket connection.'));

      this.socket.on('connect', () => {
        this.socket.on(event, fun);
      });
      return resolve();
    });
  }

  status() {
    return this.socket !== undefined && this.socket.connected;
  }

  getInstance() {
    return this.socket;
  }
}
