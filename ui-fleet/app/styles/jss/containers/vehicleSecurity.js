import { breakpoint } from '../common';
export const vehicleSecurity = () => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    height: '100%',
    minHeight: '0',
  },
  carSecurity: {
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

export default vehicleSecurity;
