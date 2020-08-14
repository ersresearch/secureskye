/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:01:55 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 09:01:55 
 */
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the riskLevelGaugeChart state domain
 */

const selectRiskLevelGaugeChartDomain = state =>
  state.get('riskLevelGaugeChart', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by RiskLevelGaugeChart
 */

const makeSelectRiskLevelGaugeChart = () =>
  createSelector(selectRiskLevelGaugeChartDomain, substate => substate.toJS());

export default makeSelectRiskLevelGaugeChart;
export { selectRiskLevelGaugeChartDomain };
