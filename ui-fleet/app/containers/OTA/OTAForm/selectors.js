import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectOTAForm = state => state.get('otaForm', initialState);

const makeSelectOTAForm = () =>
  createSelector(selectOTAForm, substate => substate.toJS());

export { selectOTAForm };
export default makeSelectOTAForm;
