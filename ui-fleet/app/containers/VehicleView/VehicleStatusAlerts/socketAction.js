import { getComponentAlertsCurrent } from './actions';

const joinDeviceDataRoom = vehicleId => dispatch =>
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
        console.log('socket', socket);
        // get socket instance for work
        const instance = socket.getInstance();
        instance.emit('join_room_action', 'DeviceData');
        // join room "admin" --> change it by replacing current username from state
        instance.on(`obd2-component-status-for-vehicle-${vehicleId}`, data => {
          dispatch(getComponentAlertsCurrent(data.body));
        });
        return resolve();
      }),
  });

const leaveDeviceDataRoom = vehicleId => dispatch =>
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
        instance.removeListener(
          `obd2-component-status-for-vehicle-${vehicleId}`,
        );
        return resolve();
      }),
  });

export { joinDeviceDataRoom, leaveDeviceDataRoom };
