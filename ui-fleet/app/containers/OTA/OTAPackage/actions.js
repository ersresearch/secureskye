import { actionTypes } from './constants';

export function getOTA() {
  return {
    type: actionTypes.GET_ALL_OTA_PACKAGE.REQUEST,
  };
}

export function handleStatusCheckList(list) {
  return {
    type: actionTypes.HANDLE_STATUS_CHECK_LIST,
    payload: {
      list,
    },
  };
}

export function displayDeleteDialog(status) {
  return {
    type: actionTypes.HANDLE_STATUS_DIALOG,
    payload: {
      status,
    },
  };
}

export function handleDeleteOTA(list) {
  return {
    type: actionTypes.HANDLE_DELETE_OTA.REQUEST,
    payload: {
      list,
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
