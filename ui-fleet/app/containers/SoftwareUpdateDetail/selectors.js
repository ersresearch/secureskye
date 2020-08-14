/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 08:53:48 
 * @Last Modified by:   NhuHH 
 * @Last Modified time: 2018-11-13 08:53:48 
 */
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the Software Update Detail state domain
 */

const selectSoftwareUpdateDetailDomain = state =>
  state.get('SWUpdate', initialState);
/**
 * Other specific selectors
 */

/**
 * Default selector used by SWUpdate
 */

const makeSelectSoftwareUpdateDetail = () =>
  createSelector(selectSoftwareUpdateDetailDomain, substate => substate.toJS());

export { makeSelectSoftwareUpdateDetail };
export { selectSoftwareUpdateDetailDomain };
