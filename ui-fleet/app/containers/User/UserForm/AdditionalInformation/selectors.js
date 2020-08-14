/*
 * @Author: NhuHH 
 * @Date: 2018-11-14 11:39:26 
 * @Last Modified by:   NhuHH 
 * @Last Modified time: 2018-11-14 11:39:26 
 */
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAdditionalInformation = state =>
  state.get('additionalInformation', initialState);
const selectuser = state => state.get('user', initialState);

const makeAdditionalInformation = () =>
  createSelector(selectAdditionalInformation, substate => substate.toJS());
const makeUser = () => createSelector(selectuser, substate => substate.toJS());

export {
  selectAdditionalInformation,
  makeAdditionalInformation,
  selectuser,
  makeUser,
};
