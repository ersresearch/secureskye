import { takeLatest } from 'redux-saga/effects';
import { get } from 'utils/apiSaga';
import api from 'commons/api/vehicleSecurity';
import { actionTypes } from './constants';

export function* fetchSecurityStatus(action) {
  const { vehicleId } = action.payload;
  yield get(api.securityStatus(vehicleId), actionTypes.GET_SECURITY_STATUS);
}

export default function* securityStatus() {
  yield takeLatest(
    actionTypes.GET_SECURITY_STATUS.REQUEST,
    fetchSecurityStatus,
  );
}
