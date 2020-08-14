/*
 *
 * Alert reducer
 *
 */

import { fromJS } from 'immutable';
import { CHANGE_ALERT_STATUS } from './constants';

export const initialState = fromJS({
  status: '',
  alertDialogStatus: false,
});

function alertReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ALERT_STATUS:
      return state.set('alertDialogStatus', action.payload);
    default:
      return state;
  }
}

export default alertReducer;
