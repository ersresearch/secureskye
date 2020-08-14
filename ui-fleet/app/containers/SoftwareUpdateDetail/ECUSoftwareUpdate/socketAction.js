/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 08:54:37 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-05 11:00:57
 */
import { getDataCurrent, getData } from '../actions';

const checkSocketIOConnection = () => ({
  type: 'socket',
  types: ['INIT_SOCKETIO', 'INIT_SOCKETIO_SUCCESS', 'INIT_SOCKETIO_FAILURE'],
  promise: socket =>
    new Promise((resolve, reject) => {
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

const joinNotificationRoom = ecuId => dispatch =>
  dispatch({
    type: 'socket',
    types: [
      'JOIN_NOTIFICAITON_ROOM',
      'JOIN_NOTICAITON_ROOM_SUCCESS',
      'JOIN_NOTICAITON_ROOM_FAILURE',
    ],
    promise: socket =>
      new Promise(resolve => {
        dispatch(checkSocketIOConnection());
        // get socket instance for work
        const instance = socket.getInstance();
        instance.emit('join_room_action', 'software-version-channel');
        console.log('socket ecuId', ecuId);
        instance.on(`newest-installation-status-ecu-${ecuId}`, data => {
          console.log('data socket', JSON.parse(data.body));
          const dataSoftware = JSON.parse(data.body);
          console.log('data socket dataSoftware', dataSoftware);
          dispatch(getData(ecuId));
          dispatch(getDataCurrent(dataSoftware));
        });
        return resolve();
      }),
  });

export { checkSocketIOConnection, joinNotificationRoom };
