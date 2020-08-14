/*
 *
 * VehicleView constants
 *
 */
import { createAsyncTypes } from 'utils/actionUtils';
const PREFIX = 'VehicleView_';
export const actionTypes = {
  GET_VEHICLE_STATUS: createAsyncTypes(`${PREFIX}GET_VEHICLE_STATUS`),
  GET_DATA_DISPLAY_MODEL: `${PREFIX}GET_DATA_DISPLAY_MODEL`,
};
