/*
 * @Author: NhuHH 
 * @Date: 2018-11-14 11:38:13 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-18 10:15:23
 */
import { fromJS } from 'immutable';
import { actionTypes } from './constants';

export const initialState = fromJS({
  data: [],
  dataUserRole: [],
  selectedOption: {},
});

function RoleInformationReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_ROLE_FORM_ROLE_INFORMATION:
      return state.set('selectedOption', action.role);
    case actionTypes.DELETE_ROLE_INFORMATION:
      return state.set('data', action.list);
    case actionTypes.GET_ROLE_INFROMATION:
      return state.update('dataUserRole', dataUserRole =>
        dataUserRole.concat(action.data),
      );
    case actionTypes.GET_NEW_ROLE_INFROMATION:
      return state.set('dataUserRole', action.list);
    case actionTypes.RESET_DATA:
      return state.merge({
        dataUserRole: action.data || [],
        data: [],
      });
    default:
      return state;
  }
}
export default RoleInformationReducer;
