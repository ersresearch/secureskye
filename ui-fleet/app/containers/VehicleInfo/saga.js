import { takeLatest } from 'redux-saga/effects';
import { get } from 'utils/apiSaga';
import api from 'commons/api/vehicles';
import { actionTypes } from './constants';

export function* fetchVehicleInfo(action) {
  const { vehicleId } = action.payload;
  yield get(api.vehicleById(vehicleId), actionTypes.GET_VEHICLE_INFO);
}

export default function* vehicleInfo() {
  yield takeLatest(actionTypes.GET_VEHICLE_INFO.REQUEST, fetchVehicleInfo);
}
