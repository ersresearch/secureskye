/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 08:54:19 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-12 14:48:17
 */
import { createAsyncTypes } from 'utils/actionUtils';

const PREFIX = 'VEHICLE_SW_UPDATE_';
export const actionTypes = {
  GET_DATA: createAsyncTypes(`${PREFIX}GET_DATA`),
  GET_VEHICLES: createAsyncTypes('VEHICLE_LIST_GET_VEHICLES'),
  GET_DATA_CURRENT: createAsyncTypes(`${PREFIX}GET_DATA_CURRENT`),
  GET_LICENSE_UPDATE: createAsyncTypes(`${PREFIX}GET_LICENSE_UPDATE`),
  GET_ID_BUTTON_UPDATE: `${PREFIX}GET_ID_BUTTON_UPDATE`,
  RESET_DATA: `${PREFIX}RESET_DATA`,
  GET_DATA_SOFTWARE_VERSION: `${PREFIX}GET_DATA_SOFTWARE_VERSION`,
  GET_ALL_SOFTWARE: createAsyncTypes(`${PREFIX}GET_ALL_SOFTWARE`),
};
export const NA = 'N/A';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';
export const INSTALLING = 'INSTALLING';
export const FEATURE = 'FEATURE';
export const CURRENT = 'CURRENT';
export const LATEST = 'LATEST';
