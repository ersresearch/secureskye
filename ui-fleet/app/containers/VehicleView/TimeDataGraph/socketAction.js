import ActionTypes from './constants';

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
        // get socket instance for work
        const instance = socket.getInstance();
        instance.on('infor_time_data_graph', data => {
          const action = {
            type: ActionTypes.ADD_DATA,
            payload: data.payload,
          };
          dispatch(action);
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
        instance.removeListener('infor_time_data_graph');
        return resolve();
      }),
  });

export { joinNotificationRoom, leaveNotificationRoom };
