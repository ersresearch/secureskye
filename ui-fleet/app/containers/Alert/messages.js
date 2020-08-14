/*
 * Alert Messages
 *
 * This contains all the text for the Alert component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.containers.Alert.header',
    defaultMessage: 'This is Alert container !',
  },
  alertDialogTitle: {
    id: 'app.containers.Alert.alertDialogTitle',
    defaultMessage: 'No Car Selected',
  },
  alertDialogDescription: {
    id: 'app.containers.Alert.alertDialogDescription',
    defaultMessage: 'Please select a car for specific detail',
  },
});
