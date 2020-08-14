/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:01:17 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 09:01:17 
 */
/*
 *
 * RiskLevelGaugeChart actions
 *
 */

import { actionTypes } from './constants';

export function riskCurrentReset() {
  return {
    type: actionTypes.RISK_CURRENT_RESET.REQUEST,
  };
}
