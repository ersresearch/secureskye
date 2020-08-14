import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectOTAPackage = state => state.get('otaPackage', initialState);

const makeSelectOTAPackage = () =>
  createSelector(selectOTAPackage, substate => substate.toJS());

export { selectOTAPackage };
export default makeSelectOTAPackage;
