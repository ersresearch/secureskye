import { getAnomaliesCurrent } from './actions';

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
        // get socket instance for work
        const instance = socket.getInstance();

        // join room "admin" --> change it by replacing current username from state
        instance.on('infor_anomaliesChart', data => {
          dispatch(getAnomaliesCurrent(data));
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
        instance.removeListener('infor_anomaliesChart');
        return resolve();
      }),
  });

export { joinNotificationRoom, leaveNotificationRoom };
