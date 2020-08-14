/*
 *
 * VehicleList actions
 *
 */

import { actionTypes } from './constants';

export function changeFilterVehicle(filter) {
  return {
    type: actionTypes.CHANGE_FILTER_VEHICLE,
    payload: {
      filter,
    },
  };
}

export function changeSearchVehicle(value) {
  return {
    type: actionTypes.CHANGE_SEARCH_VEHICLE,
    payload: {
      value,
    },
  };
}
