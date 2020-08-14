/*
 *
 * SecurityStatus actions
 *
 */

import { actionTypes } from './constants';

export function getSecurityStatus(vehicleId) {
  return {
    type: actionTypes.GET_SECURITY_STATUS.REQUEST,
    payload: {
      vehicleId,
    },
  };
}
