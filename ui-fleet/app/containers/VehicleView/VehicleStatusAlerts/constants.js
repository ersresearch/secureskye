/*
 *
 * VehicleStatusAlerts constants
 *
 */

import { createAsyncTypes } from 'utils/actionUtils';

const PREFIX = 'VEHICLE_STATUS_ALERTS_';
export const MAX_LENGTH_ALERT = 20;

export const actionTypes = {
  GET_COMPONENT_ALERTS: createAsyncTypes(`${PREFIX}GET_COMPONENT_ALERTS`),
  GET_COMPONENT_STATUS: createAsyncTypes(`${PREFIX}GET_COMPONENT_STATUS`),
  GET_COMPONENT_ALERTS_CURRENT: createAsyncTypes(
    `${PREFIX}GET_COMPONENT_ALERTS_CURRENT`,
  ),
};
