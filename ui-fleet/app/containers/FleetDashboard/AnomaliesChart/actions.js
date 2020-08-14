/*
 * @Author: DatNT62 
 * @Date: 2018-11-13 09:00:30 
 * @Last Modified by:   DatNT62 
 * @Last Modified time: 2018-11-13 09:00:30 
 */
/*
 *
 * AnomaliesChart actions
 *
 */
import actionTypes from './constants';

export function changeDuration(duration) {
  return {
    type: actionTypes.CHANGE_DURATION,
    payload: {
      duration,
    },
  };
}

export function getAnomalies(duration) {
  return {
    type: actionTypes.GET_ANOMALIES.REQUEST,
    payload: {
      duration,
    },
  };
}

export function getAnomaliesCurrent(data) {
  return {
    type: actionTypes.GET_ANOMALIES_CURRENT.SUCCESS,
    payload: {
      data,
    },
  };
}
