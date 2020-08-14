/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 08:53:27 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-11-29 17:06:46
 */
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUpgradeSoftwareDomain = state =>
  state.get('upgradeSoftware', initialState);

const makeSelectUpgradeSoftware = () =>
  createSelector(selectUpgradeSoftwareDomain, substate => substate.toJS());

export { selectUpgradeSoftwareDomain, makeSelectUpgradeSoftware };
