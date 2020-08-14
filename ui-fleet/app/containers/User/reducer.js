/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 08:50:20 
 * @Last Modified by: LoiDT2
 * @Last Modified time: 2018-12-14 17:15:43
 */
import { fromJS } from 'immutable';
import { actionTypes } from './constants';
import { dummyNationality } from './dummyNationality';
import { dummyPhoneNumbersCode } from './dummyPhoneNumbersCode';

export const initialState = fromJS({
  data: [],
  dataRoles: [],
  UserInfo: {},
  selectedRow: '',
  isLoading: false,
  alertDialogStatus: false,
  activeUser: {
    id: null,
    name: null,
    enable: null,
  },
  rolesSearch: [],
  statusCheck: [],
  nationality: dummyNationality,
  gender: [
    {
      value: true,
      label: 'Male',
    },
    {
      value: false,
      label: 'Female',
    },
  ],
  areaCode: dummyPhoneNumbersCode,
});

function UsertReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_USER_LIST:
      return state.set('data', action.data || []);
    case actionTypes.GET_ROLES.SUCCESS: {
      const dataModelDisplay = [];
      if (action.payload.data) {
        action.payload.data.forEach(item => {
          const data = {
            value: item.id,
            label: item.name,
          };
          dataModelDisplay.push(data);
        });
      }
      return state.merge({
        dataRoles: action.payload.data || [],
        rolesSearch: dataModelDisplay,
      });
    }
    case actionTypes.GET_USER_INFORMATION:
      return state.set('UserInfo', action.data);
    case actionTypes.SELECT_ROW_ID:
      return state.set('selectedRow', action.id);
    case actionTypes.DEACTIVATE_USER:
      return state.merge({
        alertDialogStatus: action.payload.status,
        activeUser: {
          id: action.payload.id,
          name: action.payload.name,
          enable: action.payload.enable,
        },
      });
    case actionTypes.DELETE_USER_LIST:
      return state.set('statusCheck', action.list);
    case actionTypes.POST_CREATE_USER.REQUEST:
      return state.set('isLoading', true);
    case actionTypes.POST_CREATE_USER.SUCCESS:
      return state.set('isLoading', false);
    case actionTypes.POST_CREATE_USER.FAILURE:
      return state.set('isLoading', false);
    case actionTypes.UPDATE_USER.REQUEST:
      return state.set('isLoading', true);
    case actionTypes.UPDATE_USER.SUCCESS:
      return state.set('isLoading', false);
    case actionTypes.UPDATE_USER.FAILURE:
      return state.set('isLoading', false);
    case actionTypes.ACTIVE_USER.REQUEST:
      return state.set('isLoading', true);
    case actionTypes.ACTIVE_USER.SUCCESS:
      return state.set('isLoading', false);
    case actionTypes.ACTIVE_USER.FAILURE:
      return state.set('isLoading', false);
    default:
      return state;
  }
}
export default UsertReducer;
