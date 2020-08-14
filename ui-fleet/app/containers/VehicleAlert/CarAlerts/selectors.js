/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 09:32:21 
 * @Last Modified by:   NhuHH 
 * @Last Modified time: 2018-11-13 09:32:21 
 */
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the CarAlerts state domain
 */

const selectCarAlertsDomain = state => state.get('carAlerts', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by CarAlerts
 */

const makeSelectCarAlerts = () =>
  createSelector(selectCarAlertsDomain, substate => substate.toJS());

export { makeSelectCarAlerts, selectCarAlertsDomain };
