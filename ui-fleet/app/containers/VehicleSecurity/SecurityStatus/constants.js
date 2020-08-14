/*
 *
 * SecurityStatus constants
 *
 */

import { createAsyncTypes } from 'utils/actionUtils';

const PREFIX = 'SECURITY_STATUS_';

export const actionTypes = {
  GET_SECURITY_STATUS: createAsyncTypes(`${PREFIX}GET_SECURITY_STATUS`),
};
