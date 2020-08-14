/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 08:59:40 
 * @Last Modified by: DanND1
 * @Last Modified time: 2018-12-10 14:49:12
 */
import { colorID, textStyle, breakpoint } from 'styles/jss/common';
import Background from 'assets/images/background.png';
const vehicleECUSoftwareUpdate = () => ({
  root: {
    width: '100%',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  tableEmpty: {
    textAlign: 'center',
    ...textStyle.title4,
    padding: '15%',
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
  table: {
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '50px',
      height: '10px',
    },
    '&::-moz-scrollbar': {
      width: '50px',
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
    [breakpoint.large]: {
      '&::-webkit-scrollbar': {
        width: '87px',
        height: '9px',
      },
      '&::-moz-scrollbar': {
        width: '87px',
        height: '9px',
      },
    },
    [breakpoint.medium]: {
      '&::-webkit-scrollbar': {
        width: '67px',
        height: '7px',
      },
      '&::-moz-scrollbar': {
        width: '67px',
        height: '7px',
      },
    },
    [breakpoint.small]: {
      '&::-webkit-scrollbar': {
        width: '67px',
        height: '7px',
      },
      '&::-moz-scrollbar': {
        width: '67px',
        height: '7px',
      },
    },
  },
  tableRoot: {
    position: 'relative',
    backgroundColor: colorID.gray1,
    height: '457px',
    boxShadow: '1px 0px 2px rgba(0,0,0,0.16)',
    borderRadius: '8px',
    [breakpoint.large]: {
      height: '400px',
    },
    [breakpoint.medium]: {
      height: '305px',
    },
    [breakpoint.small]: {
      height: '305px',
    },
  },
  tableRowFeature: {
    backgroundColor: 'white',
    borderBottom: '1px solid rgba(0,0,0,0.3)',
    height: '80px',
    [breakpoint.large]: {
      height: '70px',
    },
    [breakpoint.medium]: {
      height: '54px',
    },
    [breakpoint.small]: {
      height: '54px',
    },
  },
  tableRowVersion: {
    height: '106px',
    [breakpoint.large]: {
      height: '93px',
    },
    [breakpoint.medium]: {
      height: '68px',
    },
    [breakpoint.small]: {
      height: '68px',
    },
  },
  tableRowButton: {
    height: '165px',
    [breakpoint.large]: {
      height: '144px',
    },
    [breakpoint.medium]: {
      height: '115px',
    },
    [breakpoint.small]: {
      height: '115px',
    },
  },
  current: {
    borderRight: '1px solid rgba(0,0,0,0.8)',
    borderLeft: '1px solid rgba(0,0,0,0.8)',
    textAlign: 'center',
    zIndex: '1',
  },
  overlay: {
    position: 'relative',
    borderRight: '1px solid rgba(0,0,0,0.8)',
    borderLeft: '1px solid rgba(0,0,0,0.8)',
    backgroundImage: `url(${Background})`,
    textAlign: 'center',
    opacity: '0.5',
    zIndex: '2',
  },
  tableTitle: {
    ...textStyle.title4,
    padding: '4px 0px 4px 47px',
    [breakpoint.large]: {
      fontSize: '19px',
      padding: '4px 0px 4px 41px',
    },
    [breakpoint.medium]: {
      fontSize: '15px',
      padding: '4px 0px 4px 31px',
    },
    [breakpoint.small]: {
      fontSize: '15px',
      padding: '4px 0px 4px 31px',
    },
  },
  tableTitleRoot: {
    ...textStyle.title4,
    padding: '4px 0px 4px 47px',
    [breakpoint.large]: {
      fontSize: '19px',
      padding: '4px 0px 4px 41px',
    },
    [breakpoint.medium]: {
      fontSize: '15px',
      padding: '4px 0px 4px 31px',
    },
    [breakpoint.small]: {
      fontSize: '15px',
      padding: '4px 0px 4px 31px',
    },
  },
  tableCellRoot: {
    padding: '5px 10px 10px 10px',
    '&:last-child': {
      padding: '5px 10px 10px 13px',
    },
  },
  tableFeatureRoot: {
    ...textStyle.title4,
    padding: '5px 10px 10px 10px',
    '&:last-child': {
      padding: '5px 10px 10px 13px',
    },
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
  dateInfor: {
    ...textStyle.text5,
    marginBottom: '10px',
    [breakpoint.large]: {
      fontSize: '16px',
      marginBottom: '9px',
    },
    [breakpoint.medium]: {
      fontSize: '12px',
      marginBottom: '8px',
    },
    [breakpoint.small]: {
      fontSize: '12px',
      marginBottom: '8px',
    },
  },
  versionInfor: {
    ...textStyle.text2,
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
  empty: {
    ...textStyle.text2,
    color: colorID.gray2,
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
  btnIcon: {
    [breakpoint.large]: {
      width: '35px',
      height: '35px',
    },
    [breakpoint.medium]: {
      width: '25px',
      height: '25px',
    },
    [breakpoint.small]: {
      width: '25px',
      height: '25px',
    },
  },
  textUpdate: {
    width: '200px',
    [breakpoint.large]: {
      width: '175px',
    },
    [breakpoint.medium]: {
      width: '134px',
    },
    [breakpoint.small]: {
      width: '134px',
    },
  },
  button: {
    zIndex: '1',
    textTransform: 'none',
    borderRadius: '6px',
    boxShadow: '0px 2px 2px rgba(0,0,0,0.2)',
    width: '200px',
    height: '48px',
    marginTop: '10px',
    ...textStyle.text2,
    fontSize: '16px',
    color: 'white',
    margin: '10px',
    [breakpoint.large]: {
      width: '175px',
      height: '42px',
      fontSize: '14px',
    },
    [breakpoint.medium]: {
      width: '134px',
      height: '32px',
      fontSize: '10px',
    },
    [breakpoint.small]: {
      width: '134px',
      height: '32px',
      fontSize: '10px',
    },
  },
  buttonSuccess: {
    backgroundColor: colorID.gray3,
    outline: 'none',
    '&:hover': {
      backgroundColor: colorID.gray3,
    },
  },
  buttonUpdate: {
    outline: 'none',
    backgroundColor: colorID.red1,
    '&:hover': {
      backgroundColor: colorID.red2,
    },
    '&:focus': {
      boxShadow: '0 0 0 4px #e5001254',
    },
  },
  buttonError: {
    backgroundColor: colorID.red1,
    '&:hover': {
      backgroundColor: colorID.red2,
    },
    '&:focus': {
      boxShadow: '0 0 0 4px #e5001254',
    },
  },
  buttonUpdating: {
    outline: 'none',
    backgroundColor: colorID.red1,
    '&:hover': {
      backgroundColor: colorID.red1,
    },
  },
  btnCheck: {
    [breakpoint.large]: {
      width: '31px',
      height: '31px',
    },
    [breakpoint.medium]: {
      width: '24px',
      height: '24px',
    },
    [breakpoint.small]: {
      width: '24px',
      height: '24px',
    },
  },
  btnError: {
    [breakpoint.large]: {
      width: '31px',
      height: '31px',
    },
    [breakpoint.medium]: {
      width: '24px',
      height: '24px',
    },
    [breakpoint.small]: {
      width: '24px',
      height: '24px',
    },
  },
});

export default vehicleECUSoftwareUpdate;
