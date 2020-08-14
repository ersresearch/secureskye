/*
 * @Author: DatNT62 
 * @Date: 2018-11-13 09:04:23 
 * @Last Modified by:   DatNT62 
 * @Last Modified time: 2018-11-13 09:04:23 
 */
/*
 *
 * VehicleMap actions
 *
 */

import ActionTypes from './constants';

export function getAllMarkers(vehicleId) {
  return {
    type: ActionTypes.GET_ALL_MARKERS.REQUEST,
    payload: {
      vehicleId,
    },
  };
}
export function changeClassNameForNav(className) {
  return {
    type: ActionTypes.CHANGE_CLASSNAME_FOR_NAV,
    payload: className,
  };
}
export function getTheLatestPoint(vehicleId) {
  return {
    type: ActionTypes.GET_THE_LATEST_POINT.REQUEST,
    payload: {
      vehicleId,
    },
  };
}
