import { colorID, breakpoint, textStyle } from '../common';

const header = theme => ({
  root: {
    width: '100%',
    borderBottom: `4px solid ${colorID.red1}`,
    [breakpoint.small]: {
      borderBottom: `2px solid ${colorID.red1}`,
    },
    [breakpoint.medium]: {
      borderBottom: `2px solid ${colorID.red1}`,
      width: '100%',
    },
    [breakpoint.large]: {
      borderBottom: `3px solid ${colorID.red1}`,
      width: '100%',
    },
  },
  AppBar: {
    paddingLeft: '48px',
    paddingRight: '52px',
    minHeight: 'unset',
    height: '75px',
    width: '100%',
    margin: 'auto',
    [breakpoint.small]: {
      paddingLeft: '32px',
      paddingRight: '35px',
      height: '50px',
    },
    [breakpoint.medium]: {
      paddingLeft: '32px',
      paddingRight: '35px',
      height: '50px',
    },
    [breakpoint.large]: {
      paddingLeft: '42px',
      paddingRight: '45px',
      height: '65px',
    },
  },
  logo: {
    padding: 0,
    minWidth: 'unset',
  },
  label: {
    ...textStyle.title3,
    textTransform: 'capitalize',
  },
  iconUser: {
    marginRight: theme.spacing.unit,
    width: '20px',
    height: '20px',
  },
  buttonUser: {
    ...textStyle.info,
    color: colorID.white,
    textTransform: 'capitalize',
    padding: 0,
  },
  tabs: {
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    display: 'flex',
  },
  flexContainer: {
    alignSelf: 'flex-end',
  },
  tab: {
    backgroundColor: '#575757',
    clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)',
    width: '280px',
    height: '50px',
    minHeight: 'unset',
    maxWidth: '280px',
    [breakpoint.small]: {
      width: '187px',
      height: '33px',
    },
    [breakpoint.medium]: {
      width: '187px',
      height: '33px',
    },
    [breakpoint.large]: {
      width: '245px',
      height: '44px',
    },
  },
  tabsIndicator: {
    backgroundColor: 'transparent',
  },
  tabSelected: {
    backgroundColor: colorID.red1,
  },
  userGroup: {
    display: 'flex',
    width: '400px',
    justifyContent: 'space-between',
    [breakpoint.small]: {
      width: '300px',
    },
    [breakpoint.medium]: {
      width: '300px',
    },
    [breakpoint.large]: {
      width: '350px',
    },
  },
  dropdown: {
    position: 'relative',
    display: 'inline-block',
    '&:hover $dropdownContent': {
      display: 'block',
    },
  },
  dropdownContent: {
    display: 'none',
    position: 'absolute',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
    zIndex: 1,
    minWidth: '120px',
    textAlign: 'center',
    borderRadius: '5px',
    [breakpoint.small]: {
      minWidth: '80px',
    },
    [breakpoint.medium]: {
      minWidth: '80px',
    },
    [breakpoint.large]: {
      minWidth: '105px',
    },
  },
  dropdownItem: {
    ...textStyle.info,
    width: '100%',
  },
});

export default header;
