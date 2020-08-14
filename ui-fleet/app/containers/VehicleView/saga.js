import { takeLatest, put as putRedux } from 'redux-saga/effects';
import { get } from 'utils/apiSaga';
import vehicleView from 'commons/api/vehicleView';
import _ from 'lodash';
import { getDisplayModel } from './actions';
import { actionTypes } from './constants';

export function* fetchVehicleStatus(action) {
  const { vehicleId } = action.payload;
  const response = yield get(
    vehicleView.status(vehicleId),
    actionTypes.GET_VEHICLE_STATUS,
  );
  const { list } = response.data;
  const modelStatus = _.chain(list)
    .keyBy('settings')
    .mapValues('value')
    .value();
  yield putRedux(getDisplayModel(modelStatus));
}

export default function* VehicleView() {
  yield takeLatest(actionTypes.GET_VEHICLE_STATUS.REQUEST, fetchVehicleStatus);
}
