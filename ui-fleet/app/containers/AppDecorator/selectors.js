import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the riskLevelGaugeChart state domain
 */

const selectAppDecoratorDomain = state =>
  state.get('appDecorator', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by RiskLevelGaugeChart
 */

const makeSelectAppDecoratorDomain = () =>
  createSelector(selectAppDecoratorDomain, substate => substate.toJS());

export default makeSelectAppDecoratorDomain;
export { selectAppDecoratorDomain };
