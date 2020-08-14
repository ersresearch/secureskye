/*
 *
 * VehicleView actions
 *
 */

import { actionTypes } from './constants';

export function getVehicleStatus(vehicleId) {
  return {
    type: actionTypes.GET_VEHICLE_STATUS.REQUEST,
    payload: {
      vehicleId,
    },
  };
}
export function getDisplayModel(data) {
  return {
    type: actionTypes.GET_DATA_DISPLAY_MODEL,
    payload: {
      data,
    },
  };
}
