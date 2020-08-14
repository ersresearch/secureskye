/*
 *
 * TimeDataGraph actions
 *
 */
import ActionTypes from './constants';

export function handleChangeTab(tabIndex) {
  return {
    type: ActionTypes.CHANGE_TAB,
    payload: tabIndex,
  };
}
export function handleChangeDuration(duration) {
  return {
    type: ActionTypes.CHANGE_DURATION,
    payload: duration,
  };
}
export function getDataSpeed(vehicleId, minTimestamp) {
  return {
    type: ActionTypes.GET_DATA_SPEED.REQUEST,
    payload: {
      vehicleId,
      minTimestamp,
    },
  };
}
export function getDataSpeedFilter(vehicleId, minTimestamp, timeSeriesOption) {
  return {
    type: ActionTypes.GET_DATA_SPEED_FIVE.REQUEST,
    payload: {
      vehicleId,
      minTimestamp,
      timeSeriesOption,
    },
  };
}

export function getDataRpmFilter(vehicleId, minTimestamp, timeSeriesOption) {
  return {
    type: ActionTypes.GET_DATA_RPM_FIVE.REQUEST,
    payload: {
      vehicleId,
      minTimestamp,
      timeSeriesOption,
    },
  };
}
export function getDataRpm(vehicleId, minTimestamp) {
  return {
    type: ActionTypes.GET_DATA_RPM.REQUEST,
    payload: {
      vehicleId,
      minTimestamp,
    },
  };
}
