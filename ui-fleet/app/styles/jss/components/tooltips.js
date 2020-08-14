import { breakpoint, textStyle } from '../common';
const tooltips = () => ({
  tooltipHover: {
    display: 'flex',
  },
  headerIcon: {
    marginRight: '5px',
    [breakpoint.small]: {
      width: '25px',
      height: '25px',
    },
    [breakpoint.medium]: {
      width: '25px',
      height: '25px',
    },
    [breakpoint.large]: {
      width: '40px',
      height: '40px',
    },
  },
  tooltipContent: {
    position: 'absolute',
    width: 'auto',
    backgroundColor: 'white',
    textAlign: 'center',
    borderRadius: '6px',
    zIndex: 2,
    marginLeft: '60px',
    marginTop: '-9px',
    boxShadow: '1px 2px 2px 1px rgba(0,0,0,0.16)',
    [breakpoint.small]: {
      marginLeft: '50px',
      marginTop: '-1px',
    },
    [breakpoint.medium]: {
      marginLeft: '50px',
      marginTop: '-1px',
    },
    [breakpoint.large]: {
      marginLeft: '60px',
      marginTop: '-5px',
    },
  },
  item: {
    display: 'flex',
    padding: '5px 13px',
    borderBottom: '1px solid #8080801a',
    [breakpoint.small]: {
      padding: '5px 9px',
    },
    [breakpoint.medium]: {
      padding: '5px 9px',
    },
    [breakpoint.large]: {
      padding: '5px 10px',
    },
  },
  contentIcon: {
    marginRight: '12px',
    width: '40px',
    height: '40px',
    [breakpoint.small]: {
      width: '25px',
      height: '25px',
      marginRight: '8px',
    },
    [breakpoint.medium]: {
      width: '25px',
      height: '25px',
      marginRight: '8px',
    },
    [breakpoint.large]: {
      width: '35px',
      height: '35px',
      marginRight: '9px',
    },
  },
  textUpdate: {
    ...textStyle.text4,
    fontSize: '16px',
    marginTop: '7px',
    [breakpoint.small]: {
      fontSize: '12px',
      marginTop: '3px',
    },
    [breakpoint.medium]: {
      fontSize: '12px',
      marginTop: '3px',
    },
    [breakpoint.large]: {
      fontSize: '14px',
      marginTop: '7px',
    },
  },
  text: {
    ...textStyle.text4,
    fontSize: '16px',
    [breakpoint.small]: {
      fontSize: '13px',
    },
    [breakpoint.medium]: {
      fontSize: '13px',
    },
    [breakpoint.large]: {
      fontSize: '14px',
    },
  },
});

export default tooltips;
