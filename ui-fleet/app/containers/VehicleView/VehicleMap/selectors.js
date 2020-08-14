/*
 * @Author: DatNT62 
 * @Date: 2018-11-13 09:04:50 
 * @Last Modified by:   DatNT62 
 * @Last Modified time: 2018-11-13 09:04:50 
 */
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the vehicleMap state domain
 */

const selectVehicleMapDomain = state => state.get('vehicleMap', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by VehicleMap
 */

const makeSelectVehicleMap = () =>
  createSelector(selectVehicleMapDomain, substate => substate.toJS());

export default makeSelectVehicleMap;
export { selectVehicleMapDomain };
