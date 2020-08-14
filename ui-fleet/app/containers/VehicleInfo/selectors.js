import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the vehicleInfo state domain
 */

const selectVehicleInfoDomain = state => state.get('vehicleInfo', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by VehicleInfo
 */

const makeSelectVehicleInfo = () =>
  createSelector(selectVehicleInfoDomain, substate => substate.toJS());

export default makeSelectVehicleInfo;
export { selectVehicleInfoDomain };
