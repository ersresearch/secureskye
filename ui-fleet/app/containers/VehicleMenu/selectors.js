/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:19:14 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 09:19:14 
 */
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the vehicleMenu state domain
 */

const selectVehicleMenuDomain = state => state.get('vehicleMenu', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by VehicleMenu
 */

const makeSelectVehicleMenu = () =>
  createSelector(selectVehicleMenuDomain, substate => substate.toJS());

export default makeSelectVehicleMenu;
export { selectVehicleMenuDomain };
