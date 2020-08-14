/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:01:45 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 09:01:45 
 */
/*
 *
 * RiskLevelGaugeChart reducer
 *
 */

import { fromJS } from 'immutable';
import { actionTypes } from './constants';

export const initialState = fromJS({
  majorTicks: ['1', '', '2', '', '3', '', '4', '', '5', '', '6', '', '7'],
  value: '1',
});

function riskLevelGaugeChartReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_DATA_CURRENT.SUCCESS:
      return state.set('value', action.payload);
    case actionTypes.RISK_CURRENT_RESET.REQUEST:
      return state.set('value', 1);
    default:
      return state;
  }
}
export default riskLevelGaugeChartReducer;
