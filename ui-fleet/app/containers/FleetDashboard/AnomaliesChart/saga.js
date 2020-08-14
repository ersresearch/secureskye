// import { takeEvery } from 'redux-saga/effects';
// import { get } from 'utils/apiSaga';
// import apiAnomaliesChart from 'commons/api/anomaliesChart';
// import actionTypes from './constants';

// export function* callApiGetAnomalies(action) {
//   const { duration } = action.payload;
//   yield get(apiAnomaliesChart.anomalies + duration, actionTypes.GET_ANOMALIES);
// }

export default function* anomaliesSaga() {
  // yield takeEvery(actionTypes.GET_ANOMALIES.REQUEST, callApiGetAnomalies);
}
