/*
 * @Author: DatNT62 
 * @Date: 2018-11-13 08:57:35 
 * @Last Modified by:   DatNT62 
 * @Last Modified time: 2018-11-13 08:57:35 
 */
import { takeLatest } from 'redux-saga/effects';
import { get } from 'utils/apiSaga';
import fleetDashboard from 'commons/api/fleetDashboard';
import { actionTypes } from './constants';

export function* getTotalVehicleSaga() {
  const url = fleetDashboard.totalVehicle;
  yield get(url, actionTypes.GET_TOTAL_VEHICLE);
}

// Individual exports for testing
export default function* totalVehicleWatcher() {
  yield takeLatest(actionTypes.GET_TOTAL_VEHICLE.REQUEST, getTotalVehicleSaga);
}
