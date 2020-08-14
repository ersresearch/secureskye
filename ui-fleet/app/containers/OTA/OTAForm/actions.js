import { actionTypes } from './constants';

export function readOTAFile(file, data) {
  return {
    type: actionTypes.READ_OTA_FILE,
    payload: {
      file,
      data,
    },
  };
}

export function getOTADetail(id) {
  return {
    type: actionTypes.GET_OTA_DETAIL.REQUEST,
    payload: {
      id,
    },
  };
}

export function uploadOTAFile(packageName, data) {
  return {
    type: actionTypes.UPLOAD_OTA_FILE.REQUEST,
    payload: {
      packageName,
      data,
    },
  };
}

export function updateOTAName(id, name) {
  return {
    type: actionTypes.UPDATE_OTA_NAME.REQUEST,
    payload: {
      id,
      name,
    },
  };
}

export function releaseOTA(id, status) {
  return {
    type: actionTypes.RELEASE_OTA.REQUEST,
    payload: {
      id,
      status,
    },
  };
}

export function resetOTADetail() {
  return {
    type: actionTypes.RESET_OTA_DETAIL,
  };
}
