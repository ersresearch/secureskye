import { takeLatest } from 'redux-saga/effects';
import { get } from 'utils/apiSaga';
import vehicleView from 'commons/api/vehicleView';
import ActionTypes from './constants';

export function* callApiGetDataSpeed(action) {
  const { vehicleId, minTimestamp } = action.payload;
  yield get(
    `${
      vehicleView.timeDataGraphSpeed
    }/${vehicleId}/events/speed?minTimestamp=${minTimestamp}`,
    ActionTypes.GET_DATA_SPEED,
  );
}
export function* callApiGetDataRpm(action) {
  const { vehicleId, minTimestamp } = action.payload;
  yield get(
    `${
      vehicleView.timeDataGraphSpeed
    }/${vehicleId}/events/rpm?minTimestamp=${minTimestamp}`,
    ActionTypes.GET_DATA_RPM,
  );
}

export function* callApiGetDataSpeedFilter(action) {
  const { vehicleId, minTimestamp, timeSeriesOption } = action.payload;
  yield get(
    vehicleView.timeDataGraphSpeedFilter(
      vehicleId,
      minTimestamp,
      timeSeriesOption,
    ),
    ActionTypes.GET_DATA_SPEED_FIVE,
  );
}
export function* callApiGetDataRpmFilter(action) {
  const { vehicleId, minTimestamp, timeSeriesOption } = action.payload;
  yield get(
    vehicleView.timeDataGraphRpmFilter(
      vehicleId,
      minTimestamp,
      timeSeriesOption,
    ),
    ActionTypes.GET_DATA_RPM_FIVE,
  );
}

export default function* vehicleListSaga() {
  yield [
    takeLatest(ActionTypes.GET_DATA_SPEED.REQUEST, callApiGetDataSpeed),
    takeLatest(ActionTypes.GET_DATA_RPM.REQUEST, callApiGetDataRpm),
    takeLatest(
      ActionTypes.GET_DATA_SPEED_FIVE.REQUEST,
      callApiGetDataSpeedFilter,
    ),
    takeLatest(ActionTypes.GET_DATA_RPM_FIVE.REQUEST, callApiGetDataRpmFilter),
  ];
}
