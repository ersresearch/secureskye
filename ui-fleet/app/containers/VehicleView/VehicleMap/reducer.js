/*
 * @Author: DatNT62 
 * @Date: 2018-11-13 09:04:42 
 * @Last Modified by: LoiDT2
 * @Last Modified time: 2018-12-11 15:44:21
 */
/*
 *
 * VehicleMap reducer
 *
 */

import { fromJS } from 'immutable';
import ActionTypes from './constants';
import { actionTypes } from '../CarInfoChart/constants';

export const initialState = fromJS({
  markers: [],
  routes: [],
  classNameForNav: 'navContainver',
});

function vehicleMapReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_ALL_MARKERS.SUCCESS: {
      return state.set('markers', action.payload.content);
    }
    case ActionTypes.GET_THE_LATEST_POINT.SUCCESS: {
      if (action.payload.data !== undefined) {
        return state.set('routes', [action.payload.data[0].gps]);
      }
      return state;
    }
    case ActionTypes.GET_PLACE_NAME.SUCCESS: {
      return state;
    }
    case ActionTypes.ADD_A_ADDRESS: {
      const dataInReducer = state.get('markers');
      const { payload } = action;
      const newDataToReturn = dataInReducer.map(data => {
        if (data.id === payload.id) {
          const newData = { ...data, address: payload.address };
          return newData;
        }
        return data;
      });
      return state.update('markers', () => newDataToReturn);
    }
    case actionTypes.GET_CAR_INFO.SUCCESS: {
      const newPoint = {
        latitude: action.payload.data[0].gps.latitude,
        longitude: action.payload.data[0].gps.longitude,
      };
      let newData = state.get('routes').concat(newPoint);
      if (newData.length >= 100) {
        newData = newData.filter((marker, index) => {
          if (index > 2 && index % 3 === 0) {
            return false;
          }
          return true;
        });
      }
      return state.update('routes', () => newData);
    }
    case ActionTypes.ADD_A_POINT.SUCCESS: {
      return state.update('routes', newData => newData.concat(action.payload));
    }
    case ActionTypes.ADD_A_MARKER_ALERT.SUCCESS: {
      return state.update('markers', newData => {
        newData.unshift(action.payload.body[0]);
        return newData;
      });
    }
    case ActionTypes.CHANGE_CLASSNAME_FOR_NAV: {
      return state.set('classNameForNav', action.payload);
    }
    default:
      return state;
  }
}

export default vehicleMapReducer;
