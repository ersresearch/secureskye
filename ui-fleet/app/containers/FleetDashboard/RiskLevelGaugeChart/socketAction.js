/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:02:01 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 09:02:01 
 */
import { actionTypes, MAX_VALUE_RISK, MIN_VALUE_RISK } from './constants';

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

        instance.on('info_riskCurrent', data => {
          const action = {
            type: actionTypes.GET_DATA_CURRENT.SUCCESS,
            payload: data.value,
          };
          dispatch(action);
          const riskValueWarning = {
            type: 'SHOW_TOAST_ALERT',
            payload: actionTypes.RISK_VALUE_MESSAGE,
          };
          if (data.value > MAX_VALUE_RISK || data.value < MIN_VALUE_RISK) {
            dispatch(riskValueWarning);
          }
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
        instance.removeListener('info_riskCurrent');
        return resolve();
      }),
  });

export { joinNotificationRoom, leaveNotificationRoom };
