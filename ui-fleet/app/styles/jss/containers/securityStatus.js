import { textStyle, breakpoint } from '../common';
const securityStatus = () => ({
  root: {
    display: 'flex',
    height: '96px',
    borderRadius: '0',
    backgroundColor: '#F2F2F2',
    opacity: '0.95',
    [breakpoint.small]: {
      height: '64px',
    },
    [breakpoint.medium]: {
      height: '64px',
    },
    [breakpoint.large]: {
      height: '84px',
    },
  },
  gridHeader: {
    margin: 'auto',
    padding: '0 30px',
    justifyContent: 'space-between',
    [breakpoint.small]: {
      padding: '0 20px',
    },
    [breakpoint.medium]: {
      padding: '0 20px',
    },
    [breakpoint.large]: {
      padding: '0 26px',
    },
  },
  gridHeaderItem: {
    borderRight: '1px solid',
    width: '27%',
    '&:first-child': {
      width: '23%',
      '& $panels': {
        padding: '0 20% 0 0',
      },
    },
    '&:last-child': {
      width: '23%',
      border: 'none',
      '& $panels': {
        paddingRight: '0',
      },
    },
  },
  panels: {
    display: 'flex',
    padding: '0 14%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    ...textStyle.text2,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: '23%',
    height: '100%',
  },
  cardContent: {
    flex: '1',
    overflow: 'auto',
    backgroundColor: '#F2F2F2',
    opacity: '0.95',
    padding: '0 30px',
    '&::-webkit-scrollbar': {
      width: '10px',
      height: '10px',
    },
    '&::-moz-scrollbar': {
      width: '10px',
      height: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#BEBEBE',
      borderRadius: '10px',
      marginRight: '6px',
    },
    '&::-moz-scrollbar-thumb': {
      backgroundColor: '#BEBEBE',
      borderRadius: '10px',
      marginRight: '6px',
    },
    [breakpoint.small]: {
      padding: '0 20px',
      '&::-webkit-scrollbar': {
        width: '7px',
        height: '7px',
      },
      '&::-moz-scrollbar': {
        width: '7px',
        height: '7px',
      },
    },
    [breakpoint.medium]: {
      padding: '0 20px',
      '&::-webkit-scrollbar': {
        width: '7px',
        height: '7px',
      },
      '&::-moz-scrollbar': {
        width: '7px',
        height: '7px',
      },
    },
    [breakpoint.large]: {
      padding: '0 26px',
      '&::-webkit-scrollbar': {
        width: '9px',
        height: '9px',
      },
      '&::-moz-scrollbar': {
        width: '9px',
        height: '9px',
      },
    },
  },
  gridContent: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: '30px',
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
  item: {
    paddingTop: '13px',
    paddingBottom: '16px',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    [breakpoint.small]: {
      paddingTop: '9px',
      paddingBottom: '11px',
    },
    [breakpoint.medium]: {
      paddingTop: '9px',
      paddingBottom: '11px',
    },
    [breakpoint.large]: {
      paddingTop: '11px',
      paddingBottom: '14px',
    },
  },
  headerDisable: {
    background: '#D7D6D5',
    borderBottom: '2px solid #ABACAC',
    '& span': {
      color: '#8b8c8c',
    },
  },
  buttonDisable: {
    border: '1px solid #8b8c8c',
    color: '#8b8c8c',
  },
});

export default securityStatus;
