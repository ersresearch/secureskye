import { takeLatest, put, select } from 'redux-saga/effects';
import { get, post, put as putMethod, patch } from 'utils/apiSaga';
import { routerActions } from 'react-router-redux';
import _isUndefined from 'lodash/isUndefined';
import _isEmpty from 'lodash/isEmpty';
import api from 'commons/api/role';
import { Snackbars } from 'components/Snackbars';
import { actionTypes } from './constants';
import { getAllRoles, selectedRow } from './actions';
import makeSelectRole from './selectors';

function* fetchAuthorities() {
  yield get(api.authorities, actionTypes.GET_AUTHORITY_CONFIG);
}

function* createRole(action) {
  const { data } = action.payload;
  const response = yield post(api.roles, actionTypes.CREATE_ROLE, data);
  if (response.status <= 200) {
    yield put(routerActions.push('/fleet-ui/role'));
    yield put(getAllRoles());
    Snackbars(response.status, `Create role successfully`);
  } else {
    Snackbars(response.status, response.data.message);
  }
}

function* updateRole(action) {
  const { data } = action.payload;
  const { id } = action.payload;
  const response = yield putMethod(
    api.roleByID(id),
    actionTypes.UPDATE_ROLE,
    data,
  );
  if (response.status <= 200) {
    yield put(routerActions.push('/fleet-ui/role'));
    yield put(getAllRoles());
    Snackbars(response.status, `Update role successfully`);
  } else {
    Snackbars(response.status, response.data.message);
  }
}

function* deleteRole(action) {
  const { data } = action.payload;
  const response = yield patch(api.roles, actionTypes.DELETE_ROLE, data);
  if (response.status <= 200) {
    yield put(getAllRoles());
    Snackbars(response.status, `Delete role successfully`);
  } else {
    Snackbars(response.status, response.data.message);
  }
}

function* callAPIGetAllRoles() {
  yield get(api.roles, actionTypes.GET_ALL_ROLES);
  const roles = yield select(makeSelectRole());
  if (!_isEmpty(roles.data)) {
    yield put(selectedRow(roles.data[0].id));
  }
}

export function* callAPIGetRoleByID(action) {
  const { id } = action.payload;
  if (!_isUndefined(id)) {
    yield get(api.roleByID(id), actionTypes.GET_ROLE_BY_ID);
  }
}

export default function* roleManagement() {
  yield [
    takeLatest(actionTypes.GET_AUTHORITY_CONFIG.REQUEST, fetchAuthorities),
    takeLatest(actionTypes.CREATE_ROLE.REQUEST, createRole),
    takeLatest(actionTypes.GET_ALL_ROLES.REQUEST, callAPIGetAllRoles),
    takeLatest(actionTypes.GET_ROLE_BY_ID.REQUEST, callAPIGetRoleByID),
    takeLatest(actionTypes.UPDATE_ROLE.REQUEST, updateRole),
    takeLatest(actionTypes.DELETE_ROLE.REQUEST, deleteRole),
  ];
}
