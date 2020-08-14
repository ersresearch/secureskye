/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';
import { actionTypes } from './constants';

export const initialState = fromJS({
  tokens: {},
  loggedIn: false,
  userDetail: {},
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN.SUCCESS:
      return state.merge({ tokens: action.payload, loggedIn: true });
    case actionTypes.GET_USER_PROFILE.SUCCESS:
      return state.set('userDetail', action.payload);
    case actionTypes.LOG_OUT: {
      return initialState;
    }
    default:
      return state;
  }
}

export default loginReducer;
