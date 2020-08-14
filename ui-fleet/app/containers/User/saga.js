/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 08:50:26 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-18 10:21:15
 */
import { takeEvery, put as putRedux, select } from 'redux-saga/effects';
import { routerActions } from 'react-router-redux';
import _ from 'lodash';
import axios from 'axios';
import { get, post, put } from 'utils/apiSaga';
import apiOBDUser from 'commons/api/obdUser';
import { ApiGatewayUrl } from 'commons/constants';
import { Snackbars } from 'components/Snackbars/index';
import { BirthDateFormat } from 'utils/timeStampUtil';
import Chance from 'chance';
import { makeAttachmentInformation } from '../User/UserForm/AttachFile/selectors';
import { getNewAdditionalInformation } from './UserForm/AdditionalInformation/actions';
import { getImage } from './UserForm/AttachFile/actions';
import { getNewRoleInformation } from './UserForm/RoleInformation/actions';
import { actionTypes } from './constants';
import { actionTypes as attachFileAction } from './UserForm/AttachFile/constants';
import {
  SelectRowId,
  getListUser,
  getUserListForTable,
  upLoadImage,
  getUserInfo,
} from './actions';

const chance = new Chance();
/* eslint no-underscore-dangle: 0 */
export function* callApiGetDataUser() {
  const reponse = yield get(apiOBDUser.RegisterUser, actionTypes.GET_DATA_USER);
  if (reponse.data !== undefined) {
    if (!_.isEmpty(reponse.data.data)) {
      const dataFormat = [];
      reponse.data.data.forEach(item => {
        const _id = chance.guid();
        const data = {
          _id,
          ...item,
        };
        dataFormat.push(data);
      });
      yield putRedux(getUserListForTable(dataFormat));
      yield putRedux(SelectRowId(reponse.data.data[0].id));
    }
  }
}

export function* callApiGetRoles() {
  yield get(apiOBDUser.Roles, actionTypes.GET_ROLES);
}

export function* callApiGetUserInformationById(action) {
  const { userId } = action.payload;
  const response = yield get(
    apiOBDUser.GetUserByID(userId),
    actionTypes.GET_USER_INFORMATION_BY_ID,
  );
  const { additionalInfo, roles, attachments } = response.data;
  const dataRole = [];
  const dataAdditional = [];
  const dataImage = [];
  if (!_.isUndefined(additionalInfo)) {
    additionalInfo.forEach(item => {
      const _id = chance.guid();
      const data = {
        _id,
        id: _id,
        value: item.value,
        key: item.key,
      };
      dataAdditional.push(data);
    });
    yield putRedux(getNewAdditionalInformation(dataAdditional));
  }
  if (!_.isUndefined(roles)) {
    roles.forEach(item => {
      const _id = chance.guid();
      const data = {
        _id,
        id: _id,
        value: item.id,
        label: item.name,
      };
      dataRole.push(data);
    });
    yield putRedux(getNewRoleInformation(dataRole));
  }
  if (!_.isUndefined(attachments)) {
    for (let i = 0; i < attachments.length; i += 1) {
      const data = {
        url: ApiGatewayUrl + attachments[i].urlImage,
        name: attachments[i].fileName,
        id: attachments[i].id,
      };
      dataImage.push(data);
      yield putRedux(getImage(data));
    }
  }
  const currentData = {
    name: response.data.name,
    enabled: response.data.enabled,
    firstName: response.data.firstName,
    lastName: response.data.lastName,
    email: response.data.email,
    area_code: {
      value: response.data.phoneAreaCode,
      label: response.data.phoneAreaCode,
    },
    phoneNumber: response.data.phoneNumber,
    gender: {
      value: response.data.gender || false,
      label: response.data.gender ? 'Male' : 'Female',
    },
    birthday: BirthDateFormat(response.data.birthday),
    nationality: {
      value: response.data.nationality,
      label: response.data.nationality,
    },
    address: response.data.address,
    additional: additionalInfo || [],
    dataRole,
    dataImage,
  };
  yield putRedux(getUserInfo(currentData));
}

