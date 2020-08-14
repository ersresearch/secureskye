/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 08:53:19 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-03 12:35:34
 */
import { fromJS } from 'immutable';
import { actionTypes } from '../constants';

export const initialState = fromJS({
  data: [],
  selectedRow: '',
  dataOTA: {},
  check: false,
});

function UpgradeSoftwareReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_DATA_UPGRADE_SOFTWARE.SUCCESS:
      return state.set('data', fromJS(action.payload.data));
    case actionTypes.HANDLE_SELECT_ROW_ID:
      return state.set('selectedRow', action.payload.id);
    case actionTypes.CHANGE_STATUS_MODAL_UPGRADE_DETAIL:
      return state.set('check', action.payload.status);
    case actionTypes.GET_DATE_TEST:
      return state.set('data', action.payload.data);
    case actionTypes.GET_DATE_OTA_TEST:
      return state.set('dataOTA', action.payload.data);
    default:
      return state;
  }
}
export default UpgradeSoftwareReducer;
