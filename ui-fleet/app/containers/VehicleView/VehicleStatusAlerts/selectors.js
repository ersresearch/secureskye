import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the vehicleStatusAlerts state domain
 */

const selectVehicleStatusAlertsDomain = state =>
  state.get('vehicleStatusAlerts', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by VehicleStatusAlerts
 */

const makeSelectVehicleStatusAlerts = () =>
  createSelector(selectVehicleStatusAlertsDomain, substate => substate.toJS());

export default makeSelectVehicleStatusAlerts;
export { selectVehicleStatusAlertsDomain };