export function* callApiGetImage(action) {
  const { image } = action.payload;
  try {
    const response = yield axios
      .get(image.url, {
        responseType: 'blob',
      })
      .then(res => res)
      .catch(err => {
        throw err;
      });
    const file = new File([response.data], image.name);
    yield putRedux({
      type: attachFileAction.GET_IMAGE.SUCCESS,
      payload: { files: file, dataImage: image },
    });
    return response.data;
  } catch (error) {
    return null;
  }
}

export function* patchApiUserUpdate(action) {
  const { userId, data } = action.payload;
  const attachment = yield select(makeAttachmentInformation());
  const reponse = yield put(
    apiOBDUser.UpdateUser(userId),
    actionTypes.UPDATE_USER,
    data,
  );
  const formData = new FormData();
  attachment.files.map(item => formData.append('files', item));
  yield putRedux(upLoadImage(userId, formData));
  if (reponse.status <= 200) {
    yield putRedux(routerActions.push('/fleet-ui/user-list'));
    yield putRedux(getListUser());
    Snackbars(reponse.status, `Update user successfully`);
  } else {
    Snackbars(reponse.status, reponse.data.message);
  }
}

export function* postApiUserRegister(action) {
  const { data } = action.payload;
  const attachment = yield select(makeAttachmentInformation());
  const reponse = yield post(
    apiOBDUser.RegisterUser,
    actionTypes.POST_CREATE_USER,
    data,
  );
  const userId = reponse.data.id;
  const formData = new FormData();
  attachment.files.map(item => formData.append('files', item));
  yield putRedux(upLoadImage(userId, formData));
  if (reponse.status <= 200) {
    yield putRedux(routerActions.push('/fleet-ui/user-list'));
    yield putRedux(getListUser());
    Snackbars(reponse.status, `Create user successfully`);
  } else {
    Snackbars(reponse.status, reponse.data.message);
  }
}

export function* putApiActiveUser(action) {
  const { userId, value } = action.payload;
  const reponse = yield put(
    apiOBDUser.Active(userId, value),
    actionTypes.ACTIVE_USER,
  );
  if (reponse.status <= 200) {
    yield putRedux(getListUser());
    if (value) {
      Snackbars(reponse.status, `Active user successfully`);
    } else {
      Snackbars(reponse.status, `Deactivate user successfully`);
    }
  } else {
    Snackbars(reponse.status, reponse.data.message);
  }
}
export function* callApiUpLoadImage(action) {
  const { userId } = action.payload;
  let { file } = action.payload;
  const attachment = yield select(makeAttachmentInformation());
  if (_.isEmpty(attachment.files)) {
    file = [];
  }
  const reponse = yield put(
    apiOBDUser.UploadImage(userId),
    actionTypes.UPLOAD_IMAGE,
    file,
  );
  if (reponse.status <= 200) {
    yield putRedux(getListUser());
  }
}
export default function* UserManagement() {
  yield takeEvery(actionTypes.GET_DATA_USER.REQUEST, callApiGetDataUser);
  yield takeEvery(actionTypes.GET_ROLES.REQUEST, callApiGetRoles);
  yield takeEvery(
    actionTypes.GET_USER_INFORMATION_BY_ID.REQUEST,
    callApiGetUserInformationById,
  );
  yield takeEvery(actionTypes.UPDATE_USER.REQUEST, patchApiUserUpdate);
  yield takeEvery(actionTypes.POST_CREATE_USER.REQUEST, postApiUserRegister);
  yield takeEvery(actionTypes.ACTIVE_USER.REQUEST, putApiActiveUser);
  yield takeEvery(attachFileAction.GET_IMAGE.REQUEST, callApiGetImage);
  yield takeEvery(actionTypes.UPLOAD_IMAGE.REQUEST, callApiUpLoadImage);
}
