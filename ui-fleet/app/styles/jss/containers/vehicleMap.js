import { colorID, textStyle, breakpoint } from 'styles/jss/common';

const vehicleMap = () => ({
  nav: {
    opacity: '0.9',
    borderRadius: '0 8px 8px 0',
    top: '0',
    right: '6px',
    width: '100%',
    position: 'absolute',
    maxHeight: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: colorID.gray1,
    paddingTop: '0',
  },
  root: {
    paddingTop: '15px',
    paddingLeft: '18px',
    paddingRight: '18px',
    paddingBottom: '20px',
  },
  divider: {
    marginLeft: '18px',
    marginRight: '18px',
  },
  dateAndTime: {
    fontSize: '14px',
    color: colorID.gray4,
    fontStyle: 'italic',
    fontFamily: textStyle.text1.fontFamily,
    [breakpoint.small]: {
      fontSize: '10px',
    },
    [breakpoint.medium]: {
      fontSize: '10px',
    },
    [breakpoint.large]: {
      fontSize: '12px',
    },
  },
  address: {
    marginTop: '12px',
    fontSize: '15px',
    color: colorID.black,
    fontFamily: textStyle.text1.fontFamily,
    [breakpoint.small]: {
      fontSize: '10px',
    },
    [breakpoint.medium]: {
      fontSize: '10px',
    },
    [breakpoint.large]: {
      fontSize: '12px',
    },
  },
  button: {
    minHeight: 0,
    top: 0,
    position: 'absolute',
    left: 0,
    width: '40px',
    height: '40px',
    [breakpoint.small]: {
      width: '26px',
      height: '26px',
    },
    [breakpoint.medium]: {
      width: '26px',
      height: '26px',
    },
    [breakpoint.large]: {
      width: '35px',
      height: '35px',
    },
  },
  buttonIcon: {
    width: '24px',
    height: '24px',
    [breakpoint.small]: {
      width: '16px',
      height: '16px',
    },
    [breakpoint.medium]: {
      width: '16px',
      height: '16px',
    },
    [breakpoint.large]: {
      width: '21px',
      height: '21px',
    },
  },
  buttonAfter: {
    top: '0px',
    position: 'absolute',
    right: '0px',
  },
});

export default vehicleMap;
