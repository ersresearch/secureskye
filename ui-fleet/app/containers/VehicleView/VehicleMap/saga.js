/*
 * @Author: DatNT62 
 * @Date: 2018-11-13 09:04:45 
 * @Last Modified by: DatNT62
 * @Last Modified time: 2018-11-16 10:26:47
 */
import { takeLatest, put } from 'redux-saga/effects';
import { get } from 'utils/apiSaga';
import _ from 'lodash';
import _isUndefined from 'lodash/isUndefined';
import api from 'commons/api/vehicleView';
import ActionTypes from './constants';

export function* callApiGetAllMarkers(action) {
  const { vehicleId } = action.payload;
  if (!_isUndefined(vehicleId)) {
    const markers = yield get(
      api.markers(vehicleId),
      ActionTypes.GET_ALL_MARKERS,
    );
    if (markers.data) {
      for (let i = 0; i < markers.data.content.length; i += 1) {
        const { longitude, latitude } = markers.data.content[
          i
        ].ecuAlertLocation;
        const placeNames = yield get(
          api.placeName(longitude, latitude),
          ActionTypes.GET_PLACE_NAME,
        );
        const newData = {
          id: markers.data.content[i].id,
          address:
            _.size(placeNames.data.features) === 0
              ? 'Can not find this address'
              : placeNames.data.features[0].place_name,
        };
        yield put({ type: ActionTypes.ADD_A_ADDRESS, payload: newData });
      }
    }
  }
}
export function* callApiGetTheLatestPoint(action) {
  const { vehicleId } = action.payload;
  if (!_isUndefined(vehicleId)) {
    yield get(api.theLatestPoint(vehicleId), ActionTypes.GET_THE_LATEST_POINT);
  }
}
export function* callApiGetAddress(action) {
  const { longitude, latitude } = action.payload.ecuAlertLocation;
  const placeNames = yield get(
    api.placeName(longitude, latitude),
    ActionTypes.GET_PLACE_NAME,
  );
  const newData = {
    id: action.payload.id,
    address: placeNames.data.features[0].place_name,
  };
  yield put({ type: ActionTypes.ADD_A_ADDRESS, payload: newData });
}

export default function* vehicleMap() {
  yield [
    takeLatest(ActionTypes.GET_ALL_MARKERS.REQUEST, callApiGetAllMarkers),
    takeLatest(ActionTypes.GET_PLACE_NAME.REQUEST, callApiGetAddress),
    takeLatest(
      ActionTypes.GET_THE_LATEST_POINT.REQUEST,
      callApiGetTheLatestPoint,
    ),
  ];
}
