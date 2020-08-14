/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 09:00:29 
 * @Last Modified by: DanND1
 * @Last Modified time: 2018-12-10 13:55:23
 */
import { breakpoint } from 'styles/jss/common';
const vehicleSWUpdate = () => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    height: '100%',
    minHeight: '0',
  },
  SWManagement: {
    display: 'flex',
    width: '78%',
    height: '100%',
    flexDirection: 'column',
  },
  panels: {
    height: '95%',
    width: '100%',
    padding: '30px',
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
});

export default vehicleSWUpdate;
