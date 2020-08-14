/*
 *
 * VehicleStatusAlerts actions
 *
 */
import _isEmpty from 'lodash/isEmpty';
import { getTokens } from 'utils/localStorage';
import { actionTypes } from './constants';

export const getLogin = (username, password) => ({
  type: actionTypes.LOGIN.REQUEST,
  payload: {
    username,
    password,
  },
});

export const getRefreshToken = refreshToken => ({
  type: actionTypes.REFRESH_TOKEN.REQUEST,
  payload: {
    refreshToken,
  },
});

export const getUserProfile = () => ({
  type: actionTypes.GET_USER_PROFILE.REQUEST,
});

export const logout = () => ({
  type: actionTypes.LOG_OUT,
});

export const checkLoggedInUser = () => (dispatch, getState) => {
  const tokens = getTokens();
  const userState = getState().toJS().login;
  if (!_isEmpty(tokens) && !userState.loggedIn) {
    dispatch({ type: actionTypes.LOGIN.SUCCESS, payload: tokens });
    dispatch(getUserProfile());
  } else {
    // console.log('User logged out');
  }
};
