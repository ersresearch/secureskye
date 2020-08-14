/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:25:34 
 * @Last Modified by: DanND1
 * @Last Modified time: 2018-12-10 15:34:59
 */
import { colorID, textStyle, breakpoint } from 'styles/jss/common';
const alertsDashboard = () => ({
  grid: {
    position: 'relative',
    textAlign: 'center',
    width: '100%',
    margin: 0,
    height: '19%',
    display: 'flex',
    backgroundColor: colorID.gray1,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    minHeight: 0,
    flex: 1,
    position: 'relative',
    '&:last-child': {
      paddingBottom: 0,
    },
    padding: '0',
  },
  textvehicleId: {
    ...textStyle.info,
    borderBottom: '1px solid black',
  },
  textDescription: {
    ...textStyle.text4,
  },
  secondaryActionRoot: {
    top: '20%',
  },
  list: {
    '&::-webkit-scrollbar': {
      width: '10px',
    },
    '&::-moz-scrollbar': {
      width: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#BEBEBE',
      borderRadius: '10px',
    },
    '&::-moz-scrollbar-thumb': {
      backgroundColor: '#BEBEBE',
      borderRadius: '10px',
    },
    height: '310px',
    overflowY: 'auto',
    padding: 0,
    [breakpoint.small]: {
      height: '219px',
    },
    [breakpoint.medium]: {
      height: '219px',
    },
    [breakpoint.large]: {
      height: '275px',
    },
  },
  listItemContainer: {
    '&:hover': { backgroundColor: 'rgba(18, 88, 105, 0.1)' },
    backgroundColor: colorID.white,
    boxShadow: '0px 1px 2px rgba(0,0,0,0.16)',
  },
  date: {
    ...textStyle.day,
    fontStyle: 'italic',
    marginRight: '30px',
  },
  searchAlert: {
    width: '30%',
  },
  noteAlert: {
    position: 'absolute',
    right: '0px',
    marginTop: '10px',
    display: 'flex',
    paddingLeft: '40px',
    width: '400px',
    [breakpoint.small]: {
      width: '266px',
      right: '0px',
      marginTop: '7px',
      paddingLeft: '32px',
    },
    [breakpoint.medium]: {
      width: '266px',
      right: '0px',
      paddingLeft: '32px',
      marginTop: '7px',
    },
    [breakpoint.large]: {
      width: '350px',
      right: '0px',
      paddingLeft: '24px',
      marginTop: '9px',
    },
  },
  alertFocus: {
    '&:focus': {
      outline: 'none',
      borderBottom: '2px solid red',
    },
    marginRight: '16px',
    [breakpoint.small]: {
      marginRight: '10px',
    },
    [breakpoint.medium]: {
      marginRight: '10px',
    },
    [breakpoint.large]: {
      marginRight: '16px',
    },
  },
  alert: {
    '&:focus': {
      outline: 'none',
    },
    marginRight: '16px',
    [breakpoint.small]: {
      marginRight: '10px',
    },
    [breakpoint.medium]: {
      marginRight: '10px',
    },
    [breakpoint.large]: {
      marginRight: '16px',
    },
  },
  criticalFocus: {
    '&:focus': { outline: 'none', borderBottom: '2px solid red' },
    marginRight: '16px',
    [breakpoint.small]: {
      marginRight: '10px',
    },
    [breakpoint.medium]: {
      marginRight: '10px',
    },
    [breakpoint.large]: {
      marginRight: '16px',
    },
  },
  critical: {
    '&:focus': { outline: 'none' },
    marginRight: '16px',
    [breakpoint.small]: {
      marginRight: '10px',
    },
    [breakpoint.medium]: {
      marginRight: '10px',
    },
    [breakpoint.large]: {
      marginRight: '16px',
    },
  },
  informationFocus: {
    '&:focus': { outline: 'none', borderBottom: '2px solid red' },
    marginRight: '24px',
    [breakpoint.small]: {
      marginRight: '10px',
    },
    [breakpoint.medium]: {
      marginRight: '10px',
    },
    [breakpoint.large]: {
      marginRight: '16px',
    },
  },
  information: {
    '&:focus': { outline: 'none' },
    marginRight: '24px',
    [breakpoint.small]: {
      marginRight: '10px',
    },
    [breakpoint.medium]: {
      marginRight: '10px',
    },
    [breakpoint.large]: {
      marginRight: '16px',
    },
  },
  titleAlert: {
    textTransform: 'none',
    fontSize: '16px',
    fontFamily: 'Helvetica_Regular',
    marginLeft: '6px',
    [breakpoint.small]: {
      fontSize: '10px',
    },
    [breakpoint.medium]: {
      fontSize: '10px',
    },
    [breakpoint.large]: {
      fontSize: '14px',
    },
  },
  btnList: {
    textTransform: 'none',
    marginTop: '14px',
    marginLeft: '24px',
    width: '160px',
    height: '40px',
    borderRadius: '6px',
    ...textStyle.text6,
    fontSize: '14px',
    backgroundColor: colorID.white,
    boxShadow: '0px 2px 2px rgba(0,0,0,0.2)',
    [breakpoint.small]: {
      marginTop: '6px',
      marginLeft: '10px',
      width: '107px',
      height: '27px',
      fontSize: '11px',
    },
    [breakpoint.medium]: {
      marginTop: '6px',
      marginLeft: '10px',
      width: '107px',
      height: '27px',
      fontSize: '10px',
    },
    [breakpoint.large]: {
      marginTop: '14px',
      marginLeft: '14px',
      width: '140px',
      height: '35px',
      fontSize: '13px',
    },
  },
  messageList: {
    position: 'absolute',
    ...textStyle.info,
    top: '50%',
    left: '34%',
  },
  tabs: {
    width: '100%',
    height: '100%',
  },
  tab: {
    minWidth: '50px',
    minHeight: '20px',
    height: '50px',
    [breakpoint.small]: {
      height: '33px',
    },
    [breakpoint.medium]: {
      height: '33px',
    },
    [breakpoint.large]: {
      height: '43px',
    },
  },
  labelContainer: {
    padding: 0,
    width: '100px',
    [breakpoint.small]: {
      width: '63px',
    },
    [breakpoint.medium]: {
      width: '63px',
    },
    [breakpoint.large]: {
      width: '89px',
    },
  },
  btnNormal: {
    width: '115px',
    padding: 0,
    [breakpoint.small]: {
      width: '89px',
    },
    [breakpoint.medium]: {
      width: '89px',
    },
    [breakpoint.large]: {
      width: '104px',
    },
  },
  tabLabel: {
    fontSize: '16px',
    [breakpoint.small]: {
      fontSize: '10px',
    },
    [breakpoint.medium]: {
      fontSize: '10px',
    },
    [breakpoint.large]: {
      fontSize: '14px',
    },
  },
  btnIcon: {
    [breakpoint.small]: {
      width: '16px',
      height: '16px',
    },
    [breakpoint.medium]: {
      width: '16px',
      height: '16px',
    },
  },
});

export default alertsDashboard;
