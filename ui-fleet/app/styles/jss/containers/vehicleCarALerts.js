/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 09:34:29 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-19 15:32:38
 */
import { colorID, textStyle, breakpoint } from 'styles/jss/common';

const vehicleCarALerts = () => ({
  carAlerts: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  carAlertsHeader: {
    width: '100%',
    height: '50px',
    display: 'flex',
    justifyContent: 'space-between',
    [breakpoint.large]: {
      height: '44px',
    },
    [breakpoint.medium]: {
      height: '33px',
    },
    [breakpoint.small]: {
      height: '33px',
    },
  },
  headerLeft: {
    margin: 'auto 0',
  },
  headerRight: {
    position: 'relative',
    margin: 'auto 0',
    width: '270px',
    [breakpoint.large]: {
      width: '240px',
    },
    [breakpoint.medium]: {
      width: '215px',
    },
    [breakpoint.small]: {
      width: '215px',
    },
  },
  textHeaderButton: {
    color: 'white',
    fontSize: '15px',
    marginLeft: '10px',
    [breakpoint.large]: {
      marginLeft: '8px',
      fontSize: '14px',
    },
    [breakpoint.medium]: {
      marginLeft: '7px',
      fontSize: '11px',
    },
    [breakpoint.small]: {
      marginLeft: '7px',
      fontSize: '11px',
    },
  },
  textHeaderButtonFocus: {
    color: colorID.red1,
    fontSize: '16px',
    marginLeft: '10px',
    [breakpoint.large]: {
      marginLeft: '8px',
      fontSize: '14px',
    },
    [breakpoint.medium]: {
      marginLeft: '7px',
      fontSize: '11px',
    },
    [breakpoint.small]: {
      marginLeft: '7px',
      fontSize: '11px',
    },
  },
  headerButton: {
    marginRight: '10px',
    [breakpoint.large]: {
      marginRight: '8px',
    },
    [breakpoint.medium]: {
      marginRight: '7px',
    },
    [breakpoint.small]: {
      marginRight: '7px',
    },
  },
  button: {
    outline: 'none',
  },
  card: {
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
  },
  cardContent: {
    flex: 1,
    padding: 0,
    display: 'flex',
    '&:last-child': {
      padding: 0,
    },
  },
  alertList: {
    width: '35%',
    height: '100%',
    paddingBottom: '10px',
  },
  buttonShow: {
    width: '205px',
    [breakpoint.large]: {
      width: '143px',
    },
    [breakpoint.medium]: {
      width: '120px',
    },
    [breakpoint.small]: {
      width: '120px',
    },
  },
  btnShowAll: {
    textTransform: 'inherit',
    marginTop: '10px',
    marginLeft: '22px',
    minWidth: '75px',
    minHeight: '29px',
    border: '1px solid rgba(0,0,0,0.3)',
    width: '115px',
    height: '39px',
    fontSize: '16px',
    [breakpoint.large]: {
      marginTop: '5px',
      marginLeft: '13px',
      fontSize: '14px',
      width: '110px',
      height: '38px',
    },
    [breakpoint.medium]: {
      marginTop: '3px',
      marginLeft: '10px',
      fontSize: '10px',
      width: '91px',
      height: '33px',
    },
    [breakpoint.small]: {
      marginTop: '3px',
      marginLeft: '5px',
      fontSize: '10px',
    },
  },
  ShowAllIncon: {
    [breakpoint.large]: {
      width: '14px',
      marginRight: '3px',
    },
    [breakpoint.medium]: {
      width: '12px',
      marginRight: '3px',
    },
    [breakpoint.small]: {
      width: '12px',
      marginRight: '3px',
    },
  },
  buttonAlert: {
    width: '322px',
    [breakpoint.large]: {
      width: '315px',
    },
    [breakpoint.medium]: {
      width: '210px',
    },
    [breakpoint.small]: {
      width: '210px',
    },
  },
  tabs: {
    width: '100%',
    height: '100%',
  },
  tabLabelContainer: {
    padding: '0',
    height: '100%',
    width: '90px',
    [breakpoint.large]: {
      width: '89px',
    },
    [breakpoint.medium]: {
      width: '60px',
    },
    [breakpoint.small]: {
      width: '60px',
    },
  },
  btnNormal: {
    width: '130px',
    [breakpoint.large]: {
      width: '120px',
    },
    [breakpoint.medium]: {
      width: '89px',
    },
    [breakpoint.small]: {
      width: '89px',
    },
  },
  tabLabel: {
    fontSize: '16px',
    [breakpoint.large]: {
      fontSize: '14px',
    },
    [breakpoint.medium]: {
      fontSize: '10px',
    },
    [breakpoint.small]: {
      fontSize: '10px',
    },
  },
  btnAlert: {
    textTransform: 'capitalize',
    minWidth: 'unset',
    minHeight: 'unset',
    padding: 0,
    height: '60px',
    '&:focus': {
      outline: 'none',
    },
    ...textStyle.info,
    [breakpoint.large]: {
      paddingTop: '5px',
      height: '50px',
    },
    [breakpoint.medium]: {
      paddingTop: '0px',
      height: '39px',
    },
    [breakpoint.small]: {
      paddingTop: '0px',
      height: '39px',
    },
  },
  btnAlertFocus: {
    textTransform: 'capitalize',
    minWidth: 'unset',
    minHeight: 'unset',
    '&:focus': {
      outline: 'none',
    },
    ...textStyle.info,
    color: '#BF000F',
    height: '60px',
    [breakpoint.large]: {
      paddingTop: '5px',
      height: '50px',
    },
    [breakpoint.medium]: {
      paddingTop: '0px',
      height: '39px',
    },
    [breakpoint.small]: {
      paddingTop: '0px',
      height: '39px',
    },
  },
  btnIcon: {
    [breakpoint.medium]: {
      width: '16px',
      height: '16px',
    },
    [breakpoint.small]: {
      width: '16px',
      height: '16px',
    },
  },
  listAlert: {
    '&::-webkit-scrollbar': {
      width: '10px',
      height: '100px',
    },
    '&::-moz-scrollbar': {
      width: '10px',
      height: '100px',
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
    height: '386px',
    padding: 0,
    overflow: 'auto',
    position: 'relative',
    margin: '10px auto',
    [breakpoint.large]: {
      '&::-webkit-scrollbar': {
        width: '9px',
        height: '87px',
      },
      '&::-moz-scrollbar': {
        width: '9px',
        height: '87px',
      },
      height: '334px',
    },
    [breakpoint.medium]: {
      '&::-webkit-scrollbar': {
        width: '7px',
        height: '67px',
      },
      '&::-moz-scrollbar': {
        width: '7px',
        height: '67px',
      },
      height: '249px',
    },
    [breakpoint.small]: {
      '&::-webkit-scrollbar': {
        width: '7px',
        height: '67px',
      },
      '&::-moz-scrollbar': {
        width: '7px',
        height: '67px',
      },
      height: '249px',
    },
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  listItem: {
    padding: '20px 30px',
    borderBottom: '1px solid rgba(0,0,0,0.3)',
    '&:hover': { backgroundColor: 'rgba(18, 88, 105, 0.1)' },
    [breakpoint.large]: {
      padding: '15px 25px',
    },
    [breakpoint.medium]: {
      padding: '10px 20px',
    },
    [breakpoint.small]: {
      padding: '10px 20px',
    },
  },
  listItemFocus: {
    padding: '20px 30px',
    borderBottom: '1px solid rgba(0,0,0,0.3)',
    backgroundColor: 'rgba(18, 88, 105, 0.1)',
    [breakpoint.large]: {
      padding: '15px 25px',
    },
    [breakpoint.medium]: {
      padding: '10px 20px',
    },
    [breakpoint.small]: {
      padding: '10px 20px',
    },
  },
  listItemText: {
    paddingLeft: '3px',
    lineHeight: '20px',
  },
  listItemEmpty: {
    display: 'flex',
    height: '100%',
  },
  textlistEmpty: {
    margin: 'auto',
  },
  dateItem: {
    ...textStyle.day,
    marginBottom: '10px',
    [breakpoint.large]: {
      fontSize: '12px',
    },
    [breakpoint.medium]: {
      fontSize: '10px',
    },
    [breakpoint.small]: {
      fontSize: '10px',
    },
  },
  titleItem: {
    ...textStyle.title4,
    [breakpoint.large]: {
      fontSize: '19px',
    },
    [breakpoint.medium]: {
      fontSize: '15px',
    },
    [breakpoint.small]: {
      fontSize: '15px',
    },
  },
  itemIcon: {
    [breakpoint.medium]: {
      width: '24px',
      height: '24px',
    },
    [breakpoint.small]: {
      width: '24px',
      height: '24px',
    },
  },
  alertDetail: {
    width: '65%',
    height: '100%',
    padding: '30px',
    backgroundColor: colorID.gray1,
    [breakpoint.large]: {
      fontSize: '19px',
      padding: '26px',
    },
    [breakpoint.medium]: {
      fontSize: '15px',
      padding: '20px',
    },
    [breakpoint.small]: {
      fontSize: '15px',
      padding: '20px',
    },
  },
  infoDetail: {
    width: '100%',
    height: '86%',
  },
  listDetail: {
    height: '100%',
    overflow: 'auto',
    padding: 0,
  },
  buttonDetail: {
    width: '100%',
    height: '14%',
    paddingTop: '15px',
    textAlign: 'right',
    [breakpoint.large]: {
      paddingTop: '12px',
    },
    [breakpoint.medium]: {
      paddingTop: '8px',
    },
    [breakpoint.small]: {
      paddingTop: '8px',
    },
  },
  buttonTDB: {
    textTransform: 'capitalize',
    minHeight: '20px',
    width: '160px',
    height: '40px',
    backgroundColor: colorID.red1,
    color: colorID.white,
    marginRight: '30px',
    fontSize: '16px',
    '&:hover': { backgroundColor: colorID.red1 },
    [breakpoint.large]: {
      width: '145px',
      height: '37px',
      marginRight: '26px',
      fontSize: '14px',
    },
    [breakpoint.medium]: {
      width: '107px',
      height: '30px',
      marginRight: '20px',
      fontSize: '12px',
    },
    [breakpoint.small]: {
      width: '107px',
      height: '30px',
      marginRight: '20px',
      fontSize: '12px',
    },
  },
  buttonIgnore: {
    textTransform: 'capitalize',
    minHeight: '20px',
    width: '160px',
    height: '40px',
    fontSize: '16px',
    backgroundColor: colorID.gray3,
    color: colorID.white,
    '&:hover': { backgroundColor: colorID.gray3 },
    [breakpoint.large]: {
      width: '145px',
      height: '37px',
      fontSize: '14px',
    },
    [breakpoint.medium]: {
      width: '107px',
      height: '30px',
      fontSize: '12px',
    },
    [breakpoint.small]: {
      width: '107px',
      height: '30px',
      fontSize: '12px',
    },
  },
  listItemInfor: {
    padding: 0,
    display: 'block',
  },
  alertInfor: {
    width: '100%',
    padding: '0px',
    overflow: 'auto',
    paddingBottom: '52px',
    [breakpoint.large]: {
      paddingBottom: '32px',
    },
    [breakpoint.medium]: {
      paddingBottom: '22px',
    },
    [breakpoint.small]: {
      paddingBottom: '22px',
    },
  },
  alertIcon: {
    marginBottom: '14px',
  },
  nameInfor: {
    marginLeft: '16px',
    ...textStyle.title2,
    marginBottom: '14px',
    [breakpoint.large]: {
      fontSize: '20px',
    },
    [breakpoint.medium]: {
      fontSize: '16px',
    },
    [breakpoint.small]: {
      fontSize: '16px',
    },
  },
  dateInfor: {
    ...textStyle.info,
    marginTop: '14px',
    marginBottom: '10px',
    [breakpoint.large]: {
      fontSize: '13px',
    },
    [breakpoint.medium]: {
      fontSize: '10px',
    },
    [breakpoint.small]: {
      fontSize: '10px',
    },
  },
  titleInfor: {
    ...textStyle.title4,
    marginTop: '10px',
    [breakpoint.large]: {
      fontSize: '19px',
    },
    [breakpoint.medium]: {
      fontSize: '16px',
    },
    [breakpoint.small]: {
      fontSize: '16px',
    },
  },
  alertInforDetail: {
    width: '100%',
  },
  textDetail: {
    marginBottom: '14px',
    ...textStyle.text3,
    [breakpoint.large]: {
      fontSize: '18px',
    },
    [breakpoint.medium]: {
      fontSize: '13px',
    },
    [breakpoint.small]: {
      fontSize: '13px',
    },
  },
  dialog: {
    width: '800px',
  },
  menuItem: {
    display: 'flex',
    width: '210px',
    padding: '14px',
    [breakpoint.large]: {
      width: '200px',
      padding: '12px',
    },
    [breakpoint.medium]: {
      width: '160px',
      padding: '10px',
    },
    [breakpoint.small]: {
      width: '160px',
      padding: '10px',
    },
  },
  primary: {
    fontSize: '16px',
    paddingTop: '10px',
    [breakpoint.large]: {
      fontSize: '14px',
      paddingTop: '8px',
    },
    [breakpoint.medium]: {
      fontSize: '12px',
      paddingTop: '6px',
    },
    [breakpoint.small]: {
      fontSize: '12px',
      paddingTop: '6px',
    },
  },
  menuShow: {
    display: 'block',
  },
  menuNone: {
    display: 'none',
  },
  buttonMenu: {
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    '&:last-child': {
      borderBottom: 'none',
    },
    padding: 0,
  },
  menuOpacity: {
    opacity: '0.4',
  },
  menu: {
    position: 'absolute',
    backgroundColor: 'white',
    boxShadow: '1px 3px 3px 1px rgba(0,0,0,0.16)',
    width: '210px',
    height: '193px',
    marginLeft: '24.7%',
    marginTop: '5.5%',
    zIndex: '800',
    [breakpoint.large]: {
      width: '200px',
      height: '179px',
      marginLeft: '23.5%',
      marginTop: '4.5%',
    },
    [breakpoint.medium]: {
      marginLeft: '23.4%',
      marginTop: '4.5%',
      width: '160px',
      height: '135px',
    },
    [breakpoint.small]: {
      marginLeft: '346px',
      marginTop: '52px',
      width: '160px',
      height: '135px',
    },
  },
  itemLeft: {
    marginRight: '15px',
    [breakpoint.large]: {
      marginRight: '12px',
    },
    [breakpoint.medium]: {
      marginRight: '10px',
    },
    [breakpoint.small]: {
      marginRight: '10px',
    },
  },
  rootItemText: {
    [breakpoint.medium]: {
      padding: 0,
    },
    [breakpoint.small]: {
      padding: 0,
    },
  },
  checkBox: {
    color: 'white',
    width: '20%',
    height: '20%',
  },
  textNormal: {
    position: 'absolute',
    top: '0',
    right: '0',
  },
});

export default vehicleCarALerts;
