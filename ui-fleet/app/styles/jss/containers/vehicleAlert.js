/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 09:01:23 
 * @Last Modified by: DanND1
 * @Last Modified time: 2018-12-10 15:00:08
 */
import { breakpoint } from '../common';
const vehicleAlert = () => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    height: '100%',
    minHeight: '0',
  },
  vehicleAlert: {
    display: 'flex',
    width: '78%',
    height: '100%',
    flexDirection: 'column',
  },
  panels: {
    height: '95%',
    width: '100%',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    [breakpoint.small]: {
      padding: '20px',
    },
    [breakpoint.medium]: {
      padding: '20px',
    },
    [breakpoint.large]: {
      padding: '26px',
    },
  },
  sensorVisualization: {
    width: '100%',
    height: '40%',
    display: 'flex',
  },
  sensorAlerts: {
    width: '100%',
    height: '60%',
  },
});

export default vehicleAlert;
