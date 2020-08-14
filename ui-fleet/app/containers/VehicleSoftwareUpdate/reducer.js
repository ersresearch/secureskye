/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 08:52:01 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-03 13:41:59
 */
import { fromJS } from 'immutable';
import { actionTypes } from './constants';

export const initialState = fromJS({
  data: [],
  activeEcu: {},
  check: false,
});

function VehicleSoftwareUpdateReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_DATA.SUCCESS:
      return state.set('data', fromJS(action.payload.ecuInfo || []));
    case actionTypes.CHANGE_STATUS_MODAL_UPGRADE_DETAIL:
      return state.set('check', action.payload.status);
    default:
      return state;
  }
}
export default VehicleSoftwareUpdateReducer;
