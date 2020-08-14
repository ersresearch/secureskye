/*
 *
 * VehicleSidebar actions
 *
 */

import { actionTypes } from './constants';

export function changeTabIndex(index) {
  return {
    type: actionTypes.CHANGE_TAB_INDEX,
    index,
  };
}
