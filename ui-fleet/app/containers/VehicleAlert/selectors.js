/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 09:20:46 
 * @Last Modified by:   NhuHH 
 * @Last Modified time: 2018-11-13 09:20:46 
 */
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the vehicleAlert state domain
 */

const selectVehicleAlertDomain = state =>
  state.get('vehicleAlert', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by VehicleAlert
 */

const makeSelectVehicleAlert = () =>
  createSelector(selectVehicleAlertDomain, substate => substate.toJS());

export default makeSelectVehicleAlert;
export { selectVehicleAlertDomain };
