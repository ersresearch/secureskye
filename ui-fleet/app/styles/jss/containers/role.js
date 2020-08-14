import { colorID, breakpoint, textStyle } from '../common';
const role = () => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    flex: '1',
    minHeight: 0,
  },
  panels: {
    width: '100%',
    height: '100%',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
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
  header: {
    backgroundColor: colorID.gray1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '92px',
    [breakpoint.large]: {
      height: '81px',
    },
    [breakpoint.medium]: {
      height: '61px',
    },
    [breakpoint.small]: {
      height: '61px',
    },
    '& > *': {
      margin: '0 15px',
      '&:first-child': {
        marginRight: 0,
      },
      '&:last-child': {
        marginLeft: 0,
      },
      [breakpoint.small]: {
        margin: '0 10px',
      },
      [breakpoint.medium]: {
        margin: '0 10px',
      },
      [breakpoint.large]: {
        margin: '0 13px',
      },
    },
  },
  button: {
    fontWeight: 'bold',
    borderRadius: '6px',
    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
    backgroundColor: '#d10010',
    color: colorID.white,
    outline: 'none',
    width: '96px',
    height: '48px',
    fontSize: '21px',
    [breakpoint.large]: {
      width: '84px',
      height: '42px',
      fontSize: '18px',
    },
    [breakpoint.medium]: {
      width: '64.32px',
      height: '32.16px',
      fontSize: '14px',
    },
    [breakpoint.small]: {
      width: '64.32px',
      height: '32.16px',
      fontSize: '14px',
    },
  },
  buttonRegister: {
    margin: 'auto',
    marginRight: '15px',
    '&:hover': { backgroundColor: colorID.red2 },
    '&:focus': {
      boxShadow: '0 0 0 4px #e5001254',
    },
  },
  buttonUpdate: {
    margin: 'auto',
    marginRight: '15px',
    '&:hover': { backgroundColor: colorID.red2 },
    '&:focus': {
      boxShadow: '0 0 0 4px #e5001254',
    },
  },
  buttonDelete: {
    '&:hover': { backgroundColor: colorID.red2 },
    '&:focus': {
      boxShadow: '0 0 0 4px #e5001254',
    },
  },
  text: {
    ...textStyle.text3,
    [breakpoint.large]: {
      fontSize: '18px',
    },
    [breakpoint.medium]: {
      fontSize: '14px',
    },
    [breakpoint.small]: {
      fontSize: '14px',
    },
  },
  checkboxRoot: {
    color: 'gray',
    '&$checked': {
      color: '#21a600',
    },
  },
  checked: {},
  ReactTable: {
    height: 'calc(100% - 140px)',
    [breakpoint.large]: {
      height: 'calc(100% - 123px)',
    },
    [breakpoint.medium]: {
      height: 'calc(100% - 94px)',
    },
    [breakpoint.small]: {
      height: 'calc(100% - 94px)',
    },
  },
  tooltipHover: {
    position: 'relative',
  },
  buttonHeader: {
    margin: 'auto',
    marginRight: 0,
  },
  cardContent: {
    minHeight: 0,
    flex: 1,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    '&:last-child': {
      paddingBottom: 0,
    },
    padding: '0',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: '1',
    cursor: 'pointer',
    position: 'absolute',
  },
  iconLoading: {
    height: '100%',
  },
});

export default role;
