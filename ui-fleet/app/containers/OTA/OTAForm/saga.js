import { takeLatest, put as putRedux } from 'redux-saga/effects';
import { routerActions } from 'react-router-redux';
import { get, post, patch } from 'utils/apiSaga';
import api from 'commons/api/otaManagement';
import { Snackbars } from 'components/Snackbars';
import { actionTypes } from './constants';

export function* callApiUploadOTA(action) {
  const { packageName, data } = action.payload;
  const response = yield post(
    api.uploadOTA(packageName),
    actionTypes.UPLOAD_OTA_FILE,
    data,
  );
  if (response.status <= 200) {
    Snackbars(response.status, `Upload OTA Package successfully`);
    yield putRedux(routerActions.push('/fleet-ui/ota'));
  } else {
    Snackbars(response.status, response.data.message);
  }
}

export function* callApiGetOTADetail(action) {
  const { id } = action.payload;
  yield get(api.ota(id), actionTypes.GET_OTA_DETAIL);
}

export function* callApiUpdateOTAName(action) {
  const { id, name } = action.payload;
  const response = yield patch(api.ota(id), actionTypes.UPDATE_OTA_NAME, name);
  if (response.status <= 200) {
    Snackbars(response.status, `Update OTA successfully`);
    yield putRedux(routerActions.push('/fleet-ui/ota'));
  } else {
    Snackbars(response.status, response.data.message);
  }
}

export function* callApiReleaseOTA(action) {
  const { id, status } = action.payload;
  const response = yield patch(
    api.releaseOTA(id),
    actionTypes.RELEASE_OTA,
    status,
  );
  if (response.status <= 200) {
    Snackbars(response.status, `Release OTA successfully`);
    yield putRedux(routerActions.push('/fleet-ui/ota'));
  } else {
    Snackbars(response.status, response.data.message);
  }
}

export default function* otaManagement() {
  yield [
    takeLatest(actionTypes.UPLOAD_OTA_FILE.REQUEST, callApiUploadOTA),
    takeLatest(actionTypes.UPDATE_OTA_NAME.REQUEST, callApiUpdateOTAName),
    takeLatest(actionTypes.GET_OTA_DETAIL.REQUEST, callApiGetOTADetail),
    takeLatest(actionTypes.RELEASE_OTA.REQUEST, callApiReleaseOTA),
  ];
}
