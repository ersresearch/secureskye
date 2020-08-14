/*
 * @Author: DanND1 
 * @Date: 2018-11-27 10:32:35 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-11-27 15:57:28
 */

import { ShowNotify } from 'utils/actionUtils';

export const Snackbars = (status, message) => {
  let type = '';
  if (status <= 100) {
    type = 'info';
  } else if (status <= 206) {
    type = 'success';
  } else if (status <= 304) {
    type = 'warning';
  } else {
    type = 'error';
  }
  return ShowNotify(type, message);
};
