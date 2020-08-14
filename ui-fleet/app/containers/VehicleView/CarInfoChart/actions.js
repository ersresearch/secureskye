/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:21:29 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 09:21:29 
 */
/*
 *
 * CarInfoChart actions
 *
 */

import { actionTypes } from './constants';

export function carInfoReset() {
  return {
    type: actionTypes.CAR_INFO_RESET.REQUEST,
  };
}
