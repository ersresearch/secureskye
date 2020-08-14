/* eslint-disable no-underscore-dangle */
/*
 * @Author: DatNT62 
 * @Date: 2018-11-16 13:41:37 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-18 11:00:27
 */
/*
 *
 * Role reducer
 *
 */

import { fromJS } from 'immutable';
import _isUndefined from 'lodash/isUndefined';
import _isEmpty from 'lodash/isEmpty';
import Chance from 'chance';
import { actionTypes } from './constants';

export const initialState = fromJS({
  usersChecked: [],
  data: [],
  statusCheck: [],
  selectedRow: '',
  initSelectUser: [],
  selectedUser: {},
  usersList: [],
  roleDetail: {},
  authConfig: [],
  authoritiesList: [],
  alertDialogStatus: false,
  isLoading: false,
});

const chance = new Chance();
function roleReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_AUTHORITY_CONFIG.SUCCESS:
      return state.set('authConfig', fromJS(action.payload.data));
    case actionTypes.GET_ALL_ROLES.SUCCESS: {
      const dataFormat = [];
      if (!_isEmpty(action.payload.data)) {
        action.payload.data.forEach(item => {
          const _id = chance.guid();
          const data = {
            _id,
            ...item,
          };
          dataFormat.push(data);
        });
      }
      return state.set('data', dataFormat);
    }
    case actionTypes.GET_ROLE_BY_ID.SUCCESS: {
      const { payload } = action;
      const usersList = [];
      let authoritiesList = [];
      if (!_isUndefined(payload.authorities)) {
        authoritiesList = payload.authorities.map(authority => ({
          id: authority.id,
        }));
      }
      if (!_isUndefined(payload.users)) {
        payload.users.forEach(item => {
          const _id = chance.guid();
          const data = {
            _id,
            ...item,
          };
          usersList.push(data);
        });
      }
      return state.merge({
        usersList,
        authoritiesList,
        roleDetail: action.payload,
      });
    }
    case actionTypes.CHANGE_USERS_CHECKED:
      return state.set('usersChecked', fromJS(action.payload.list));
    case actionTypes.DELETE_ROLE_LIST:
      return state.set('statusCheck', fromJS(action.payload.list));
    case actionTypes.SELECTED_ROW_ID: {
      return state.set('selectedRow', fromJS(action.payload.id));
    }
    case actionTypes.INIT_SELECT_USER: {
      const currentData = action.payload.user.map(item => ({
        value: item.id,
        label: item.name,
      }));
      return state.set('initSelectUser', fromJS(currentData));
    }
    case actionTypes.SELECT_USER:
      return state.set('selectedUser', fromJS(action.payload.user));
    case actionTypes.CHANGE_USERS_LIST:
      return state.set('usersList', fromJS(action.payload.usersList));
    case actionTypes.CHANGE_AUTHORITIES_LIST:
      return state.set('authoritiesList', fromJS(action.payload.authList));
    case actionTypes.DISPLAY_CONFIRMATION_DIALOG:
      return state.set('alertDialogStatus', fromJS(action.payload.status));
    case actionTypes.RESET_ROLE_DETAIL:
      return state.set('roleDetail', fromJS({}));
    case actionTypes.RESET_INIT_DATA: {
      const users = [];
      if (!_isUndefined(action.payload.data.users)) {
        action.payload.data.users.forEach(item => {
          const _id = chance.guid();
          const data = {
            _id,
            ...item,
          };
          users.push(data);
        });
      }
      return state.merge({
        usersList: users,
        authoritiesList: action.payload.data.authorities || [],
        usersChecked: [],
      });
    }
    case actionTypes.CREATE_ROLE.REQUEST:
      return state.set('isLoading', true);
    case actionTypes.CREATE_ROLE.SUCCESS:
      return state.set('isLoading', false);
    case actionTypes.CREATE_ROLE.FAILURE:
      return state.set('isLoading', false);
    case actionTypes.UPDATE_ROLE.REQUEST:
      return state.set('isLoading', true);
    case actionTypes.UPDATE_ROLE.SUCCESS:
      return state.set('isLoading', false);
    case actionTypes.UPDATE_ROLE.FAILURE:
      return state.set('isLoading', false);
    case actionTypes.DELETE_ROLE.REQUEST:
      return state.set('isLoading', true);
    case actionTypes.DELETE_ROLE.SUCCESS:
      return state.set('isLoading', false);
    case actionTypes.DELETE_ROLE.FAILURE:
      return state.set('isLoading', false);
    default: {
      return state;
    }
  }
}

export default roleReducer;
