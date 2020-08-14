import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the alert state domain
 */

const selectAlertDomain = state => state.get('alert', initialState);
const selectVehicleInfoDomain = state => state.get('vehicleInfo', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Alert
 */

const makeSelectAlert = () =>
  createSelector(selectAlertDomain, substate => substate.toJS());
const makeSelectVehicleInfo = () =>
  createSelector(selectVehicleInfoDomain, substate => substate.toJS());

export { makeSelectAlert, makeSelectVehicleInfo };
export { selectAlertDomain };
