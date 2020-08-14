/*
 *
 * Alert constants
 *
 */

import { createAsyncTypes } from 'utils/actionUtils';
const PREFIX = 'Alert_';
const CHANGE_ALERT_STATUS = createAsyncTypes(`${PREFIX}CHANGE_ALERT_STATUS`);

export { CHANGE_ALERT_STATUS };
