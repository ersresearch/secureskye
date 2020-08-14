/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:22:11 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 09:22:11 
 */
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the carInfoChart state domain
 */

const selectCarInfoChartDomain = state =>
  state.get('carInfoChart', initialState);
const selectVehicleInfoDomain = state => state.get('vehicleInfo', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by CarInfoChart
 */

const makeSelectCarInfoChart = () =>
  createSelector(selectCarInfoChartDomain, substate => substate.toJS());
const makeSelectVehicleInfo = () =>
  createSelector(selectVehicleInfoDomain, substate => substate.toJS());
export { makeSelectCarInfoChart, makeSelectVehicleInfo };
export { selectCarInfoChartDomain, selectVehicleInfoDomain };
