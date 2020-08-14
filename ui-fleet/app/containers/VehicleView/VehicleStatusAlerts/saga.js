import { takeLatest } from 'redux-saga/effects';
import { get } from 'utils/apiSaga';
import api from 'commons/api/vehicleView';
import { actionTypes } from './constants';

export function* fetchComponentAlerts(action) {
  const { vehicleId } = action.payload;
  yield get(api.componentAlerts(vehicleId), actionTypes.GET_COMPONENT_ALERTS);
}

export function* fetchComponentStatus(action) {
  const { vehicleId } = action.payload;
  yield get(api.componentStatus(vehicleId), actionTypes.GET_COMPONENT_STATUS);
}

export default function* vehicleStatusAlerts() {
  yield [
    takeLatest(actionTypes.GET_COMPONENT_ALERTS.REQUEST, fetchComponentAlerts),
    takeLatest(actionTypes.GET_COMPONENT_STATUS.REQUEST, fetchComponentStatus),
  ];
}
