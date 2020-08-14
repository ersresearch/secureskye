/*
 * @Author: DatNT62 
 * @Date: 2018-11-13 08:59:12 
 * @Last Modified by:   DatNT62 
 * @Last Modified time: 2018-11-13 08:59:12 
 */
/*
 *
 * Map actions
 *
 */

import ActionTypes from './constants';

export function getAllMarkers() {
  return {
    type: ActionTypes.GET_ALL_MARKERS.REQUEST,
  };
}
export function filterMarker(markers) {
  return {
    type: ActionTypes.FILTER_MARKER,
    payload: markers,
  };
}
