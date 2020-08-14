/*
 * @Author: DatNT62 
 * @Date: 2018-11-16 13:41:50 
 * @Last Modified by:   DatNT62 
 * @Last Modified time: 2018-11-16 13:41:50 
 */
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the role state domain
 */

const selectRoleDomain = state => state.get('role', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Role
 */

const makeSelectRole = () =>
  createSelector(selectRoleDomain, substate => substate.toJS());

export default makeSelectRole;
export { selectRoleDomain };
