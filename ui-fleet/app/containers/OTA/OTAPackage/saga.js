import { takeLatest, put as putRedux, select } from 'redux-saga/effects';
import { get, patch } from 'utils/apiSaga';
import api from 'commons/api/otaManagement';
import _isEmpty from 'lodash/isEmpty';
import { Snackbars } from 'components/Snackbars/index';
import { actionTypes } from './constants';
import { handleSelectRowId, getOTA, handleStatusCheckList } from './actions';
import makeSelectOTAPackage from './selectors';

export function* callApiGetDataOTA() {
  yield get(api.otaList, actionTypes.GET_ALL_OTA_PACKAGE);
  const { data } = yield select(makeSelectOTAPackage());
  if (!_isEmpty(data)) {
    yield putRedux(handleSelectRowId(data[0].id));
  }
}

export function* deleteOTA(action) {
  const { list } = action.payload;
  const reponse = yield patch(
    api.deleteOTA,
    actionTypes.HANDLE_DELETE_OTA,
    list,
  );
  if (reponse.status <= 200) {
    Snackbars(reponse.status, `Delete OTA package successfully`);
    yield putRedux(handleStatusCheckList([]));
    yield putRedux(getOTA());
  } else {
    Snackbars(reponse.status, reponse.data.message);
  }
}

export default function* otaPackage() {
  yield [
    takeLatest(actionTypes.GET_ALL_OTA_PACKAGE.REQUEST, callApiGetDataOTA),
    takeLatest(actionTypes.HANDLE_DELETE_OTA.REQUEST, deleteOTA),
  ];
}
