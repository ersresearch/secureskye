/*
 *
 * Alert actions
 *
 */

import { CHANGE_ALERT_STATUS } from './constants';

export function changeAlertStatus(status) {
  return {
    type: CHANGE_ALERT_STATUS,
    payload: status,
  };
}
