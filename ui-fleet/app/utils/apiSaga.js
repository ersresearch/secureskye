import { call, put as putSaga } from 'redux-saga/effects';
import {
  getAPI,
  postAPI,
  putAPI,
  deleteAPI,
  patchAPI,
} from 'utils/axiosInstance';

export function* get(url, actionType) {
  try {
    const result = yield call(getAPI(url));
    yield putSaga({ type: actionType.SUCCESS, payload: result.data });
    return result;
  } catch (err) {
    yield putSaga({ type: actionType.FAILURE, payload: err.response });
    return err.response;
  }
}

export function* post(url, actionType, body) {
  try {
    const result = yield call(postAPI(url, body));
    yield putSaga({ type: actionType.SUCCESS, payload: result.data });
    return result;
  } catch (err) {
    yield putSaga({ type: actionType.FAILURE, payload: err.response });
    return err.response;
  }
}

export function* put(url, actionType, body) {
  try {
    const result = yield call(putAPI(url, body));
    yield putSaga({ type: actionType.SUCCESS, payload: result.data });
    return result;
  } catch (err) {
    yield putSaga({ type: actionType.FAILURE, payload: err.response });
    return err.response;
  }
}

export function* Delete(url, actionType, body) {
  try {
    const result = yield call(deleteAPI(url, body));
    yield putSaga({ type: actionType.SUCCESS, payload: result.data });
    return result;
  } catch (err) {
    yield putSaga({ type: actionType.FAILURE, payload: err.response });
    return err.response;
  }
}

export function* patch(url, actionType, body) {
  try {
    const result = yield call(patchAPI(url, body));
    yield putSaga({ type: actionType.SUCCESS, payload: result.data });
    return result;
  } catch (err) {
    yield putSaga({ type: actionType.FAILURE, payload: err.response });
    return err.response;
  }
}
