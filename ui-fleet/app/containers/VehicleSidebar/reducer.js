/*
 *
 * VehicleSidebar reducer
 *
 */

import { fromJS } from 'immutable';
import { actionTypes } from './constants';

export const initialState = fromJS({
  tabIndex: 0,
});

function vehicleSidebarReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_TAB_INDEX:
      return state.set('tabIndex', action.index);
    default:
      return state;
  }
}

export default vehicleSidebarReducer;
