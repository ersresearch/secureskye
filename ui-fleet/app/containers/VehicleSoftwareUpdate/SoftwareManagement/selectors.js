/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 08:53:27 
 * @Last Modified by:   NhuHH 
 * @Last Modified time: 2018-11-13 08:53:27 
 */
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSoftwareManagementDomain = state =>
  state.get('softwareManagement', initialState);

const makeSelectSoftwareManagement = () =>
  createSelector(selectSoftwareManagementDomain, substate => substate.toJS());

export default makeSelectSoftwareManagement;
export { selectSoftwareManagementDomain };
