/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 08:53:53 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-12 14:08:12
 */
import { takeEvery, put as putRedux } from 'redux-saga/effects';
import { get, put } from 'utils/apiSaga';
import apiECUSoftwareUpdate from 'commons/api/ecuSoftwareUpdate';
import { actionTypes } from './constants';
import { getData } from './actions';

const CallApiSuccess = 200;
export function* callApiGetData(action) {
  const { ecuId } = action.id;
  yield get(apiECUSoftwareUpdate.SWUpdateDetail(ecuId), actionTypes.GET_DATA);
  yield get(apiECUSoftwareUpdate.software, actionTypes.GET_ALL_SOFTWARE);
}
export function* callApiGetSoftwareVersion(action) {
  const { softwareId, ecuId } = action.payload;
  const response = yield put(
    apiECUSoftwareUpdate.softwareVersion(softwareId),
    actionTypes.GET_LICENSE_UPDATE,
  );
  if (response.status <= CallApiSuccess) {
    yield putRedux(getData(ecuId));
  }
}
export default function* SWUpdateDetailWatcher() {
  yield takeEvery(actionTypes.GET_DATA.REQUEST, callApiGetData);
  yield takeEvery(
    actionTypes.GET_LICENSE_UPDATE.REQUEST,
    callApiGetSoftwareVersion,
  );
}
