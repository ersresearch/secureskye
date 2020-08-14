/*
 * @Author: DatNT62 
 * @Date: 2018-11-13 08:57:46 
 * @Last Modified by:   DatNT62 
 * @Last Modified time: 2018-11-13 08:57:46 
 */
import { getTotalVehicleCurrent } from './actions';

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

const joinVehicleOnlineStatisticRoom = () => dispatch =>
  dispatch({
    type: 'socket',
    types: [
      'JOIN_VEHICLE_ONLINE_STATISTIC_ROOM',
      'JOIN_VEHICLE_ONLINE_STATISTIC_ROOM_SUCCESS',
      'JOIN_VEHICLE_ONLINE_STATISTIC_ROOM_FAILURE',
    ],
    promise: socket =>
      new Promise(resolve => {
        console.log('try to join vehicle online statistic  room');
        console.log('socket', socket);
        dispatch(checkSocketIOConnection());
        // get socket instance for work
        const instance = socket.getInstance();
        instance.emit('join_room_action', 'VEHICLE_ONLINE_STATISTIC');
        instance.on('vehicleStatistic', data => {
          dispatch(getTotalVehicleCurrent(data.body));
        });
        return resolve();
      }),
  });

const leaveVehicleOnlineStatisticRoom = () => dispatch =>
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
        instance.removeListener('vehicleStatistic');
        return resolve();
      }),
  });

export {
  checkSocketIOConnection,
  joinVehicleOnlineStatisticRoom,
  leaveVehicleOnlineStatisticRoom,
};
