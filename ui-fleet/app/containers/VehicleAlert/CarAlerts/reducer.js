/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 09:32:17 
 * @Last Modified by:   NhuHH 
 * @Last Modified time: 2018-11-13 09:32:17 
 */
/*
 *
 * CarAlerts reducer
 *
 */

import { fromJS } from 'immutable';
import { actionTypes } from '../constants';

export const initialState = fromJS({
  AlertInfor: {},
  data: [],
  onClickButton: 'ALL',
  activeAlert: {},
  open: false,
  checkBox: false,
  statusEcu: '',
});

function CarAlertsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.RESET_CHECK_BOX:
      return state.set('checkBox', false);
    case actionTypes.GET_VEHICLE_ALERT.SUCCESS:
      return state.set('data', fromJS(action.payload.content));
    case actionTypes.GET_NORMAL_FILTER.SUCCESS:
      return state.set('data', fromJS([]));
    case actionTypes.GET_VEHICLE_ALERT_FILTER.SUCCESS:
      return state.set('data', fromJS(action.payload.content || []));
    case actionTypes.GET_VEHICLE_ALERT_FILTER_ECU.SUCCESS:
      return state.set('data', fromJS(action.payload.content));
    case actionTypes.GET_DATA:
      return state.set('data', action.data);
    case actionTypes.GET_ALERT_LIST:
      return state.set('data', action.filterList);
    case actionTypes.CHANGE_CHECK_BOX:
      return state.set('checkBox', !state.get('checkBox'));
    case actionTypes.GET_INFOR:
      return state.merge({
        AlertInfor: action.data,
        activeAlert: {
          type: action.data.ecuId,
        },
      });
    case actionTypes.GET_CLICK_BUTTON:
      return state.set('onClickButton', action.status);
    case actionTypes.CHANGE_FILTER_ALERT:
      return state.set('statusEcu', action.typeAlert);
    case actionTypes.HANDLE_CHANGE_TOGGLE:
      return state.set('open', action.open);
    case actionTypes.IGNORE_ALERT.SUCCESS:
      return state;
    default:
      return state;
  }
}
export default CarAlertsReducer;
