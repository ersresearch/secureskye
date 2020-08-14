/*
 *
 * SecurityStatus reducer
 *
 */

import { fromJS } from 'immutable';
import _isUndefined from 'lodash/isUndefined';
import { actionTypes } from './constants';

export const initialState = fromJS({
  data: [],
});

function securityStatusReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_SECURITY_STATUS.SUCCESS: {
      const currentData = action.payload.data;
      if (!_isUndefined(currentData)) {
        currentData.forEach((data, index) => {
          const flag = data.securitySettingConfig.find(item => item.isActive);
          if (flag) {
            currentData[index].isActive = true;
          }
        });
        return state.set('data', fromJS(currentData));
      }
      return state.set('data', fromJS([]));
    }

    default:
      return state;
  }
}

export default securityStatusReducer;
