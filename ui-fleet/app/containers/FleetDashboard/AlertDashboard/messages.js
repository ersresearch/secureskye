/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:00:27 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 09:00:27 
 */
/*
 * AlertDashboard Messages
 *
 * This contains all the text for the AlertDashboard component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'app.containers.FleetDashboard.AlertDashboard.title',
    defaultMessage: 'Alerts',
  },
  btnTitle: {
    id: 'app.containers.FleetDashboard.AlertDashboard.btnTitle',
    defaultMessage: 'Total',
  },
  alert: {
    id: 'app.containers.FleetDashboard.AlertDashboard.alert',
    defaultMessage: 'Warning',
  },
  critical: {
    id: 'app.containers.FleetDashboard.AlertDashboard.critical',
    defaultMessage: 'Critical',
  },
  information: {
    id: 'app.containers.FleetDashboard.AlertDashboard.information',
    defaultMessage: 'Information',
  },
  messageListStatus: {
    id: 'app.containers.FleetDashboard.AlertDashboard.messageListStatus',
    defaultMessage: 'No history data for alerts',
  },
});
