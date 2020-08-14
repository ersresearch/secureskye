/*
 *
 *TimeataGraph reducer
 *
 */

import { fromJS } from 'immutable';
import _ from 'lodash';
import ActionTypes from './constants';
import { actionTypes } from '../CarInfoChart/constants';

export const initialState = fromJS({
  data: [],
  duration: '0',
  tabIndex: 0,
  speedCount: 0,
  rpmCount: 0,
  socketSpeedValue: 0,
  socketRpmValue: 0,
});

function timedataGraphReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_CAR_INFO.SUCCESS: {
      const dataInReducer = state.get('data').toJS();
      const durationInReducer = state.get('duration');
      const tabIndexInReducer = state.get('tabIndex');
      let speedCountInReducer = state.get('speedCount');
      let rpmCountInReducer = state.get('rpmCount');
      let socketSpeedInReducer = state.get('socketSpeedValue');
      let socketRpmInReducer = state.get('socketRpmValue');
      if (durationInReducer === '0') {
        if (dataInReducer.length >= 1) {
          let currentData = {};
          if (tabIndexInReducer === 0) {
            currentData = {
              timestamp: action.payload.data[0].timestamp,
              value: action.payload.data[0].speed,
            };
          } else if (tabIndexInReducer === 1) {
            currentData = {
              timestamp: action.payload.data[0].timestamp,
              value: action.payload.data[0].rpm,
            };
          }
          const secondValue =
            Math.floor(
              Number(action.payload.data[0].timestamp) / 1000 -
                Number(dataInReducer[dataInReducer.length - 1].timestamp) /
                  1000,
            ) * 1000;
          if (secondValue === 0) {
            dataInReducer[dataInReducer.length - 1].timestamp =
              action.payload.data[0].timestamp;
            if (
              tabIndexInReducer === 0 &&
              action.payload.data[0].speed >= 0 &&
              action.payload.data[0].speed <= 220
            ) {
              dataInReducer[dataInReducer.length - 1].value =
                action.payload.data[0].speed;
            } else if (
              tabIndexInReducer === 1 &&
              action.payload.data[0].rpm >= 0 &&
              action.payload.data[0].rpm <= 12000
            ) {
              dataInReducer[dataInReducer.length - 1].value =
                action.payload.data[0].rpm;
            }
            return state.set('data', fromJS(dataInReducer));
          }
          if (
            tabIndexInReducer === 0 &&
            (action.payload.data[0].speed >= 0 &&
              action.payload.data[0].speed <= 220)
          ) {
            dataInReducer.push(currentData);
            if (dataInReducer.length > 7) {
              dataInReducer.shift();
            }
          } else if (
            tabIndexInReducer === 1 &&
            (action.payload.data[0].rpm >= 0 &&
              action.payload.data[0].rpm <= 12000)
          ) {
            dataInReducer.push(currentData);
            if (dataInReducer.length > 7) {
              dataInReducer.shift();
            }
          }
          return state.set('data', fromJS(dataInReducer));
        }
        let currentData = {};
        if (tabIndexInReducer === 0) {
          currentData = {
            timestamp: action.payload.data[0].timestamp,
            value: action.payload.data[0].speed,
          };
        } else if (tabIndexInReducer === 1) {
          currentData = {
            timestamp: action.payload.data[0].timestamp,
            value: action.payload.data[0].rpm,
          };
        }
        if (
          action.payload.data[0].speed >= 0 &&
          action.payload.data[0].speed <= 220 &&
          tabIndexInReducer === 0
        ) {
          dataInReducer.push(currentData);
        } else if (
          tabIndexInReducer === 1 &&
          action.payload.data[0].rpm >= 0 &&
          action.payload.data[0].rpm <= 12000
        ) {
          dataInReducer.push(currentData);
        }
        return state.set('data', fromJS(dataInReducer));
      } else if (durationInReducer === '1') {
        if (dataInReducer.length >= 2) {
          let currentData = {};
          if (tabIndexInReducer === 0) {
            currentData = {
              timestamp: action.payload.data[0].timestamp,
              value: action.payload.data[0].speed,
            };
          } else if (tabIndexInReducer === 1) {
            currentData = {
              timestamp: action.payload.data[0].timestamp,
              value: action.payload.data[0].rpm,
            };
          }
          const sendcondOfFiveMinutes =
            Math.floor(
              action.payload.data[0].timestamp / 60000000000 -
                dataInReducer[dataInReducer.length - 2].timestamp / 60000000000,
            ) * 60000000000;
          if (sendcondOfFiveMinutes <= 300000000000) {
            if (
              action.payload.data[0].speed >= 0 &&
              action.payload.data[0].speed <= 220
            ) {
              speedCountInReducer += 1;
              socketSpeedInReducer += action.payload.data[0].speed;
            }
            if (
              action.payload.data[0].rpm >= 0 &&
              action.payload.data[0].rpm <= 12000
            ) {
              rpmCountInReducer += 1;
              socketRpmInReducer += action.payload.data[0].rpm;
            }
            dataInReducer[dataInReducer.length - 1].timestamp =
              Number(dataInReducer[dataInReducer.length - 2].timestamp) +
              300000000000;
            if (tabIndexInReducer === 0) {
              dataInReducer[dataInReducer.length - 1].value =
                socketSpeedInReducer / speedCountInReducer;
            } else if (tabIndexInReducer === 1) {
              dataInReducer[dataInReducer.length - 1].value =
                socketRpmInReducer / rpmCountInReducer;
            }

            return state.merge({
              data: fromJS(dataInReducer),
              speedCount: speedCountInReducer,
              rpmCount: rpmCountInReducer,
              socketSpeedValue: socketSpeedInReducer,
              socketRpmValue: socketRpmInReducer,
            });
          }
          if (
            tabIndexInReducer === 0 &&
            (action.payload.data[0].speed >= 0 &&
              action.payload.data[0].speed <= 220)
          ) {
            speedCountInReducer = 1;
            socketSpeedInReducer = action.payload.data[0].speed;
            dataInReducer.push(currentData);
            if (dataInReducer.length > 7) {
              dataInReducer.shift();
            }
          } else if (
            tabIndexInReducer === 1 &&
            (action.payload.data[0].rpm >= 0 &&
              action.payload.data[0].rpm <= 12000)
          ) {
            rpmCountInReducer = 1;
            socketRpmInReducer = action.payload.data[0].rpm;
            dataInReducer.push(currentData);
            if (dataInReducer.length > 7) {
              dataInReducer.shift();
            }
          }
          return state.merge({
            data: fromJS(dataInReducer),
            speedCount: speedCountInReducer,
            rpmCount: rpmCountInReducer,
            socketSpeedValue: socketSpeedInReducer,
            socketRpmValue: socketRpmInReducer,
          });
        }
        let currentData = {};
        if (tabIndexInReducer === 0) {
          currentData = {
            timestamp: action.payload.data[0].timestamp,
            value: action.payload.data[0].speed,
          };
        } else if (tabIndexInReducer === 1) {
          currentData = {
            timestamp: action.payload.data[0].timestamp,
            value: action.payload.data[0].rpm,
          };
        }
        if (
          action.payload.data[0].speed >= 0 &&
          action.payload.data[0].speed <= 220 &&
          tabIndexInReducer === 0
        ) {
          if (dataInReducer.length === 1) {
            speedCountInReducer += 1;
            socketSpeedInReducer += action.payload.data[0].speed;
          }

          dataInReducer.push(currentData);
        } else if (
          tabIndexInReducer === 1 &&
          action.payload.data[0].rpm >= 0 &&
          action.payload.data[0].rpm <= 12000
        ) {
          if (dataInReducer.length === 1) {
            rpmCountInReducer += 1;
            socketRpmInReducer += action.payload.data[0].rpm;
          }
          dataInReducer.push(currentData);
        }
        return state.merge({
          data: fromJS(dataInReducer),
          speedCount: speedCountInReducer,
          rpmCount: rpmCountInReducer,
          socketSpeedValue: socketSpeedInReducer,
          socketRpmValue: socketRpmInReducer,
        });
      }
      return state;
    }
    case ActionTypes.CHANGE_TAB:
      return state.set('tabIndex', action.payload);
    case ActionTypes.GET_DATA_SPEED.SUCCESS:
      if (!_.isUndefined(action.payload.speed)) {
        return state.set('data', fromJS(_.reverse(action.payload.speed)));
      }
      return state.set('data', fromJS([]));
    case ActionTypes.GET_DATA_SPEED.FAILURE:
      return state.set('data', fromJS([]));
    case ActionTypes.GET_DATA_RPM.SUCCESS:
      if (!_.isUndefined(action.payload.rpm)) {
        return state.set('data', fromJS(_.reverse(action.payload.rpm)));
      }
      return state.set('data', fromJS([]));

    case ActionTypes.GET_DATA_RPM.FAILURE:
      return state.set('data', fromJS([]));

    case ActionTypes.GET_DATA_SPEED_FIVE.SUCCESS:
      if (!_.isUndefined(action.payload.speed)) {
        return state.set('data', fromJS(action.payload.speed));
      }
      return state.set('data', fromJS([]));

    case ActionTypes.GET_DATA_SPEED_FIVE.FAILURE:
      return state.set('data', fromJS([]));
    case ActionTypes.GET_DATA_RPM_FIVE.SUCCESS:
      if (!_.isUndefined(action.payload.rpm)) {
        return state.set('data', fromJS(action.payload.rpm));
      }
      return state.set('data', fromJS([]));
    case ActionTypes.CHANGE_DURATION: {
      const mergedState = state.merge({
        duration: action.payload,
      });
      return mergedState;
    }
    default:
      return state;
  }
}

export default timedataGraphReducer;
