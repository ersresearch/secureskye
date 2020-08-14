/* eslint-disable no-underscore-dangle */
import { fromJS } from 'immutable';
import _isUndefined from 'lodash/isUndefined';
import { actionTypes } from './constants';

export const initialState = fromJS({
  otaDetail: {},
  otaFile: '',
  isLoading: false,
});

function otaFormReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.READ_OTA_FILE:
      return state.merge({
        otaDetail: action.payload.data,
        otaFile: action.payload.file,
      });
    case actionTypes.GET_OTA_DETAIL.SUCCESS: {
      const { ecus } = action.payload;
      for (let i = 0; i < ecus.length; i += 1) {
        const { items } = ecus[i];
        for (let j = 0; j < items.length; j += 1) {
          const { softwareId, versionCode, versionName } = items[j];
          if (!_isUndefined(softwareId)) {
            items[j]['software-id'] = softwareId;
            delete items[j].softwareId;
          }
          if (!_isUndefined(versionCode)) {
            items[j]['version-code'] = versionCode;
            delete items[j].versionCode;
          }
          if (!_isUndefined(versionName)) {
            items[j]['version-name'] = versionName;
            delete items[j].versionName;
          }
        }
      }
      return state.set('otaDetail', action.payload);
    }
    case actionTypes.RESET_OTA_DETAIL:
      return state.merge({
        otaDetail: {},
        otaFile: '',
      });
    case actionTypes.UPLOAD_OTA_FILE.REQUEST:
      return state.set('isLoading', true);
    case actionTypes.UPLOAD_OTA_FILE.SUCCESS:
      return state.set('isLoading', false);
    case actionTypes.UPLOAD_OTA_FILE.FAILURE:
      return state.set('isLoading', false);
    case actionTypes.UPDATE_OTA_NAME.REQUEST:
      return state.set('isLoading', true);
    case actionTypes.UPDATE_OTA_NAME.SUCCESS:
      return state.set('isLoading', false);
    case actionTypes.UPDATE_OTA_NAME.FAILURE:
      return state.set('isLoading', false);
    case actionTypes.RELEASE_OTA.REQUEST:
      return state.set('isLoading', true);
    case actionTypes.RELEASE_OTA.SUCCESS:
      return state.set('isLoading', false);
    case actionTypes.RELEASE_OTA.FAILURE:
      return state.set('isLoading', false);
    default:
      return state;
  }
}

export default otaFormReducer;
