/*
 *
 * VehicleInfo actions
 *
 */

import { actionTypes } from './constants';

export function getVehicleInfo(vehicleId) {
  return {
    type: actionTypes.GET_VEHICLE_INFO.REQUEST,
    payload: {
      vehicleId,
    },
  };
}
export function resetVehicleInfo() {
  return {
    type: actionTypes.RESET_VEHICLE_INFO,
  };
}
