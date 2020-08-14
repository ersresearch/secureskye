/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:04:42 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 09:04:42 
 */
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectVehicleDomain = state => state.get('vehicle', initialState);

const makeSelectVehicle = () =>
  createSelector(selectVehicleDomain, substate => substate.toJS());

export { selectVehicleDomain, makeSelectVehicle };
