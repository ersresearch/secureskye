/*
 * @Author: DatNT62 
 * @Date: 2018-11-13 08:52:19 
 * @Last Modified by:   DatNT62 
 * @Last Modified time: 2018-11-13 08:52:19 
 */
/*
 *
 * TotalVehicleChart actions
 *
 */

import { actionTypes } from './constants';

export function getTotalVehicle() {
  return {
    type: actionTypes.GET_TOTAL_VEHICLE.REQUEST,
  };
}

export function getTotalVehicleCurrent(data) {
  return {
    type: actionTypes.GET_TOTAL_VEHICLE_CURRENT.SUCCESS,
    payload: data,
  };
}
