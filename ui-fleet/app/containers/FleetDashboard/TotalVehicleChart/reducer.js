/*
 * @Author: DatNT62 
 * @Date: 2018-11-13 08:56:57 
 * @Last Modified by:   DatNT62 
 * @Last Modified time: 2018-11-13 08:56:57 
 */
/*
 *
 * TotalVehicleChart reducer
 *
 */

import { fromJS } from 'immutable';
import { actionTypes } from './constants';

export const initialState = fromJS({
  total: 0,
  connected: 0,
  disconnected: 0,
});

function totalVehicleChartReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_TOTAL_VEHICLE_CURRENT.SUCCESS: {
      const { payload } = action;
      const totalNum = Number(payload.totalVehicle);
      const connectedNum =
        payload.connectedCount !== undefined
          ? Number(payload.connectedCount)
          : 0;
      const disconnectedNum = totalNum - connectedNum;
      return state.merge({
        total: totalNum,
        connected: connectedNum,
        disconnected: disconnectedNum,
      });
    }
    case actionTypes.GET_TOTAL_VEHICLE.SUCCESS: {
      const { payload } = action;
      const totalNum = Number(payload.totalVehicle);
      const connectedNum =
        payload.connectedCount !== undefined ? payload.connectedCount : 0;
      const disconnectedNum = totalNum - connectedNum;
      return state.merge({
        total: totalNum,
        connected: connectedNum,
        disconnected: disconnectedNum,
      });
    }
    default:
      return state;
  }
}

export default totalVehicleChartReducer;
