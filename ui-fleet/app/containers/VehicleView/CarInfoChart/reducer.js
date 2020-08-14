/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:22:03 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 09:22:03 
 */
/*
 *
 * CarInfoChart reducer
 *
 */

import { fromJS } from 'immutable';
import { actionTypes } from './constants';

export const initialState = fromJS({
  tripValue: 0,
  odoValue: 0,
  speedValue: 0,
  rpmValue: 0,
  gear: null,
  speedIndex: 0,
  rpmIndex: 1,
  fuelValue: 0,
  availableDrivingDistance: 0,
  engineValue: 0,
  carStatus: [],
});

function carInfoChartReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_CAR_INFO.SUCCESS:
      return state.merge({
        speedValue: action.payload.data[0].speed,
        rpmValue: action.payload.data[0].rpm,
        tripValue: action.payload.data[0].tripOdometer,
        odoValue: action.payload.data[0].odometer,
        gear: action.payload.data[0].gearShift,
        fuelValue: action.payload.data[0].fuel,
        availableDrivingDistance:
          action.payload.data[0].availableDrivingDistance,
        engineValue: action.payload.data[0].engineCoolant,
      });
    case actionTypes.CAR_INFO_RESET.REQUEST:
      return state.merge({
        tripValue: 0,
        odoValue: 0,
        speedValue: 0,
        rpmValue: 0,
        gear: null,
        fuelValue: 0,
        remaining: 0,
        engineValue: 0,
        availableDrivingDistance: 0,
      });
    default:
      return state;
  }
}

export default carInfoChartReducer;
