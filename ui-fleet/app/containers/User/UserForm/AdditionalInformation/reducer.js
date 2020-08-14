/*
 * @Author: NhuHH 
 * @Date: 2018-11-14 11:39:29 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-18 10:14:51
 */
import { fromJS } from 'immutable';
import { actionTypes } from './constants';

export const initialState = fromJS({
  data: [],
  dataAddInformation: [],
  add: {
    key: '',
    value: '',
  },
  error: '',
});

function AdditionalInformationReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_KEY_FORM_ADDITIONAL_INFORMATION:
      return state.setIn(['add', 'key'], action.value);
    case actionTypes.ADD_VALUE_FORM_ADDITIONAL_INFORMATION:
      return state.setIn(['add', 'value'], action.value);
    case actionTypes.DELETE_ADDITIONAL_INFORMATION:
      return state.set('data', action.list);
    case actionTypes.GET_ADDITIONAL_INFROMATION:
      return state.update('dataAddInformation', dataAddInformation =>
        dataAddInformation.concat(action.data),
      );
    case actionTypes.GET_NEW_ADDITIONAL_INFROMATION:
      return state.set('dataAddInformation', action.list);
    case actionTypes.RESET_DATA:
      return state.merge({
        dataAddInformation: action.data || [],
        error: '',
        data: [],
      });
    case actionTypes.DISPLAY_ERROR:
      return state.set('error', action.content);
    default:
      return state;
  }
}
export default AdditionalInformationReducer;
