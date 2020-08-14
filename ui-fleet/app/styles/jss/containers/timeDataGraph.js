import { colorID, textStyle, breakpoint } from 'styles/jss/common';
const timeDataGraph = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  cardContent: {
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: theme.palette.background.paper,
    '&:last-child': {
      padding: 0,
    },
  },
  filter: {
    display: 'flex',
    padding: '0 20px',
    justifyContent: 'space-between',
  },
  tabLabel: {
    ...textStyle.text4,
    color: 'unset',
  },
  tabSelected: {
    color: colorID.red1,
  },
  tabLabelContainer: {
    padding: '0',
  },
  tab: {
    minWidth: 'unset',
    fontWeight: 'inherit',
    minHeight: 'unset',
    margin: '20px 25px 8px',
    [breakpoint.small]: {
      margin: '10px 15px 4px',
    },
    [breakpoint.medium]: {
      margin: '10px 15px 4px',
    },
    [breakpoint.large]: {
      margin: '15px 20px 6px',
    },
  },
  typography: {
    padding: '20px',
    [breakpoint.small]: {
      padding: '10px',
    },
    [breakpoint.medium]: {
      padding: '10px',
    },
    [breakpoint.large]: {
      padding: '15px',
    },
  },
  formControl: {
    backgroundColor: colorID.white,
    borderRadius: '6px',
    width: '110px',
    height: '100%',
    marginTop: '10px',
    [breakpoint.small]: {
      width: '73px',
      marginTop: 0,
    },
    [breakpoint.medium]: {
      marginTop: 0,
    },
    [breakpoint.large]: {
      width: '110px',
    },
  },
});

export default timeDataGraph;
