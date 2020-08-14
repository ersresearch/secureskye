/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 08:59:38 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 08:59:38 
 */
/*
 *
 * AlertDashboard actions
 *
 */
import { routerActions } from 'react-router-redux';
import { changeFilterVehicle } from 'containers/FleetVehicle/VehicleList/actions';
import { actionTypes } from './constants';

export const goToVehicleList = () => async dispatch => {
  await dispatch(routerActions.push('/fleet-ui/fleet-vehicle'));
  await dispatch(changeFilterVehicle('HAS_ALERT'));
};
export const goToVehicleSecurity = () => dispatch => {
  dispatch(routerActions.push('/vehicle-security'));
};
export function getDataAlert() {
  return {
    type: actionTypes.GET_ALERT_DASHBOARD.REQUEST,
  };
}
export function getAlertSocket(data) {
  return {
    type: actionTypes.GET_ALERT_SOCKET.SUCCESS,
    payload: data,
  };
}
export function getAlertFilter() {
  return {
    type: actionTypes.GET_ALERT_DATA.SUCCESS,
  };
}
export function getCriticalFilter() {
  return {
    type: actionTypes.GET_CRITICAL_DATA.SUCCESS,
  };
}
export function getInformationFilter() {
  return {
    type: actionTypes.GET_INFORMATION_DATA.SUCCESS,
  };
}
export function handleChangeButtonAlert(filter) {
  return {
    type: actionTypes.HANDLE_CHANGE_BUTTON_ALERT,
    filter,
  };
}
export function getClickButton(type, id) {
  let status = null;
  switch (id) {
    case 0:
      status = 'alert';
      break;
    case 1:
      status = 'critical';
      break;
    case 2:
      status = 'normal';
      break;
    default:
      return null;
  }
  if (type === status) {
    status = 'all';
  }
  return {
    type: actionTypes.GET_CLICK_BUTTON,
    status,
  };
}
