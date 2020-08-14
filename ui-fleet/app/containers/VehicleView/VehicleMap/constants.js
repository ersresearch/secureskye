/*
 * @Author: DatNT62 
 * @Date: 2018-11-13 09:04:26 
 * @Last Modified by:   DatNT62 
 * @Last Modified time: 2018-11-13 09:04:26 
 */
/*
 *
 * VehicleMap constants
 *
 */

import { createAsyncTypes } from 'utils/actionUtils';

const PREFIX = 'VEHICLE_MAP_';
const ActionTypes = {
  GET_ALL_MARKERS: createAsyncTypes(`${PREFIX}GET_ALL_MARKERS`),
  GET_PLACE_NAME: createAsyncTypes(`${PREFIX}GET_PLACE_NAME`),
  ADD_A_LOCATION: createAsyncTypes(`${PREFIX}ADD_A_LOCATION`),
  ADD_A_ADDRESS: createAsyncTypes(`${PREFIX}ADD_A_ADDRESS`),
  ADD_A_POINT: createAsyncTypes(`${PREFIX}ADD_A_POINT`),
  ADD_A_MARKER_ALERT: createAsyncTypes(`${PREFIX}ADD_A_MARKER_ALERT`),
  CHANGE_CLASSNAME_FOR_NAV: createAsyncTypes(
    `${PREFIX}CHANGE_CLASSNAME_FOR_NAV`,
  ),
  GET_THE_LATEST_POINT: createAsyncTypes(`${PREFIX}GET_THE_LATEST_POINT`),
};
export default ActionTypes;
