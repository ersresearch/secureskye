/* eslint-disable no-underscore-dangle */
/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:04:38 
 * @Last Modified by: LoiDT2
 * @Last Modified time: 2018-12-14 11:29:26
 */
import { takeLatest, put as putRedux, select } from 'redux-saga/effects';
import _isEmpty from 'lodash/isEmpty';
import { get, post, patch, put } from 'utils/apiSaga';
import {
  getVehicleInfo,
  resetVehicleInfo,
} from 'containers/VehicleInfo/actions';
import { Snackbars } from 'components/Snackbars/index';
import api from 'commons/api/vehicles';
import { routerActions } from 'react-router-redux';
import { getDataEcu } from 'containers/VehicleAlert/actions';
import { makeSelectVehicle } from './selectors';
import { actionTypes } from './constants';
import {
  selectedRow,
  getVehicles,
  upLoadImage,
  addOBDConfigure,
  selectedRowInfor,
  getOBDById,
} from './actions';

export function* callApiGetVehicles(action) {
  const { params } = action.payload;
  yield get(api.vehicles(params), actionTypes.GET_VEHICLES);
  const vehicle = yield select(makeSelectVehicle());
  if (!_isEmpty(vehicle.data)) {
    yield putRedux(getVehicleInfo(vehicle.data[0].id));
    yield putRedux(selectedRow(vehicle.data[0].id));
    yield putRedux(getDataEcu(vehicle.data[0].id));
  } else {
    yield putRedux(resetVehicleInfo());
  }
}

export function* callApiGetVehicleById(action) {
  const { vehicleId } = action.payload;
  const reponse = yield get(
    api.vehicleById(vehicleId),
    actionTypes.GET_VEHICLE_BY_ID,
  );
  if (reponse.data !== undefined) {
    yield putRedux(selectedRowInfor(reponse.data));
    yield putRedux(getOBDById(vehicleId));
  }
}

export function* callApiGetAllModel() {
  yield get(api.model, actionTypes.GET_ALL_MODEL);
}

export function* callApiGetOBDConfigure() {
  yield get(api.odb2Unregister, actionTypes.OBD_CONFIGURE);
}

export function* callApiAddVehicle(action) {
  const { data } = action.payload;
  const vehicle = yield select(makeSelectVehicle());
  const deviceId = data.OBDConfig;

  const reponse = yield post(api.vehicles(), actionTypes.ADD_VEHICLE, data);
  if (reponse.status <= 200 && _isEmpty(vehicle.file)) {
    const vehicleId = reponse.data.vehicle.id;
    if (vehicle.file) {
      const formData = new FormData();
      formData.append('file', vehicle.file);
      yield putRedux(upLoadImage(vehicleId, formData));
    }
    if (deviceId) {
      yield putRedux(addOBDConfigure(deviceId, vehicleId));
    }
    yield putRedux(routerActions.push('/fleet-ui/vehicle-list'));
    yield putRedux(getVehicles());
    Snackbars(reponse.status, `Create vehicle successfully`);
  } else {
    Snackbars(reponse.status, reponse.data.message);
  }
}

export function* callApiUpdateVehicle(action) {
  const { vehicleId, data } = action.payload;
  const reponse = yield put(
    api.vehicleById(vehicleId),
    actionTypes.UPDATE_VEHICLE,
    data,
  );
  if (reponse.status <= 200) {
    yield putRedux(routerActions.push('/fleet-ui/vehicle-list'));
    yield putRedux(getVehicles());
    Snackbars(reponse.status, `Update vehicle successfully`);
  } else {
    Snackbars(reponse.status, reponse.data.message);
  }
}

export function* callApiAddOBDConfigure(action) {
  const { deviceId, vehicleId } = action.payload;
  yield put(
    api.obd2DeviceVehicle(deviceId, vehicleId),
    actionTypes.ADD_OBD_CONFIGURE,
  );
}

export function* callApiGetOBDById(action) {
  const { vehicleId } = action.payload;
  yield get(api.odb2Devices(vehicleId), actionTypes.GET_OBD_BY_ID);
}

export function* callApiUpLoadImage(action) {
  const { vehicleId, file } = action.payload;
  const reponse = yield patch(
    api.vehicleImage(vehicleId),
    actionTypes.UPLOAD_IMAGE,
    file,
  );
  if (reponse.status <= 200) {
    yield putRedux(getVehicles());
  }
}

export function* callApiDeleteVehicle(action) {
  const { body } = action.payload;
  const reponse = yield patch(api.vehicles(), actionTypes.DELETE_VEHICLE, body);
  if (reponse.status <= 200) {
    yield putRedux(getVehicles());
    Snackbars(reponse.status, `Delete vehicle successfully`);
  } else {
    Snackbars(reponse.status, reponse.data.message);
  }
}

export default function* UserManagement() {
  yield [
    takeLatest(actionTypes.GET_VEHICLES.REQUEST, callApiGetVehicles),
    takeLatest(actionTypes.DELETE_VEHICLE.REQUEST, callApiDeleteVehicle),
    takeLatest(actionTypes.GET_ALL_MODEL.REQUEST, callApiGetAllModel),
    takeLatest(actionTypes.ADD_VEHICLE.REQUEST, callApiAddVehicle),
    takeLatest(actionTypes.UPDATE_VEHICLE.REQUEST, callApiUpdateVehicle),
    takeLatest(actionTypes.UPLOAD_IMAGE.REQUEST, callApiUpLoadImage),
    takeLatest(actionTypes.OBD_CONFIGURE.REQUEST, callApiGetOBDConfigure),
    takeLatest(actionTypes.GET_VEHICLE_BY_ID.REQUEST, callApiGetVehicleById),
    takeLatest(actionTypes.GET_OBD_BY_ID.REQUEST, callApiGetOBDById),
    takeLatest(actionTypes.ADD_OBD_CONFIGURE.REQUEST, callApiAddOBDConfigure),
  ];
}
