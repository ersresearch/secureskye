import { textStyle, colorID, breakpoint } from '../common';

const vehicleStatusAlerts = () => ({
  gridContainer: {
    textAlign: 'center',
    width: '100%',
    margin: 0,
    padding: '10px',
    [breakpoint.small]: {
      padding: '6.67px',
    },
    [breakpoint.medium]: {
      padding: '6.67px',
    },
    [breakpoint.large]: {
      padding: '8.75px',
    },
  },
  gridItem: {
    padding: '4px',
    [breakpoint.small]: {
      padding: '2.67px',
    },
    [breakpoint.medium]: {
      padding: '2.67px',
    },
    [breakpoint.large]: {
      padding: '3.5px',
    },
  },
  card: {
    height: '100%',
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
  },
  cardContent: {
    flex: 1,
    '&:last-child': {
      paddingBottom: 0,
    },
    minHeight: '0',
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
  },
  textRoot: {
    padding: 0,
  },
  textPrimary: {
    ...textStyle.title4,
    wordWrap: 'break-word',
  },
  textSecondary: {
    wordWrap: 'break-word',
    fontSize: '18px',
    fontFamily: 'Helvetica_Light',
    color: colorID.black,
    [breakpoint.small]: {
      fontSize: '12px',
    },
    [breakpoint.medium]: {
      fontSize: '12px',
    },
    [breakpoint.large]: {
      fontSize: '15.75px',
    },
  },
  secondaryActionRoot: {
    top: '20px',
    right: '24px',
    [breakpoint.small]: {
      top: '13.33px',
      right: '16px',
    },
    [breakpoint.medium]: {
      top: '13.33px',
      right: '16px',
    },
    [breakpoint.large]: {
      top: '17.5px',
      right: '21px',
    },
  },
  textDate: {
    ...textStyle.day,
  },
  list: {
    '&::-webkit-scrollbar': {
      width: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#BEBEBE',
      borderRadius: '10px',
    },
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    flex: 1,
  },
  listItemContainer: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#FFFFFF',
    },
  },
  listItemGutters: {
    padding: '20px 24px 16px 24px',
    [breakpoint.small]: {
      padding: '13.33px 16px 10.67px 13.33px',
    },
    [breakpoint.medium]: {
      padding: '13.33px 16px 10.67px 13.33px',
    },
    [breakpoint.large]: {
      padding: '17.5px 21px 14px 17.5px',
    },
  },
  itemIcon: {
    [breakpoint.small]: {
      width: '24px',
    },
    [breakpoint.medium]: {
      width: '24px',
    },
    [breakpoint.large]: {
      width: '31.5px',
    },
  },
  listNoData: {
    ...textStyle.text1,
    margin: 'auto',
  },
});

export default vehicleStatusAlerts;
