/*
 * @Author: DatNT62 
 * @Date: 2018-11-13 09:04:54 
 * @Last Modified by:   DatNT62 
 * @Last Modified time: 2018-11-13 09:04:54 
 */
import ActionTypes from './constants';

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
        console.log('try to join DeviceData room');
        console.log('socket', socket);
        // get socket instance for work
        const instance = socket.getInstance();
        instance.emit('join_room_action', 'DeviceData');
        console.log('socket vehicleId', vehicleId);
        instance.on(`ecu-alert-for-vehicle-${vehicleId}`, data => {
          console.log('data in a new topic', data);
          const action = {
            type: ActionTypes.ADD_A_MARKER_ALERT.SUCCESS,
            payload: data,
          };
          dispatch(action);
          const marker = data.body[0];
          const actionToGetAddress = {
            type: ActionTypes.GET_PLACE_NAME.REQUEST,
            payload: marker,
          };
          dispatch(actionToGetAddress);
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
        instance.removeListener(`ecu-alert-for-vehicle-${vehicleId}`);
        return resolve();
      }),
  });

export { joinDeviceDataRoom, leaveDeviceDataRoom };
