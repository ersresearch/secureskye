/*
 *
 * VehicleStatusAlerts actions
 *
 */

import { actionTypes } from './constants';

export const getComponentStatusAlerts = vehicleId => dispatch => {
  dispatch(getComponentAlerts(vehicleId));
  dispatch(getComponentStatus(vehicleId));
};

export const getComponentAlerts = vehicleId => ({
  type: actionTypes.GET_COMPONENT_ALERTS.REQUEST,
  payload: {
    vehicleId,
  },
});

export const getComponentStatus = vehicleId => ({
  type: actionTypes.GET_COMPONENT_STATUS.REQUEST,
  payload: {
    vehicleId,
  },
});

export const getComponentAlertsCurrent = data => ({
  type: actionTypes.GET_COMPONENT_ALERTS_CURRENT.SUCCESS,
  payload: {
    data,
  },
});
