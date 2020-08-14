/*
 * @Author: NhuHH 
 * @Date: 2018-11-14 11:38:23 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-07 15:13:11
 */
import { actionTypes } from './constants';

export function toggleRoleInformation(selectAll, selection) {
  return {
    type: actionTypes.TOOGLE_USER_FORM_ROLE_INFORMATION,
    payload: {
      selectAll,
      selection,
    },
  };
}
export function getRoleSelection(role) {
  return {
    type: actionTypes.GET_ROLE_FORM_ROLE_INFORMATION,
    role,
  };
}

export function getDeleteList(list) {
  return {
    type: actionTypes.DELETE_ROLE_INFORMATION,
    list,
  };
}

export function getRoleInformation(item) {
  const data = [];
  data.push(item);
  return {
    type: actionTypes.GET_ROLE_INFROMATION,
    data,
  };
}
export function getNewRoleInformation(list) {
  return {
    type: actionTypes.GET_NEW_ROLE_INFROMATION,
    list,
  };
}
export function resetDataRole(data) {
  return {
    type: actionTypes.RESET_DATA,
    data,
  };
}
