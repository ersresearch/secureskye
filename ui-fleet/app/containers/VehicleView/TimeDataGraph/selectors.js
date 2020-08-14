import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the timeDataGraph state domain
 */

const selectTimeDataGraphDomain = state =>
  state.get('timeDataGraph', initialState);
const selectVehicleInfoDomain = state => state.get('vehicleInfo', initialState);
/**
 * Other specific selectors
 */

/**
 * Default selector used by TimeDataGraph
 */

const makeSelectTimeDataGraph = () =>
  createSelector(selectTimeDataGraphDomain, substate => substate.toJS());
const makeSelectVehicleInfo = () =>
  createSelector(selectVehicleInfoDomain, substate => substate.toJS());
export { makeSelectTimeDataGraph, makeSelectVehicleInfo };
export { selectTimeDataGraphDomain };
