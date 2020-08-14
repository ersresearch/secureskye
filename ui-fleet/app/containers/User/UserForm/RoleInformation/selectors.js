/*
 * @Author: NhuHH 
 * @Date: 2018-11-14 11:38:03 
 * @Last Modified by:   NhuHH 
 * @Last Modified time: 2018-11-14 11:38:03 
 */
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectRoleInformation = state =>
  state.get('roleInformation', initialState);
const selectuser = state => state.get('user', initialState);

const makeRoleInformation = () =>
  createSelector(selectRoleInformation, substate => substate.toJS());
const makeUser = () => createSelector(selectuser, substate => substate.toJS());

export { selectRoleInformation, makeRoleInformation, makeUser, selectuser };
