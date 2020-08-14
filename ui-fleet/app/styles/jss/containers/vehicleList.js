import { textStyle, colorID, breakpoint } from '../common';

const vehicleList = () => ({
  card: {
    borderRadius: '10px',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    '&:last-child': {
      paddingBottom: 0,
    },
    padding: '0',
    minHeight: '0',
    backgroundColor: '#F1F1F1',
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
  },
  filter: {
    height: '85px',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: colorID.gray1,
    [breakpoint.small]: {
      height: '48px',
    },
    [breakpoint.medium]: {
      height: '48px',
    },
    [breakpoint.large]: {
      height: '64px',
    },
  },
  tab: {
    textTransform: 'capitalize',
    minWidth: 'unset',
    fontWeight: 'inherit',
    minHeight: 'unset',
    margin: '30px 25px 8px',
    [breakpoint.small]: {
      margin: '20px 15px 4px',
    },
    [breakpoint.medium]: {
      margin: '20px 15px 4px',
    },
    [breakpoint.large]: {
      margin: '25px 20px 6px',
    },
  },
  tabs: {
    marginLeft: '5px',
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
  searchVehicle: {
    marginTop: '20px',
    marginRight: '20px',
    width: '300px',
    [breakpoint.small]: {
      width: '200px',
      marginTop: '13px',
      marginRight: '13px',
    },
    [breakpoint.medium]: {
      width: '200px',
      marginTop: '13px',
      marginRight: '13px',
    },
    [breakpoint.large]: {
      width: '262px',
      marginTop: '17px',
      marginRight: '17px',
    },
  },
  inputRoot: {
    ...textStyle.text6,
    border: '1px solid #ced4da',
    borderRadius: '.25rem',
    background: '#FFFFFF',
    padding: '5px 20px 5px 24px',
  },
  listIconRoot: {
    fontSize: '35px',
    marginRight: '10px',
  },
  textDisconnected: {
    ...textStyle.text3,
    color: colorID.red1,
  },
  text: {
    ...textStyle.text3,
  },
  connectionIcon: {
    [breakpoint.small]: {
      width: '22px',
    },
    [breakpoint.medium]: {
      width: '22px',
    },
    [breakpoint.large]: {
      width: '29px',
    },
  },
  alertIcon: {
    width: '35px',
    height: '35px',
    [breakpoint.small]: {
      width: '24px',
      height: '24px',
    },
    [breakpoint.medium]: {
      width: '24px',
      height: '24px',
    },
    [breakpoint.large]: {
      width: '31px',
      height: '31px',
    },
  },
  searchIcon: {
    '&:hover': {
      cursor: 'pointer',
    },
    [breakpoint.small]: {
      width: '16px',
    },
    [breakpoint.medium]: {
      width: '16px',
    },
    [breakpoint.large]: {
      width: '21px',
    },
  },
  detailButton: {
    width: '80%',
    height: '45px',
    padding: '1px',
    minHeight: '0px',
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: colorID.red2,
    '&:hover': {
      backgroundColor: colorID.red2,
    },
    '&:focus': {
      boxShadow: '0 0 0 4px #e5001254',
    },
    ...textStyle.text5,
    textTransform: 'inherit',
    color: 'white',
    [breakpoint.small]: {
      height: '30px',
      fontSize: '12px',
    },
    [breakpoint.medium]: {
      height: '30px',
      fontSize: '12px',
    },
    [breakpoint.large]: {
      height: '39px',
      fontSize: '15px',
    },
  },
  alertCount: {
    ...textStyle.text3,
    margin: 'auto 0',
    paddingLeft: '5px',
  },
});

export default vehicleList;
