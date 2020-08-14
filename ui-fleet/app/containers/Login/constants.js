/*
 *
 * VehicleStatusAlerts constants
 *
 */

import { createAsyncTypes } from 'utils/actionUtils';

const PREFIX = 'LOGIN_';

export const actionTypes = {
  LOGIN: createAsyncTypes(`${PREFIX}LOGIN`),
  LOG_OUT: `${PREFIX}LOG_OUT`,
  GET_USER_PROFILE: createAsyncTypes(`${PREFIX}GET_USER_PROFILE`),
};
