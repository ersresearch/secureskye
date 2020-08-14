import { colorID, breakpoint } from 'styles/jss/common';

const fleetDashboard = () => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  panels: {
    width: '100%',
    height: '100%',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    [breakpoint.large]: {
      padding: '26px',
    },
    [breakpoint.medium]: {
      padding: '20px',
    },
    [breakpoint.small]: {
      padding: '20px',
    },
  },
  topPanels: {
    height: '52%',
    display: 'flex',
  },
  panelsMap: {
    width: '65%',
  },
  bottomPanels: {
    flex: 1,
    backgroundColor: colorID.gray1,
    borderRadius: 8,
    marginTop: '30px',
    width: '100%',
    minHeight: 0,
    [breakpoint.large]: {
      marginTop: '26px',
    },
    [breakpoint.medium]: {
      marginTop: '20px',
    },
    [breakpoint.small]: {
      marginTop: '20px',
    },
  },
  mapPanel: {
    backgroundColor: 'white',
    height: '435px',
    marginRight: '15px',
  },
  alertPanel: {
    flex: 1,
    borderRadius: 8,
    height: '100%',
    marginLeft: '30px',
    [breakpoint.large]: {
      marginLeft: '26px',
    },
    [breakpoint.medium]: {
      marginLeft: '20px',
    },
    [breakpoint.small]: {
      marginLeft: '20px',
    },
  },
  container: {
    padding: '30px 5px 0',
    [breakpoint.large]: {
      padding: '26px 4px 0',
    },
    [breakpoint.medium]: {
      padding: '20px 4px 0',
    },
    [breakpoint.small]: {
      padding: '20px 3px 0',
    },
  },
  spacing: {
    padding: '0 25px',
    [breakpoint.large]: {
      padding: '0 22px',
    },
    [breakpoint.medium]: {
      padding: '0 22px',
    },
    [breakpoint.small]: {
      padding: '0 17px',
    },
  },
});

export default fleetDashboard;
