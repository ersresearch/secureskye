/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 08:54:28 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-05 11:04:05
 */
import { actionTypes } from './constants';

export function getData(ecuId) {
  return {
    type: actionTypes.GET_DATA.REQUEST,
    id: {
      ecuId,
    },
  };
}

export function getDataSodtwareVersion() {
  return {
    type: actionTypes.GET_DATA_SOFTWARE_VERSION,
  };
}

export function getDataCurrent(data) {
  return {
    type: actionTypes.GET_DATA_CURRENT.REQUEST,
    data,
  };
}

export function getLicenseUpdate(softwareId, ecuId) {
  return {
    type: actionTypes.GET_LICENSE_UPDATE.REQUEST,
    payload: { softwareId, ecuId },
  };
}

export function resetData() {
  return {
    type: actionTypes.RESET_DATA,
  };
}
