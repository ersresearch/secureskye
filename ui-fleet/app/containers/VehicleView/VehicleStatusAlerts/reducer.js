/*
 *
 * VehicleStatusAlerts reducer
 *
 */

import { fromJS } from 'immutable';
import _reverse from 'lodash/reverse';
import _concat from 'lodash/concat';
import _dropRight from 'lodash/dropRight';
import { actionTypes, MAX_LENGTH_ALERT } from './constants';

export const initialState = fromJS({
  dataAlerts: [],
  dataStatus: [],
});

function vehicleStatusAlertsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_COMPONENT_ALERTS.SUCCESS: {
      let currentDataAlerts = _reverse(action.payload);
      if (currentDataAlerts.length > MAX_LENGTH_ALERT) {
        const number = currentDataAlerts.length - MAX_LENGTH_ALERT;
        currentDataAlerts = _dropRight(currentDataAlerts, number);
      }
      return state.set('dataAlerts', fromJS(currentDataAlerts));
    }
    case actionTypes.GET_COMPONENT_STATUS.SUCCESS: {
      return state.set('dataStatus', fromJS(action.payload));
    }
    case actionTypes.GET_COMPONENT_ALERTS_CURRENT.SUCCESS: {
      const dataAlerts = action.payload.data.filter(
        item => item.alerts.length > 0,
      );
      const currentDataStatus = state.get('dataStatus').toJS();
      let alerts = [];
      dataAlerts.forEach(itemAlert => {
        alerts = _concat(alerts, itemAlert.alerts);
        const indexItem = currentDataStatus.findIndex(
          item => item.componentName === itemAlert.componentName,
        );
        if (currentDataStatus[indexItem].status !== 'CRITICAL') {
          currentDataStatus[indexItem].status = itemAlert.status;
        }
      });
      let currentDataAlerts = _concat(alerts, state.get('dataAlerts').toJS());
      if (currentDataAlerts.length > MAX_LENGTH_ALERT) {
        const number = currentDataAlerts.length - MAX_LENGTH_ALERT;
        currentDataAlerts = _dropRight(currentDataAlerts, number);
      }
      return state.merge({
        dataAlerts: fromJS(currentDataAlerts),
        dataStatus: fromJS(currentDataStatus),
      });
    }
    default:
      return state;
  }
}

export default vehicleStatusAlertsReducer;
