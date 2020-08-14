/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 09:20:30 
 * @Last Modified by:   NhuHH 
 * @Last Modified time: 2018-11-13 09:20:30 
 */
/*
 *
 * VehicleAlert reducer
 *
 */

import { fromJS } from 'immutable';
import { actionTypes as ActionTypes } from 'containers/VehicleSoftwareUpdate/constants';
import { actionTypes } from './constants';

export const initialState = fromJS({
  data: [],
  dataEcu: [],
  AlertEcu: [],
  ecuId: '',
});

function VehicleAlertReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_DATA.SUCCESS:
      return state.set('dataEcu', fromJS(action.payload.ecuInfo || []));
    case actionTypes.GET_ALERT_ECU:
      return state.set('dataEcu', fromJS(action.data || []));
    case actionTypes.GET_NORMAL_FILTER.SUCCESS:
      return state.set('data', fromJS(action.payload.ecuInfo || []));
    case actionTypes.GET_DATA_ECU.SUCCESS:
      return state.set('data', fromJS(action.payload.ecuInfo || []));
    case actionTypes.GET_ECU_ID:
      return state.set('ecuId', action.ecuId);
    default:
      return state;
  }
}
export default VehicleAlertReducer;
