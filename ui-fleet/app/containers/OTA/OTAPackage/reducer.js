/* eslint-disable no-underscore-dangle */
import { fromJS } from 'immutable';
import Chance from 'chance';
import _isEmpty from 'lodash/isEmpty';
import { actionTypes } from './constants';

export const initialState = fromJS({
  data: [],
  selectedRow: '',
  statusCheck: [],
  alertDialogStatus: false,
  isLoading: false,
});

const chance = new Chance();

function otaPackageReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_ALL_OTA_PACKAGE.SUCCESS: {
      const OTAList = [];
      if (!_isEmpty(action.payload.data)) {
        action.payload.data.forEach(item => {
          const _id = chance.guid();
          const data = {
            _id,
            ...item,
          };
          OTAList.push(data);
        });
      }
      return state.set('data', OTAList);
    }
    case actionTypes.HANDLE_SELECT_ROW_ID:
      return state.set('selectedRow', action.payload.id);
    case actionTypes.HANDLE_STATUS_CHECK_LIST:
      return state.set('statusCheck', action.payload.list);
    case actionTypes.HANDLE_STATUS_DIALOG:
      return state.set('alertDialogStatus', action.payload.status);
    case actionTypes.HANDLE_DELETE_OTA.REQUEST:
      return state.set('isLoading', true);
    case actionTypes.HANDLE_DELETE_OTA.SUCCESS:
      return state.set('isLoading', false);
    case actionTypes.HANDLE_DELETE_OTA.FAILURE:
      return state.set('isLoading', false);
    default:
      return state;
  }
}

export default otaPackageReducer;
