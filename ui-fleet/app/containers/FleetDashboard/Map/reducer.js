/*
 * @Author: DatNT62 
 * @Date: 2018-11-13 08:59:27 
 * @Last Modified by:   DatNT62 
 * @Last Modified time: 2018-11-13 08:59:27 
 */
/*
 *
 * Map reducer
 *
 */

import { fromJS } from 'immutable';
import ActionTypes from './constants';

export const initialState = fromJS({
  markers: [],
});

function mapReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_ALL_MARKERS.SUCCESS:
      return state.set('markers', action.payload);
    case ActionTypes.GET_ALL_MARKERS.FAILURE:
      return state.set('markers', []);
    case ActionTypes.FILTER_MARKER:
      return state.set('markers', action.payload);
    default:
      return state;
  }
}

export default mapReducer;
