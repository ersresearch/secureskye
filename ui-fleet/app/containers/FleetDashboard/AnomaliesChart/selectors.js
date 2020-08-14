import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the anomaliesChart state domain
 */

const selectAnomaliesChartDomain = state =>
  state.get('anomaliesChart', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AnomaliesChart
 */

const makeSelectAnomaliesChart = () =>
  createSelector(selectAnomaliesChartDomain, substate => substate.toJS());

export default makeSelectAnomaliesChart;
export { selectAnomaliesChartDomain };
