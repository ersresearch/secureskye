/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 09:19:43 
 * @Last Modified by:   NhuHH 
 * @Last Modified time: 2018-11-13 09:19:43 
 */
/*
 *
 * VehicleAlert actions
 *
 */

import { GET_VEHICLE_ALERT_LIST, actionTypes } from './constants';
let typeAlert = '';

export function getVehicleAlerts() {
  return {
    type: GET_VEHICLE_ALERT_LIST.REQUEST,
  };
}

export function ignoreAlert(alertId, vehicleId) {
  return {
    type: actionTypes.IGNORE_ALERT.REQUEST,
    payload: {
      alertId,
      vehicleId,
    },
  };
}

export function getEcuId(ecuId) {
  return {
    type: actionTypes.GET_ECU_ID,
    ecuId,
  };
}
export function getVehicleAlertsList(vehicleId) {
  return {
    type: actionTypes.GET_VEHICLE_ALERT.REQUEST,
    payload: { vehicleId },
  };
}

export function getNormalFilter(vehicleId) {
  return {
    type: actionTypes.GET_NORMAL_FILTER.REQUEST,
    payload: { vehicleId },
  };
}

export function getVehicleAlertsFilter(vehicleId, type) {
  return {
    type: actionTypes.GET_VEHICLE_ALERT_FILTER.REQUEST,
    payload: { vehicleId, type },
  };
}
export function getVehicleAlertsFilterEcu(ecuId) {
  return {
    type: actionTypes.GET_VEHICLE_ALERT_FILTER_ECU.REQUEST,
    payload: { ecuId },
  };
}

export function getData(data) {
  return {
    type: actionTypes.GET_DATA,
    data,
  };
}

export function getAlertInfor(data) {
  return {
    type: actionTypes.GET_INFOR,
    data,
  };
}
export function resetCheckBox() {
  return {
    type: actionTypes.RESET_CHECK_BOX,
  };
}

export function getClickButton(status) {
  return {
    type: actionTypes.GET_CLICK_BUTTON,
    status,
  };
}

export function changeCheckBox() {
  return {
    type: actionTypes.CHANGE_CHECK_BOX,
  };
}
export function getDataEcu(vehicleId) {
  return {
    type: actionTypes.GET_DATA_ECU.REQUEST,
    payload: { vehicleId },
  };
}
export function getActiveAlert(data) {
  return {
    type: actionTypes.GET_ACTIVE_ALERT,
    data,
  };
}

export function changeFilterAlert(typeEcu) {
  if (typeEcu !== 'NORMAL') {
    typeAlert = typeEcu;
  }
  return {
    type: actionTypes.CHANGE_FILTER_ALERT,
    typeAlert,
  };
}
export function getAlertEcu(data) {
  return {
    type: actionTypes.GET_ALERT_ECU,
    data,
  };
}

export function handleChangeToggle(open) {
  return {
    type: actionTypes.HANDLE_CHANGE_TOGGLE,
    open,
  };
}
