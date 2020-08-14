/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:04:12 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-19 09:48:25
 */
import { actionTypes } from './constants';

export function changeStatusFuel(status) {
  return {
    type: actionTypes.CHANGE_STATUS_FUEL,
    payload: {
      status,
    },
  };
}
export function changeStatusOdo(status) {
  return {
    type: actionTypes.CHANGE_STATUS_ODO,
    payload: {
      status,
    },
  };
}
export function changeImage(file, imageURL) {
  return {
    type: actionTypes.CHANGE_IMAGE,
    payload: { file, imageURL },
  };
}
export function resetImage() {
  return {
    type: actionTypes.RESET_IMAGE,
  };
}
export function resetData() {
  return {
    type: actionTypes.RESET_DATA,
  };
}
export function selectedRow(id) {
  return {
    type: actionTypes.SELECTED_ROW_ID,
    payload: {
      id,
    },
  };
}
export function selectedRowInfor(row) {
  return {
    type: actionTypes.SELECTED_ROW_INFOR,
    row,
  };
}
export function getVehicles(params) {
  return {
    type: actionTypes.GET_VEHICLES.REQUEST,
    payload: {
      params,
    },
  };
}
export function getAllModel() {
  return {
    type: actionTypes.GET_ALL_MODEL.REQUEST,
  };
}
export function getOBDConfigure() {
  return {
    type: actionTypes.OBD_CONFIGURE.REQUEST,
  };
}
export function addOBDConfigure(deviceId, vehicleId) {
  return {
    type: actionTypes.ADD_OBD_CONFIGURE.REQUEST,
    payload: { deviceId, vehicleId },
  };
}
export function getOBDById(vehicleId) {
  return {
    type: actionTypes.GET_OBD_BY_ID.REQUEST,
    payload: { vehicleId },
  };
}
export function addVehicle(data) {
  return {
    type: actionTypes.ADD_VEHICLE.REQUEST,
    payload: { data },
  };
}
export function updateVehicle(vehicleId, data) {
  return {
    type: actionTypes.UPDATE_VEHICLE.REQUEST,
    payload: { vehicleId, data },
  };
}

export function deleteVehicle(body) {
  return {
    type: actionTypes.DELETE_VEHICLE.REQUEST,
    payload: {
      body,
    },
  };
}

export function displayDeleteDialog(id, status) {
  return {
    type: actionTypes.DELETE_VEHICLE_ID,
    payload: {
      id,
      status,
    },
  };
}
export function upLoadImage(vehicleId, file) {
  return {
    type: actionTypes.UPLOAD_IMAGE.REQUEST,
    payload: {
      vehicleId,
      file,
    },
  };
}

export function deleteVehicleList(list) {
  return {
    type: actionTypes.DELETE_VEHICLE_LIST,
    list,
  };
}

export function getVehicleById(vehicleId) {
  return {
    type: actionTypes.GET_VEHICLE_BY_ID.REQUEST,
    payload: { vehicleId },
  };
}

export function getListVehicle(data) {
  return {
    type: actionTypes.GET_LIST_VEHICLE,
    payload: { data },
  };
}
