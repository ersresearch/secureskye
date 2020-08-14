import { breakpoint } from '../common';

const vehicleView = () => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    height: '100%',
    minHeight: '0',
  },
  vehicleView: {
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
  panelViewLeft: {
    width: '54%',
    height: '100%',
  },
  panelViewRight: {
    flex: 1,
    marginLeft: '30px',
    height: '100%',
    [breakpoint.small]: {
      marginLeft: '20px',
    },
    [breakpoint.medium]: {
      marginLeft: '20px',
    },
    [breakpoint.large]: {
      marginLeft: '26px',
    },
  },
  blankPaper: {
    height: '100%',
  },
  topPanels: {
    height: '45%',
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: 0,
  },
  bottomPanels: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: 5,
    marginTop: '30px',
    minHeight: 0,
    [breakpoint.small]: {
      marginTop: '20px',
    },
    [breakpoint.medium]: {
      marginTop: '20px',
    },
    [breakpoint.large]: {
      marginTop: '26px',
    },
  },
  carInfoChart: {
    marginTop: '15px',
    height: '95%',
    backgroundColor: 'transparent',
  },
  clear: {
    clear: 'both',
  },
});

export default vehicleView;
