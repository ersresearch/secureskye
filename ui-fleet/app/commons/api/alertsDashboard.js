/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 08:49:29 
 * @Last Modified by: LoiDT2
 * @Last Modified time: 2018-11-13 08:50:05
 */
import { ApiNoderedUrl } from '../constants';

const alertsDashboadApi = {
  alertsDashboad: `${ApiNoderedUrl}/api/allMarkers`,
  notificationFilter: `${ApiNoderedUrl}/api/getNotificationFilter/:`,
};

export default alertsDashboadApi;
