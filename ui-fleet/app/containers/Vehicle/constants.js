/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:04:16 
 * @Last Modified by: DanND1
 * @Last Modified time: 2018-11-14 13:48:40
 */
import { createAsyncTypes } from 'utils/actionUtils';

const PREFIX = 'VEHICLE_MANAGEMENT_';

export const actionTypes = {
  GET_VEHICLES: createAsyncTypes(`${PREFIX}GET_VEHICLES`),
  GET_VEHICLE_BY_ID: createAsyncTypes(`${PREFIX}GET_VEHICLE_BY_ID`),
  GET_OBD_BY_ID: createAsyncTypes(`${PREFIX}GET_OBD_BY_ID`),
  UPLOAD_IMAGE: createAsyncTypes(`${PREFIX}UPLOAD_IMAGE`),
  GET_ALL_MODEL: createAsyncTypes(`${PREFIX}GET_ALL_MODEL`),
  ADD_VEHICLE: createAsyncTypes(`${PREFIX}ADD_VEHICLE`),
  UPDATE_VEHICLE: createAsyncTypes(`${PREFIX}UPDATE_VEHICLE`),
  OBD_CONFIGURE: createAsyncTypes(`${PREFIX}OBD_CONFIGURE`),
  ADD_OBD_CONFIGURE: createAsyncTypes(`${PREFIX}ADD_OBD_CONFIGURE`),
  CHANGE_STATUS_FUEL: `${PREFIX}CHANGE_STATUS_FUEL`,
  CHANGE_STATUS_ODO: `${PREFIX}CHANGE_STATUS_ODO`,
  CHANGE_IMAGE: `${PREFIX}CHANGE_IMAGE`,
  RESET_DATA: `${PREFIX}RESET_DATA`,
  SELECTED_ROW_ID: `${PREFIX}SELECTED_ROW_ID`,
  SELECTED_ROW_INFOR: `${PREFIX}SELECTED_ROW_INFOR`,
  DELETE_VEHICLE: createAsyncTypes(`${PREFIX}DELETE_VEHICLE`),
  DELETE_VEHICLE_ID: `${PREFIX}DELETE_VEHICLE_ID`,
  DELETE_VEHICLE_LIST: `${PREFIX}DELETE_VEHICLE_LIST`,
  RESET_IMAGE: `${PREFIX}RESET_IMAGE`,
  GET_LIST_VEHICLE: `${PREFIX}GET_LIST_VEHICLE`,
};