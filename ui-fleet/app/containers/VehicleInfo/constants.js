/*
 *
 * VehicleInfo constants
 *
 */
import { createAsyncTypes } from 'utils/actionUtils';
const PREFIX = 'VEHICLE_INFO_';

export const actionTypes = {
  GET_VEHICLE_INFO: createAsyncTypes(`${PREFIX}GET_VEHICLE_INFO`),
  RESET_VEHICLE_INFO: `${PREFIX}RESET_VEHICLE_INFO`,
};
