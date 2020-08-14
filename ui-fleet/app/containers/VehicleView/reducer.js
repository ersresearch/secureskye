/*
 *
 * VehicleView reducer
 *
 */

import { fromJS } from 'immutable';
import { actionTypes } from './constants';

export const initialState = fromJS({
  status: {},
});

function vehicleViewReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_DATA_DISPLAY_MODEL:
      return state.set('status', action.payload.data);
    default:
      return state;
  }
}
export default vehicleViewReducer;
