/*
 *
 * VehicleInfo reducer
 *
 */

import { fromJS } from 'immutable';
import { ApiGatewayUrl } from 'commons/constants';
import { actionTypes } from './constants';

export const initialState = fromJS({
  data: {},
  dataDisplay: {},
  image: '',
});

function vehicleInfoReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.RESET_VEHICLE_INFO: {
      return initialState;
    }
    case actionTypes.GET_VEHICLE_INFO.SUCCESS: {
      const {
        name,
        vin,
        makerName,
        modelName,
        color,
        bodyType,
        imageUrl,
      } = action.payload;
      const currentData = {
        name,
        vin,
        makerName,
        modelName,
        color,
        bodyType,
      };
      return state.merge({
        data: fromJS(action.payload),
        dataDisplay: fromJS(currentData),
        image: fromJS(ApiGatewayUrl + imageUrl),
      });
    }
    default:
      return state;
  }
}

export default vehicleInfoReducer;
