/*
 *
 * VehicleList reducer
 *
 */

import { fromJS } from 'immutable';
import { actionTypes } from './constants';

export const initialState = fromJS({
  filter: 'DEFAULT',
  search: '',
});

function vehicleListReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_SEARCH_VEHICLE:
      return state.set('search', fromJS(action.payload.value));
    case actionTypes.CHANGE_FILTER_VEHICLE:
      return state.set('filter', fromJS(action.payload.filter));
    default:
      return state;
  }
}

export default vehicleListReducer;
