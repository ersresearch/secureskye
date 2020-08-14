/*
 *
 * AnomaliesChart reducer
 *
 */

import { fromJS } from 'immutable';
import actionTypes from './constants';

export const initialState = fromJS({
  data: [
    {
      timestamp: 1537779195,
      detected: 10,
      blocked: 10,
    },
    {
      timestamp: 1637779000,
      detected: 100,
      blocked: 10,
    },
    {
      timestamp: 1737779000,
      detected: 200,
      blocked: 10,
    },
    {
      timestamp: 1837779000,
      detected: 300,
      blocked: 10,
    },
    {
      timestamp: 1937779000,
      detected: 1000,
      blocked: 100,
    },
    {
      timestamp: 2037779000,
      detected: 600,
      blocked: 100,
    },
    {
      timestamp: 2137779000,
      detected: 500,
      blocked: 100,
    },
  ],
  duration: '1',
});

function anomaliesChartReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_DURATION:
      return state.set('duration', fromJS(action.payload.duration));
    case actionTypes.GET_ANOMALIES.SUCCESS:
      return state.set('data', fromJS(action.payload.Result));
    case actionTypes.GET_ANOMALIES.FAILURE:
      return state.set('data', fromJS([]));
    case actionTypes.GET_ANOMALIES_CURRENT.SUCCESS: {
      const newData = state.get('data').toJS();
      newData[newData.length - 1].detected = action.payload.data.detected;
      newData[newData.length - 1].blocked = action.payload.data.blocked;
      return state.set('data', fromJS(newData));
    }
    default:
      return state;
  }
}

export default anomaliesChartReducer;
