import { colorID, breakpoint } from 'styles/jss/common';

const anomaliesChart = () => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative',
  },
  chart: {
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
  formControl: {
    position: 'absolute',
    right: '30px',
    [breakpoint.small]: {
      right: '20px',
    },
    [breakpoint.medium]: {
      right: '26',
    },
    [breakpoint.large]: {
      right: '30px',
    },
    backgroundColor: colorID.white,
    zIndex: 3,
  },
  selectEmpty: {
    marginTop: '0',
  },
  backgroundChart: {
    position: 'absolute',
    width: 'calc(100% - 73px)',
    [breakpoint.medium]: {
      height: 'calc(100% - 91px)',
      width: 'calc(100% - 73px)',
      bottom: '49px',
      left: '42px',
    },
    [breakpoint.small]: {
      height: 'calc(100% - 91px)',
      bottom: '49px',
      left: '42px',
    },
    zIndex: 1,
    height: 'calc(100% - 90px)',
    backgroundColor: '#ffffff',
    bottom: '48px',
    left: '43px',
  },
  select: {
    paddingLeft: '15px',
    [breakpoint.medium]: {
      paddingLeft: '13px',
    },
    [breakpoint.small]: {
      paddingLeft: '10px',
    },
  },
  rootSelect: {
    borderRadius: '6px',
  },
  line: {
    position: 'absolute',
    width: 'calc(100% - 73px)',
    left: '43px',
    top: '40px',
    height: '1px',
    zIndex: 1,
    backgroundColor: colorID.gray4,
  },
});

export default anomaliesChart;
