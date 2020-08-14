import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the vehicleSidebar state domain
 */

const selectVehicleSidebarDomain = state =>
  state.get('vehicleSidebar', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by VehicleSidebar
 */

const makeSelectVehicleSidebar = () =>
  createSelector(selectVehicleSidebarDomain, substate => substate.toJS());

export default makeSelectVehicleSidebar;
export { selectVehicleSidebarDomain };
