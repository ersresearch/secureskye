/*
 * @Author: DatNT62 
 * @Date: 2018-11-13 08:52:26 
 * @Last Modified by:   DatNT62 
 * @Last Modified time: 2018-11-13 08:52:26 
 */
/*
 *
 * TotalVehicleChart constants
 *
 */

import { createAsyncTypes } from 'utils/actionUtils';
const PREFIX = 'TOTAL_VEHICLE_CHART_';

export const actionTypes = {
  GET_TOTAL_VEHICLE_CURRENT: createAsyncTypes(
    `${PREFIX}GET_TOTAL_VEHICLE_CURRENT`,
  ),
  GET_TOTAL_VEHICLE: createAsyncTypes(`${PREFIX}GET_TOTAL_VEHICLE`),
};
