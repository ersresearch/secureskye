/*
 * @Author: DatNT62 
 * @Date: 2018-11-13 08:59:16 
 * @Last Modified by:   DatNT62 
 * @Last Modified time: 2018-11-13 08:59:16 
 */
/*
 *
 * Map constants
 *
 */

import { createAsyncTypes } from 'utils/actionUtils';

const PREFIX = 'FLEET_DASHBOARD_MAP_';
const ActionTypes = {
  GET_ALL_MARKERS: createAsyncTypes(`${PREFIX}GET_ALL_MARKERS`),
  FILTER_MARKER: createAsyncTypes(`${PREFIX}FILTER_MARKER`),
};
export default ActionTypes;
