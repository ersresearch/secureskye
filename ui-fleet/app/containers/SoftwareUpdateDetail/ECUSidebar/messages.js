/*
 * ECU Sidebar Messages
 *
 * This contains all the text for the ECUSidebar component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'app.containers.ECUSidebar.title',
    defaultMessage: 'ECU basic information',
  },
  ecuId: {
    id: 'app.containers.ECUSidebar.id',
    defaultMessage: 'ECU ID:',
  },
  ip: {
    id: 'app.containers.ECUSidebar.ip',
    defaultMessage: 'IP address:',
  },
  commProtocol: {
    id: 'app.containers.ECUSidebar.protocol',
    defaultMessage: 'Protocol:',
  },
  error: {
    id: 'app.containers.ECUSidebar.error',
    defaultMessage: 'Latest error:',
  },
  security: {
    id: 'app.containers.ECUSidebar.security',
    defaultMessage: 'Security',
  },
  empty: {
    id: 'app.containers.ECUSidebar.empty',
    defaultMessage: 'Unknown',
  },
});
