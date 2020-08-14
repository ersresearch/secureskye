import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the securityStatus state domain
 */

const selectSecurityStatusDomain = state =>
  state.get('securityStatus', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SecurityStatus
 */

const makeSelectSecurityStatus = () =>
  createSelector(selectSecurityStatusDomain, substate => substate.toJS());

export default makeSelectSecurityStatus;
export { selectSecurityStatusDomain };
