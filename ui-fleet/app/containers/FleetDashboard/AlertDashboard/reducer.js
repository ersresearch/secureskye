/*
 *
 * AlertDashboard reducer
 *
 */

import { fromJS } from 'immutable';
import _concat from 'lodash/concat';
import { actionTypes } from './constants';

export const initialState = fromJS({
  data: [],
  currentIndex: 0,
  showAll: true,
  filter: false,
  onClickButton: 'all',
});

function alertDashboardReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_ALERT_DASHBOARD.SUCCESS:
      return state.set('data', action.payload);
    case actionTypes.GET_ALERT_SOCKET.SUCCESS:
      return state.update('data', currentData =>
        _concat(action.payload.reverse(), currentData),
      );
    case actionTypes.GET_ALERT_DATA.SUCCESS: {
      return state.merge({
        currentIndex: 1,
        showAll: !state.get('showAll'),
      });
    }
    case actionTypes.GET_CRITICAL_DATA.SUCCESS: {
      return state.merge({
        currentIndex: 2,
        showAll: !state.get('showAll'),
      });
    }
    case actionTypes.GET_INFORMATION_DATA.SUCCESS: {
      return state.merge({
        currentIndex: 3,
        showAll: !state.get('showAll'),
      });
    }
    case actionTypes.HANDLE_CHANGE_BUTTON_ALERT:
      return state.set('filter', action.filter);
    case actionTypes.GET_CLICK_BUTTON:
      return state.set('onClickButton', action.status);
    default:
      return state;
  }
}

export default alertDashboardReducer;
