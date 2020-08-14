import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the header state domain
 */

const selectMenuBarDomain = state => state.get('menuBar', initialState);
const selectRouteDomain = state => state.get('route', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Header
 */

const makeSelectMenuBar = () =>
  createSelector(selectMenuBarDomain, substate => substate.toJS());
const makeSelectRoute = () =>
  createSelector(selectRouteDomain, substate => substate.toJS());

export { makeSelectMenuBar, makeSelectRoute };
export { selectMenuBarDomain, selectRouteDomain };
