import { delay } from 'redux-saga';
import { race, put, call, take, takeLatest } from 'redux-saga/effects';
import _isEmpty from 'lodash/isEmpty';
import { authService } from 'auth/authServices';
import { getTokens, setTokens, clearTokens } from 'utils/localStorage';
import { get } from 'utils/apiSaga';
import { ShowNotify } from 'utils/actionUtils';
import api from 'commons/api/user';
import { actionTypes } from './constants';

function* getUserProfileSaga() {
  const response = yield get(api.userDetail, actionTypes.GET_USER_PROFILE);
  if (response.status === 401) {
    let tokens = yield call(getTokens);
    const refreshToken = { refresh_token: tokens.refresh_token };
    tokens = yield call(authorize, refreshToken);
    if (!tokens) {
      yield put({
        type: actionTypes.LOG_OUT,
      });
    }
  }
}

function* authorize(credentials) {
  try {
    const response = yield call(authService, credentials);
    if (_isEmpty(response.data.access_token)) {
      return null;
    }
    yield call(setTokens, response.data); // save to local storage
    yield put({
      type: actionTypes.LOGIN.SUCCESS,
      payload: response.data,
    });
    yield call(getUserProfileSaga);
    return response.data;
  } catch (error) {
    yield call(clearTokens);
    return null;
  }
}

function* authFlowSaga() {
  let tokens = yield call(getTokens); // Get from local storage
  while (true) {
    if (_isEmpty(tokens)) {
      const credentials = yield take(actionTypes.LOGIN.REQUEST);
      tokens = yield call(authorize, credentials.payload);
      if (!tokens) {
        ShowNotify('error', 'Login failed, please try again');
      }
    }
    let userSignedOut;
    while (!userSignedOut && tokens) {
      const { expired } = yield race({
        expired: call(delay, (tokens.expires_in - 10) * 1000),
        logout: take(actionTypes.LOG_OUT),
      });
      // token expired first
      if (expired) {
        const refreshToken = { refresh_token: tokens.refresh_token };
        tokens = yield call(authorize, refreshToken);
        // When authorization failed
        if (!tokens) {
          tokens = {};
          userSignedOut = true;
          ShowNotify(
            'error',
            'The session token has expired. You need to login again',
          );
          yield put({
            type: actionTypes.LOG_OUT,
          });
        }
      }
      // When user signed out before token expiration
      else {
        yield call(clearTokens);
        tokens = {};
        userSignedOut = true;
        yield put({
          type: actionTypes.LOG_OUT,
        });
      }
    }
  }
}

export default function* login() {
  yield [
    call(authFlowSaga),
    takeLatest(actionTypes.GET_USER_PROFILE.REQUEST, getUserProfileSaga),
  ];
}
