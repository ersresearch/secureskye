/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 08:52:24 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-07 08:51:34
 */
import { takeLatest, put, select } from 'redux-saga/effects';
import _ from 'lodash';
import axios from 'axios';
import { get, put as putSaga } from 'utils/apiSaga';
import { getAlertEcu } from 'containers/VehicleAlert/actions';
import apiECUSoftwareUpdate from 'commons/api/ecuSoftwareUpdate';
import apiOTManagement from 'commons/api/otaManagement';
import { Snackbars } from 'components/Snackbars/index';
import { makeSelectCarAlerts } from 'containers/VehicleAlert/CarAlerts/selectors';
import { actionTypes } from './constants';
import {
  getDataTest,
  handleSelectRowId,
  getDataOTAPackageTest,
  changeStatusModal,
} from './action';

const CallApiSuccess = 200;
export function* callApiGetData(action) {
  const carAlert = yield select(makeSelectCarAlerts());
  const { vehicleId } = action.id;
  const response = yield get(
    apiECUSoftwareUpdate.ECUList(vehicleId),
    actionTypes.GET_DATA,
  );
  if (response.data) {
    const data = response.data.ecuInfo;
    let dataAlert = [];
    if (!_.isUndefined(data)) {
      dataAlert = data.filter(item => item.securityStatus !== 'NORMAL');
    }
    if (!carAlert.checkBox) {
      yield put(getAlertEcu(dataAlert));
    }
  }
}

export function* callApiGetDataUpgradeSoftware() {
  const reponse = yield get(
    apiOTManagement.otaListRelease,
    actionTypes.GET_DATA_UPGRADE_SOFTWARE,
  );
  if (reponse.data !== undefined) {
    if (!_.isEmpty(reponse.data.data)) {
      yield put(getDataTest(reponse.data.data));
      yield put(handleSelectRowId(reponse.data.data[0].id));
    } else {
      yield put(getDataTest([]));
    }
  } else {
    yield put(getDataTest([]));
    Snackbars(reponse.status, reponse.data.message);
  }
}

export function* callApiGetDataOTAPackage(action) {
  const { otaId } = action.payload;
  const reponse = yield get(
    apiOTManagement.ota(otaId),
    actionTypes.GET_DATA_OTA_PACKAGE,
  );
  if (reponse.data !== undefined) {
    if (!_.isEmpty(reponse.data)) {
      yield put(getDataOTAPackageTest(reponse.data));
    } else {
      yield put(getDataOTAPackageTest({}));
    }
  } else {
    Snackbars(reponse.status, reponse.data.message);
  }
}

export function* callApiUpgradeOTASoftware(action) {
  const { otaId, vehicleId } = action.payload;
  const reponse = yield putSaga(
    apiECUSoftwareUpdate.upgradeSoftware(otaId, vehicleId),
    actionTypes.HANDLE_UPGRADE_OTA_PACKAGE,
  );
  if (reponse.status <= CallApiSuccess) {
    Snackbars(
      reponse.status,
      'Upgrade successfully and waitting to install OTA package',
    );
  } else {
    Snackbars(reponse.status, reponse.data.message);
  }
  yield put(changeStatusModal(false));
}

export function* callApiDownloadImage(action) {
  const { url, name } = action.payload;
  try {
    const response = yield axios
      .get(apiECUSoftwareUpdate.downloadImage(url), {
        responseType: 'blob',
      })
      .then(res => {
        const URL = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.getElementById('downloadImage');
        link.href = URL;
        link.setAttribute('download', name);
        link.click();
      });
    return response.data;
  } catch (error) {
    return null;
  }
}

export default function* vehicleSoftwareUpdate() {
  yield [
    takeLatest(actionTypes.GET_DATA.REQUEST, callApiGetData),
    takeLatest(
      actionTypes.GET_DATA_UPGRADE_SOFTWARE.REQUEST,
      callApiGetDataUpgradeSoftware,
    ),
    takeLatest(
      actionTypes.GET_DATA_OTA_PACKAGE.REQUEST,
      callApiGetDataOTAPackage,
    ),
    takeLatest(
      actionTypes.HANDLE_UPGRADE_OTA_PACKAGE.REQUEST,
      callApiUpgradeOTASoftware,
    ),
    takeLatest(
      actionTypes.DOWNLOAD_IMAGE_OF_OTA_PACKAGE_DETAIL.REQUEST,
      callApiDownloadImage,
    ),
  ];
}
