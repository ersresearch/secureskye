/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:01:21 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 09:01:21 
 */
/*
 *
 * RiskLevelGaugeChart constants
 *
 */
import { createAsyncTypes } from 'utils/actionUtils';
const PREFIX = 'RiskLevel_';

const MAX_VALUE_RISK = '7';
const MIN_VALUE_RISK = '1';
const RISK_VALUE_MESSAGE = 'Invalid risk value';

const actionTypes = {
  GET_DATA_CURRENT: createAsyncTypes(`${PREFIX}GET_DATA_CURRENT`),
  RISK_CURRENT_RESET: createAsyncTypes(`${PREFIX}RISK_CURRENT_RESET`),
};

export { actionTypes, MAX_VALUE_RISK, MIN_VALUE_RISK, RISK_VALUE_MESSAGE };
