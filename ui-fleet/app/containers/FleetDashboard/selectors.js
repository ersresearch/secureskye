import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the fleetDashboard state domain
 */

const selectFleetDashboardDomain = state =>
  state.get('fleetDashboard', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by FleetDashboard
 */

const makeSelectFleetDashboard = () =>
  createSelector(selectFleetDashboardDomain, substate => substate.toJS());

export default makeSelectFleetDashboard;
export { selectFleetDashboardDomain };
