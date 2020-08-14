/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:19:11 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 09:19:11 
 */
/*
 *
 * VehicleMenu reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, GET_DATA_MENUTREE } from './constants';

export const initialState = fromJS({
  data: [],
});

function vehicleMenuReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_DATA_MENUTREE:
      return state.set('data', action.dataMenu || []);
    default:
      return state;
  }
}

export default vehicleMenuReducer;
