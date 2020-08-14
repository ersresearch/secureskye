/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:01:01 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 09:01:01 
 */
import { getAlertSocket } from './actions';

const checkSocketIOConnection = () => ({
  type: 'socket',
  types: ['INIT_SOCKETIO', 'INIT_SOCKETIO_SUCCESS', 'INIT_SOCKETIO_FAILURE'],
  promise: socket =>
    new Promise((resolve, reject) => {
      console.log(socket.status());
      if (!socket.status()) {
        socket.connect().then(() => {
          const instance = socket.getInstance();
          if (instance.connected) {
            console.log('inited connection');
            return resolve();
          }
          console.log('fail to init connection');
          return reject();
        });
      }
      return resolve();
    }),
});

const joinNotificationRoom = () => dispatch =>
  dispatch({
    type: 'socket',
    types: [
      'JOIN_NOTIFICAITON_ROOM',
      'JOIN_NOTICAITON_ROOM_SUCCESS',
      'JOIN_NOTICAITON_ROOM_FAILURE',
    ],
    promise: socket =>
      new Promise(resolve => {
        console.log('try to join notification room');
        console.log(socket.status());
        dispatch(checkSocketIOConnection());
        // get socket instance for work
        const instance = socket.getInstance();

        instance.on('alert_dashboard', data => {
          // console.log("datasocket", data);
          dispatch(getAlertSocket(data));
        });
        return resolve();
      }),
  });

const leaveNotificationRoom = () => dispatch =>
  dispatch({
    type: 'socket',
    types: [
      'LEAVE_SOCKETIO',
      'LEAVE_SOCKETIO_SUCCESS',
      'LEAVE_SOCKETIO_FAILURE',
    ],
    promise: socket =>
      new Promise(resolve => {
        // get socket instance for work
        const instance = socket.getInstance();
        instance.removeListener('alert_dashboard');
        return resolve();
      }),
  });

export { checkSocketIOConnection, joinNotificationRoom, leaveNotificationRoom };
