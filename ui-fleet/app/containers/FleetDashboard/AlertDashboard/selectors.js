/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:00:56 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 09:00:56 
 */
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the alertDashboard state domain
 */

const selectAlertDashboardDomain = state =>
  state.get('alertDashboard', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AlertDashboard
 */

const makeSelectAlertDashboard = () =>
  createSelector(selectAlertDashboardDomain, substate => substate.toJS());

export default makeSelectAlertDashboard;
export { selectAlertDashboardDomain };
