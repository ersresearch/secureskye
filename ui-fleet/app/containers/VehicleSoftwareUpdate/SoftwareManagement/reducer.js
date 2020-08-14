/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 08:53:19 
 * @Last Modified by:   NhuHH 
 * @Last Modified time: 2018-11-13 08:53:19 
 */
import { fromJS } from 'immutable';
import { actionTypes } from '../constants';

export const initialState = fromJS({
  // data: [],
  filter: 0,
  dataFilter: [],
  dataChild: [],
  buttonID: '',
});

function SoftwareManagementReducer(state = initialState, action) {
  switch (action.type) {
    // case actionTypes.GET_DATA.SUCCESS:
    //   return state.set('data', fromJS(action.payload.data));
    // case actionTypes.GET_DATA.FAILURE:
    //   return state.set('data', fromJS({}));
    case actionTypes.CHANGE_BUTTON_FILTER:
      return state.set('filter', action.filter);
    case actionTypes.CHAMGE_DATE_FILTER:
      return state.set('dataFilter', action.datafilter);
    case actionTypes.GET_DATE_CHILD:
      return state.set('dataChild', action.data);
    case actionTypes.GET_BUTTON_ID:
      return state.set('buttonID', action.id);
    default:
      return state;
  }
}
export default SoftwareManagementReducer;
