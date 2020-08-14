/*
 * @Author: DatNT62 
 * @Date: 2018-11-13 08:57:42 
 * @Last Modified by:   DatNT62 
 * @Last Modified time: 2018-11-13 08:57:42 
 */
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the totalVehicleChart state domain
 */

const selectTotalVehicleChartDomain = state =>
  state.get('totalVehicleChart', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by TotalVehicleChart
 */

const makeSelectTotalVehicleChart = () =>
  createSelector(selectTotalVehicleChartDomain, substate => substate.toJS());

export default makeSelectTotalVehicleChart;
export { selectTotalVehicleChartDomain };
