/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 08:52:29 
 * @Last Modified by:   NhuHH 
 * @Last Modified time: 2018-11-13 08:52:29 
 */
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectVehicleSoftwareUpdateDomain = state =>
  state.get('vehicleSoftwareUpdate', initialState);

const makeSelectVehicleSoftwareUpdate = () =>
  createSelector(selectVehicleSoftwareUpdateDomain, substate =>
    substate.toJS(),
  );

export default makeSelectVehicleSoftwareUpdate;
export { selectVehicleSoftwareUpdateDomain };
