/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 09:20:35 
 * @Last Modified by: LoiDT2
 * @Last Modified time: 2018-12-03 16:57:14
 */
import { takeEvery, put, select } from 'redux-saga/effects';
import { get, post } from 'utils/apiSaga';
import vehicleAlert from 'commons/api/vehicleAlert';
import { getDataMenu } from 'containers/VehicleMenu/actions';
import { getData } from 'containers/VehicleSoftwareUpdate/action';
import { makeSelectCarAlerts } from 'containers/VehicleAlert/CarAlerts/selectors';
import { actionTypes } from './constants';
import { getVehicleAlertsList, getVehicleAlertsFilter } from './actions';

export function* vehicleAlertList(action) {
  const { vehicleId } = action.payload;
  yield get(
    vehicleAlert.vehicleAlertComponent(vehicleId),
    actionTypes.GET_VEHICLE_ALERT,
  );
}

export function* vehicleAlertFilter(action) {
  const { vehicleId, type } = action.payload;
  yield get(
    vehicleAlert.vehicleAlertFilter(vehicleId, type),
    actionTypes.GET_VEHICLE_ALERT_FILTER,
  );
}

export function* vehicleAlertFilterEcu(action) {
  const { ecuId } = action.payload;
  yield get(
    vehicleAlert.vehicleAlertFilterEcu(ecuId),
    actionTypes.GET_VEHICLE_ALERT_FILTER_ECU,
  );
}

export function* vehicleAlertNormalFilter(action) {
  const { vehicleId } = action.payload;
  yield get(
    vehicleAlert.vehicleAlertNormalFilter(vehicleId),
    actionTypes.GET_NORMAL_FILTER,
  );
}
export function* vehicleAlertGetEcu(action) {
  const { vehicleId } = action.payload;
  const response = yield get(
    vehicleAlert.vehicleAlertEcu(vehicleId),
    actionTypes.GET_DATA_ECU,
  );
  if (response.data) {
    yield put(getDataMenu(response.data.ecuInfo));
  }
}

export function* ignoreAlertSaga(action) {
  const carAlert = yield select(makeSelectCarAlerts());
  const { alertId, vehicleId } = action.payload;
  yield post(vehicleAlert.ignoreAlert(alertId), actionTypes.IGNORE_ALERT);
  yield put(getData(vehicleId));
  if (carAlert.statusEcu !== 'ALL') {
    yield put(getVehicleAlertsFilter(vehicleId, carAlert.statusEcu));
  } else {
    yield put(getVehicleAlertsList(vehicleId));
  }
}

export default function* vehicleAlerts() {
  // yield takeEvery(GET_VEHICLE_ALERT_LIST.REQUEST, callApiGetVehicleAlert);
  yield takeEvery(actionTypes.GET_VEHICLE_ALERT.REQUEST, vehicleAlertList);
  yield takeEvery(
    actionTypes.GET_VEHICLE_ALERT_FILTER.REQUEST,
    vehicleAlertFilter,
  );
  yield takeEvery(
    actionTypes.GET_VEHICLE_ALERT_FILTER_ECU.REQUEST,
    vehicleAlertFilterEcu,
  );
  yield takeEvery(
    actionTypes.GET_NORMAL_FILTER.REQUEST,
    vehicleAlertNormalFilter,
  );
  yield takeEvery(actionTypes.GET_DATA_ECU.REQUEST, vehicleAlertGetEcu);
  yield takeEvery(actionTypes.IGNORE_ALERT.REQUEST, ignoreAlertSaga);
}
