/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 08:51:36 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-07 08:48:48
 */
import { actionTypes } from './constants';

export function getData(vehicleId) {
  return {
    type: actionTypes.GET_DATA.REQUEST,
    id: {
      vehicleId,
    },
  };
}
export function changeButtonFilter(filter) {
  return {
    type: actionTypes.CHANGE_BUTTON_FILTER,
    filter,
  };
}
export function changeDataFilter(data, type) {
  let datafilter = [];
  switch (type) {
    case 'alert':
      datafilter = data.filter(item => item.securityStatus !== 'NORMAL');
      break;
    case 'update':
      datafilter = data.filter(item => item.updateCount > 0);
      break;
    case 'all':
      datafilter = data;
      break;
    default:
  }
  return {
    type: actionTypes.CHAMGE_DATE_FILTER,
    datafilter,
  };
}
export function getDataChild(data) {
  return {
    type: actionTypes.GET_DATE_CHILD,
    data,
  };
}
export function getButtonId(id) {
  return {
    type: actionTypes.GET_BUTTON_ID,
    id,
  };
}
export function getDataUpgradeSoftware() {
  return {
    type: actionTypes.GET_DATA_UPGRADE_SOFTWARE.REQUEST,
  };
}

export function getDataOTAPackage(otaId) {
  return {
    type: actionTypes.GET_DATA_OTA_PACKAGE.REQUEST,
    payload: {
      otaId,
    },
  };
}

export function handleSelectRowId(id) {
  return {
    type: actionTypes.HANDLE_SELECT_ROW_ID,
    payload: {
      id,
    },
  };
}

export function getDataTest(data) {
  return {
    type: actionTypes.GET_DATE_TEST,
    payload: {
      data,
    },
  };
}

export function getDataOTAPackageTest(data) {
  return {
    type: actionTypes.GET_DATE_OTA_TEST,
    payload: {
      data,
    },
  };
}

export function changeStatusModal(status) {
  return {
    type: actionTypes.CHANGE_STATUS_MODAL_UPGRADE_DETAIL,
    payload: {
      status,
    },
  };
}

export function handleUpgradeOTAPackage(otaId, vehicleId) {
  return {
    type: actionTypes.HANDLE_UPGRADE_OTA_PACKAGE.REQUEST,
    payload: {
      otaId,
      vehicleId,
    },
  };
}

export function downloadImageOTAPackage(url, name) {
  return {
    type: actionTypes.DOWNLOAD_IMAGE_OF_OTA_PACKAGE_DETAIL.REQUEST,
    payload: {
      url,
      name,
    },
  };
}
