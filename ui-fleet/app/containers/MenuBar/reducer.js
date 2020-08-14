/*
 *
 * Header reducer
 *
 */

import { fromJS } from 'immutable';
import ActionTypes from './constants';

export const initialState = fromJS({
  tabIndexInHeader: 0,
  tabIndex: 0,
  openMenu: false,
});

function menuBarReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.CHANGE_TAB_HEADER: {
      return state.set('tabIndexInHeader', fromJS(action.payload));
    }
    case ActionTypes.CHANGE_TAB_MENU:
      return state.set('tabIndex', fromJS(action.payload));
    default:
      return state;
  }
}

export default menuBarReducer;
