/*
 *
 * Header actions
 *
 */
import ActionTypes from './constants';

export function changeTabHeader(tabIndex) {
  return {
    type: ActionTypes.CHANGE_TAB_HEADER,
    payload: tabIndex,
  };
}
export function changeTabMenu(tabIndex) {
  return {
    type: ActionTypes.CHANGE_TAB_MENU,
    payload: tabIndex,
  };
}
