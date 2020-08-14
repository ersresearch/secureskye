/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 08:50:31 
 * @Last Modified by:   NhuHH 
 * @Last Modified time: 2018-11-13 08:50:31 
 */
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUserDomain = state => state.get('user', initialState);

const makeSelectUser = () =>
  createSelector(selectUserDomain, substate => substate.toJS());

export { selectUserDomain, makeSelectUser };
