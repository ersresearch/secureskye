/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:22:15 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 09:22:15 
 */
import { ShowNotify } from 'utils/actionUtils';
import {
  actionTypes,
  MAX_VALUE_SPEED,
  MIN_VALUE,
  SPEED_MESSAGE,
  MAX_VALUE_RPM,
  RPM_MESSAGE,
  MAX_VALUE_FUEL,
  FUEL_MESSAGE,
  MAX_VALUE_ENGINE,
  ENGINE_MESSAGE,
  MAX_VALUE_TRIP_ODO,
  ODO_MESSAGE,
  TRIP_MESSAGE,
} from './constants';

const joinNotificationRoom = vehicleId => dispatch =>
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
        console.log('socket vehicleId', vehicleId);
        // instance.on('ecu-alert-for-vehicle-d5d7d4a9-ba7d-11e8-bf87-0242ac12000a', data => {
        //   console.log('data in a new topic', data);
        // });
        instance.on(vehicleId, data => {
          const carInfo = JSON.parse(data.body);
          // console.log('vehicleId', vehicleId);
          // console.log('checkData', carInfo);
          carInfo.data[0].speed = carInfo.data[0].speed || 0;
          carInfo.data[0].rpm = carInfo.data[0].rpm || 0;
          carInfo.data[0].fuel = carInfo.data[0].fuel || 0;
          carInfo.data[0].availableDrivingDistance =
            carInfo.data[0].availableDrivingDistance || 0;
          carInfo.data[0].engineCoolant = carInfo.data[0].engineCoolant || 0;
          carInfo.data[0].odometer = carInfo.data[0].odometer || 0;
          carInfo.data[0].tripOdometer = carInfo.data[0].tripOdometer || 0;
          const action = {
            type: actionTypes.GET_CAR_INFO.SUCCESS,
            payload: carInfo,
          };
          dispatch(action);
          if (
            carInfo.data[0].speed > MAX_VALUE_SPEED ||
            carInfo.data[0].speed < MIN_VALUE
          ) {
            ShowNotify('warning', SPEED_MESSAGE);
          }
          if (
            carInfo.data[0].rpm > MAX_VALUE_RPM ||
            carInfo.data[0].rpm < MIN_VALUE
          ) {
            ShowNotify('warning', RPM_MESSAGE);
          }
          if (
            carInfo.data[0].fuel > MAX_VALUE_FUEL ||
            carInfo.data[0].fuel < MIN_VALUE
          ) {
            ShowNotify('warning', FUEL_MESSAGE);
          }
          if (
            carInfo.data[0].engineCoolant > MAX_VALUE_ENGINE ||
            carInfo.data[0].engineCoolant < MIN_VALUE
          ) {
            ShowNotify('warning', ENGINE_MESSAGE);
          }
          if (
            carInfo.data[0].odometer > MAX_VALUE_TRIP_ODO ||
            carInfo.data[0].odometer < MIN_VALUE
          ) {
            ShowNotify('warning', ODO_MESSAGE);
          }
          if (
            carInfo.data[0].tripOdometer > MAX_VALUE_TRIP_ODO ||
            carInfo.data[0].tripOdometer < MIN_VALUE
          ) {
            ShowNotify('warning', TRIP_MESSAGE);
          }
        });
        return resolve();
      }),
  });

const leaveNotificationRoom = vehicleId => dispatch =>
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
        instance.removeListener(vehicleId);
        return resolve();
      }),
  });

export { joinNotificationRoom, leaveNotificationRoom };
