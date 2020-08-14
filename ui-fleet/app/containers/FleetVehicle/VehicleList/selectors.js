import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the vehicleList state domain
 */

const selectVehicleListDomain = state => state.get('vehicleList', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by VehicleList
 */

const makeSelectVehicleList = () =>
  createSelector(selectVehicleListDomain, substate => substate.toJS());

export default makeSelectVehicleList;
export { selectVehicleListDomain };
