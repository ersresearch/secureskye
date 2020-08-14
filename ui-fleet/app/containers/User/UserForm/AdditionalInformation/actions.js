/*
 * @Author: NhuHH 
 * @Date: 2018-11-15 11:30:29 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-07 18:17:56
 */
import { actionTypes } from './constants';

export function toggleAdditionalInformation(selectAll, selection) {
  return {
    type: actionTypes.TOOGLE_USER_FORM_ADDITIONAL_INFORMATION,
    payload: {
      selectAll,
      selection,
    },
  };
}
export function addKey(value) {
  return {
    type: actionTypes.ADD_KEY_FORM_ADDITIONAL_INFORMATION,
    value,
  };
}
export function addValue(value) {
  return {
    type: actionTypes.ADD_VALUE_FORM_ADDITIONAL_INFORMATION,
    value,
  };
}
export function getDeleteList(list) {
  return {
    type: actionTypes.DELETE_ADDITIONAL_INFORMATION,
    list,
  };
}
export function getNewAdditionalInformation(list) {
  return {
    type: actionTypes.GET_NEW_ADDITIONAL_INFROMATION,
    list,
  };
}
export function getAdditionalInformation(item) {
  const data = [];
  data.push(item);
  return {
    type: actionTypes.GET_ADDITIONAL_INFROMATION,
    data,
  };
}
export function resetDataAdd(data) {
  return {
    type: actionTypes.RESET_DATA,
    data,
  };
}

export function displayError(content) {
  return {
    type: actionTypes.DISPLAY_ERROR,
    content,
  };
}
