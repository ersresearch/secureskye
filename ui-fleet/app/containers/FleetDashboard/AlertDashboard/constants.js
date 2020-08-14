/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 08:59:57 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 08:59:57 
 */
/*
 *
 * AlertDashboard constants
 *
 */

import { createAsyncTypes } from 'utils/actionUtils';
const PREFIX = 'AlertDashboard_';

export const actionTypes = {
  GET_ALERT_DASHBOARD: createAsyncTypes(`${PREFIX}GET_ALERT_DASHBOARD`),
  GET_ALERT_SOCKET: createAsyncTypes(`${PREFIX}GET_ALERT_SOCKET`),
  GET_ALERT_DATA: createAsyncTypes(`${PREFIX}GET_FILTER_DATA`),
  GET_CRITICAL_DATA: createAsyncTypes(`${PREFIX}GET_CRITICAL_DATA`),
  GET_INFORMATION_DATA: createAsyncTypes(`${PREFIX}GET_INFORMATION_DATA`),
  HANDLE_CHANGE_BUTTON_ALERT: `${PREFIX}HANDLE_CHANGE_BUTTON_ALERT`,
  GET_CLICK_BUTTON: `${PREFIX}GET_CLICK_BUTTON`,
};
