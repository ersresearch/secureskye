/*
 * @Author: DatNT62 
 * @Date: 2018-11-16 13:40:57 
 * @Last Modified by: LoiDT2
 * @Last Modified time: 2018-12-11 16:05:48
 */
/*
 *
 * Role actions
 *
 */

import { actionTypes } from './constants';

export function getAllRoles() {
  return {
    type: actionTypes.GET_ALL_ROLES.REQUEST,
  };
}
export function getRoleByID(id) {
  return {
    type: actionTypes.GET_ROLE_BY_ID.REQUEST,
    payload: {
      id,
    },
  };
}

export function changeUserChecked(list) {
  return {
    type: actionTypes.CHANGE_USERS_CHECKED,
    payload: {
      list,
    },
  };
}

export function deleteRoleList(list) {
  return {
    type: actionTypes.DELETE_ROLE_LIST,
    payload: {
      list,
    },
  };
}

export function selectedRow(id) {
  return {
    type: actionTypes.SELECTED_ROW_ID,
    payload: {
      id,
    },
  };
}

export function initSelectUser(user) {
  return {
    type: actionTypes.INIT_SELECT_USER,
    payload: {
      user,
    },
  };
}

export function selectUser(user) {
  return {
    type: actionTypes.SELECT_USER,
    payload: {
      user,
    },
  };
}

export function changeUsersList(usersList) {
  return {
    type: actionTypes.CHANGE_USERS_LIST,
    payload: {
      usersList,
    },
  };
}

export function getAuthorityConfig() {
  return {
    type: actionTypes.GET_AUTHORITY_CONFIG.REQUEST,
  };
}

export function changeAuthoritiesList(authList) {
  return {
    type: actionTypes.CHANGE_AUTHORITIES_LIST,
    payload: {
      authList,
    },
  };
}

export function createRole(data) {
  return {
    type: actionTypes.CREATE_ROLE.REQUEST,
    payload: {
      data,
    },
  };
}

export function updateRole(id, data) {
  return {
    type: actionTypes.UPDATE_ROLE.REQUEST,
    payload: {
      id,
      data,
    },
  };
}

export function deleteRoles(data) {
  return {
    type: actionTypes.DELETE_ROLE.REQUEST,
    payload: {
      data,
    },
  };
}

export function displayConfirmationDialog(status) {
  return {
    type: actionTypes.DISPLAY_CONFIRMATION_DIALOG,
    payload: {
      status,
    },
  };
}

export function resetRoleDetail() {
  return {
    type: actionTypes.RESET_ROLE_DETAIL,
  };
}

export function resetInitData(data) {
  return {
    type: actionTypes.RESET_INIT_DATA,
    payload: {
      data,
    },
  };
}
