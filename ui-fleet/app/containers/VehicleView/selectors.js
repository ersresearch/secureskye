import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the vehicleView state domain
 */

const selectVehicleViewDomain = state => state.get('vehicleView', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by VehicleView
 */

const makeSelectVehicleView = () =>
  createSelector(selectVehicleViewDomain, substate => substate.toJS());

export { makeSelectVehicleView };
export { selectVehicleViewDomain };
