/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 08:50:10
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-07 18:04:20
 */
import { actionTypes } from './constants';

export function getListUser() {
  return {
    type: actionTypes.GET_DATA_USER.REQUEST,
  };
}

export function getUserListForTable(data) {
  return {
    type: actionTypes.GET_USER_LIST,
    data,
  };
}

export function getRoles() {
  return {
    type: actionTypes.GET_ROLES.REQUEST,
  };
}

export function getUserInformationById(userId) {
  return {
    type: actionTypes.GET_USER_INFORMATION_BY_ID.REQUEST,
    payload: {
      userId,
    },
  };
}

export function getUserUpdate(userId, data) {
  return {
    type: actionTypes.UPDATE_USER.REQUEST,
    payload: {
      userId,
      data,
    },
  };
}

export function postCreateUser(data) {
  return {
    type: actionTypes.POST_CREATE_USER.REQUEST,
    payload: {
      data,
    },
  };
}

export function putApiActiveUser(userId, value) {
  return {
    type: actionTypes.ACTIVE_USER.REQUEST,
    payload: {
      userId,
      value,
    },
  };
}

export function SelectRowId(id) {
  return {
    type: actionTypes.SELECT_ROW_ID,
    id,
  };
}

export function displayDeleteDialog(id, name, enable, status) {
  return {
    type: actionTypes.DEACTIVATE_USER,
    payload: {
      id,
      name,
      enable,
      status,
    },
  };
}

export function deleteUserList(list) {
  return {
    type: actionTypes.DELETE_USER_LIST,
    list,
  };
}
export function getImage(userId, image) {
  return {
    type: actionTypes.GET_IMAGE.REQUEST,
    payload: {
      userId,
      image,
    },
  };
}
export function upLoadImage(userId, file) {
  return {
    type: actionTypes.UPLOAD_IMAGE.REQUEST,
    payload: {
      userId,
      file,
    },
  };
}

export function getUserInfo(data) {
  return {
    type: actionTypes.GET_USER_INFORMATION,
    data,
  };
}
