/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:18:12 
 * @Last Modified by: LoiDT2
 * @Last Modified time: 2018-12-03 17:23:38
 */
/*
 *
 * VehicleMenu actions
 *
 */
import { routerActions } from 'react-router-redux';
import { DEFAULT_ACTION, GET_DATA_MENUTREE } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getDataMenu(data) {
  let dataMenu = [];
  if (data !== undefined) {
    dataMenu = data;
  }
  return {
    type: GET_DATA_MENUTREE,
    dataMenu,
  };
}
export const goToSoftwareUpdateDetail = () => async dispatch => {
  await dispatch(routerActions.push(`/fleet-ui/ecu-software-update-detail`));
};
