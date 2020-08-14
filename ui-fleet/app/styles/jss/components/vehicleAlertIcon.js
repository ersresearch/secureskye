import { textStyle, breakpoint } from '../common';

const vehicleAlertIcon = {
  bgAlert: {
    position: 'relative',
    backgroundColor: '#D9D8AE',
    border: 'solid 1px #CEC584',
    borderRadius: '5px',
  },
  bgCritical: {
    position: 'relative',
    backgroundColor: '#E0C3C3',
    border: 'solid 1px #DEA0A0',
    borderRadius: '5px',
  },
  bgNormal: {
    position: 'relative',
    height: '100%',
  },
  iconAlert: {
    position: 'absolute',
    top: '8.52%',
    left: '4.8%',
    [breakpoint.small]: {
      width: '22.67px',
    },
    [breakpoint.medium]: {
      width: '22.67px',
    },
    [breakpoint.large]: {
      width: '29.75',
    },
  },
  iconEcu: {
    paddingTop: '8px',
    width: '80px',
    height: '54px',
    [breakpoint.small]: {
      paddingTop: '5.33px',
      width: '53.33px',
      height: '36px',
    },
    [breakpoint.medium]: {
      paddingTop: '5.33px',
      width: '53.33px',
      height: '36px',
    },
    [breakpoint.large]: {
      paddingTop: '7px',
      width: '70px',
      height: '47.25px',
    },
  },
  textStyle: {
    ...textStyle.text4,
    opacity: '0.3',
    paddingBottom: '8px',
  },
  text: {
    [breakpoint.small]: {
      paddingBottom: '5.33px',
    },
    [breakpoint.medium]: {
      paddingBottom: '5.33px',
    },
    [breakpoint.large]: {
      paddingBottom: '7px',
    },
  },
  textAlert: {
    color: '#6F5600',
    opacity: '1',
  },
  textCritical: {
    color: '#96000C',
    opacity: '1',
  },
};

export default vehicleAlertIcon;
