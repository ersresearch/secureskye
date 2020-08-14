/*
 * @Author: NhuHH 
 * @Date: 2018-11-30 08:00:24 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-12 11:05:06
 */
import { breakpoint, textStyle } from '../common';
const upgradeDetail = theme => ({
  typography: {
    margin: theme.spacing.unit * 2,
  },
  root: {
    outline: 'none',
    margin: '358px 151px 235px 573px',
    borderRadius: '6px',
    [breakpoint.small]: {
      margin: '239px 101px 157px 382px',
    },
    [breakpoint.medium]: {
      margin: '239px 101px 157px 382px',
    },
    [breakpoint.large]: {
      margin: '313px 132px 205px 501px',
    },
  },
  modalTitle: {
    minHeight: '70px',
    height: '70px',
    borderBottom: '1px solid gray',
    padding: '15px 20px',
    display: 'flex',
    [breakpoint.small]: {
      minHeight: '47px',
      height: '47px',
      padding: '10px 13px',
    },
    [breakpoint.medium]: {
      minHeight: '47px',
      height: '47px',
      padding: '10px 13px',
    },
    [breakpoint.large]: {
      minHeight: '61px',
      height: '61px',
      padding: '13px 18px',
    },
  },
  modalFooter: {
    minHeight: '70px',
    height: '70px',
    [breakpoint.small]: {
      minHeight: '47px',
      height: '47px',
    },
    [breakpoint.medium]: {
      minHeight: '47px',
      height: '47px',
    },
    [breakpoint.large]: {
      minHeight: '61px',
      height: '61px',
    },
  },
  modalContent: {
    height: '360px',
    display: 'flex',
    [breakpoint.small]: {
      height: '226px',
    },
    [breakpoint.medium]: {
      height: '226px',
    },
    [breakpoint.large]: {
      height: '304px',
    },
  },
  contentLeft: {
    width: '49.5%',
    margin: '11px 0px 0px 11px',
    marginRight: '1%',
    border: '1px solid #bebebe',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
    },
    '&::-moz-scrollbar': {
      width: '8px',
      height: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#e50012',
      borderRadius: '8px',
    },
    '&::-moz-scrollbar-thumb': {
      backgroundColor: '#e50012',
      borderRadius: '8px',
    },
    [breakpoint.small]: {
      margin: '7px 0px 0px 7px',
      marginRight: '1%',
      '&::-webkit-scrollbar': {
        width: '5px',
        height: '5px',
      },
      '&::-moz-scrollbar': {
        width: '5px',
        height: '5px',
      },
    },
    [breakpoint.medium]: {
      margin: '7px 0px 0px 7px',
      marginRight: '1%',
      '&::-webkit-scrollbar': {
        width: '5px',
        height: '5px',
      },
      '&::-moz-scrollbar': {
        width: '5px',
        height: '5px',
      },
    },
    [breakpoint.large]: {
      margin: '10px 0px 0px 10px',
      marginRight: '1%',
      '&::-webkit-scrollbar': {
        width: '7px',
        height: '7px',
      },
      '&::-moz-scrollbar': {
        width: '7px',
        height: '7px',
      },
    },
  },
  contentRight: {
    width: '49.5%',
    margin: '12px 11px 0px 0px',
    border: '1px solid #bebebe',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
    },
    '&::-moz-scrollbar': {
      width: '8px',
      height: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#e50012',
      borderRadius: '8px',
    },
    '&::-moz-scrollbar-thumb': {
      backgroundColor: '#e50012',
      borderRadius: '8px',
    },
    [breakpoint.small]: {
      margin: '8px 7px 0px 0px',
      '&::-webkit-scrollbar': {
        width: '5px',
        height: '5px',
      },
      '&::-moz-scrollbar': {
        width: '5px',
        height: '5px',
      },
    },
    [breakpoint.medium]: {
      margin: '8px 7px 0px 0px',
      '&::-webkit-scrollbar': {
        width: '5px',
        height: '5px',
      },
      '&::-moz-scrollbar': {
        width: '5px',
        height: '5px',
      },
    },
    [breakpoint.large]: {
      margin: '11px 10px 0px 0px',
      '&::-webkit-scrollbar': {
        width: '7px',
        height: '7px',
      },
      '&::-moz-scrollbar': {
        width: '7px',
        height: '7px',
      },
    },
  },
  item: {
    display: 'flex',
    margin: '18px 22px 17px 24px',
    '&:last-child': {
      marginBottom: '18px',
    },
    [breakpoint.small]: {
      margin: '12px 15px 11px 16px',
      '&:last-child': {
        marginBottom: '12px',
      },
    },
    [breakpoint.medium]: {
      margin: '12px 15px 11px 16px',
      '&:last-child': {
        marginBottom: '12px',
      },
    },
    [breakpoint.large]: {
      margin: '16px 19px 14px 21px',
      '&:last-child': {
        marginBottom: '16px',
      },
    },
  },
  itemLeft: {
    width: 'calc(100% - 360px)',
    padding: '7px 0px',
    ...textStyle.text3,
    [breakpoint.small]: {
      width: 'calc(100% - 240px)',
      padding: '5px 0px',
      fontSize: '13px',
    },
    [breakpoint.medium]: {
      width: 'calc(100% - 240px)',
      padding: '5px 0px',
      fontSize: '13px',
    },
    [breakpoint.large]: {
      width: 'calc(100% - 310px)',
      padding: '6px 0px',
      fontSize: '17px',
    },
  },
  itemRight: {
    ...textStyle.text3,
    wordWrap: 'break-word',
    width: '360px',
    minHeight: '44px',
    borderRadius: '6px',
    boxShadow: '0 2px 2px 0 rgba(13, 2, 2, 0.2)',
    backgroundColor: '#e5e5e5',
    padding: '8px 19px',
    [breakpoint.small]: {
      width: '240px',
      minHeight: '29px',
      padding: '5px 13px',
      fontSize: '13px',
    },
    [breakpoint.medium]: {
      width: '240px',
      minHeight: '29px',
      padding: '5px 13px',
      fontSize: '13px',
    },
    [breakpoint.large]: {
      width: '310px',
      minHeight: '39px',
      padding: '7px 17px',
      fontSize: '17px',
    },
  },
  buttonTitle: {
    margin: 'auto',
    marginRight: 0,
  },
  buttonClose: {
    color: 'gray',
    boxShadow: 'none',
    width: '28px',
    height: '5px',
    minHeight: '5px',
    minWidth: '28px',
    padding: 0,
    [breakpoint.small]: {
      width: '19px',
      height: '3px',
      minHeight: '3px',
      minWidth: '19px',
    },
    [breakpoint.medium]: {
      width: '19px',
      height: '3px',
      minHeight: '3px',
      minWidth: '19px',
    },
    [breakpoint.large]: {
      width: '25px',
      height: '4px',
      minHeight: '4px',
      minWidth: '25px',
    },
  },
  textTitle: {
    ...textStyle.title2,
  },
  buttonID: {
    boxShadow: 'none',
  },
  buttonFile: {
    boxShadow: 'none',
  },
  buttonUpgrade: {
    marginRight: '10px',
    [breakpoint.small]: {
      marginRight: '7px',
    },
    [breakpoint.medium]: {
      marginRight: '7px',
    },
    [breakpoint.large]: {
      marginRight: '9px',
    },
  },
  buttonFooter: {
    width: '298px',
    margin: '23px auto',
    [breakpoint.small]: {
      width: '199px',
      margin: '15px auto',
    },
    [breakpoint.medium]: {
      width: '199px',
      margin: '15px auto',
    },
    [breakpoint.large]: {
      width: '250px',
      margin: '20px auto',
    },
  },
  buttonDownload: {
    boxShadow: 'none',
    height: 0,
    color: '#0759fc',
    justifyContent: 'normal',
    padding: 0,
    fontFamily: 'sans-serif',
    '&:hover': {
      backgroundColor: 'white',
    },
    marginTop: '-5px',
    [breakpoint.small]: {
      marginTop: '-9px',
    },
    [breakpoint.medium]: {
      marginTop: '-9px',
    },
    [breakpoint.large]: {
      marginTop: '-7px',
    },
  },
  color: {
    width: '20px',
    height: '20px',
    backgroundColor: 'gray',
    borderRadius: '50%',
    margin: '2px 18px 0px 0px',
    [breakpoint.small]: {
      width: '13px',
      height: '13px',
      margin: '1px 12px 0px 0px',
    },
    [breakpoint.medium]: {
      width: '13px',
      height: '13px',
      margin: '1px 12px 0px 0px',
    },
    [breakpoint.large]: {
      width: '18px',
      height: '18px',
      margin: '2px 16px 0px 0px',
    },
  },
  colorEcu: {
    backgroundColor: '#e50012',
  },
  colorFile: {
    backgroundColor: '#eeb600',
  },
  ecuInformation: {
    margin: '13px 19px 13px 23px',
    [breakpoint.small]: {
      margin: '9px 13px 9px 15px',
    },
    [breakpoint.medium]: {
      margin: '9px 13px 9px 15px',
    },
    [breakpoint.large]: {
      margin: '11px 17px 11px 20px',
    },
  },
  ecuId: {
    display: 'flex',
    marginBottom: '5px',
    [breakpoint.small]: {
      marginBottom: '3px',
    },
    [breakpoint.medium]: {
      marginBottom: '3px',
    },
    [breakpoint.large]: {
      marginBottom: '4px',
    },
  },
  title: {
    ...textStyle.text3,
    maxWidth: 'calc(100% - 40px)',
    height: '25px',
    wordWrap: 'break-word',
    borderRadius: '14px',
    outline: 'none',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    textAlign: 'left',
    '&:hover': {
      padding: ' 0px 10px',
      backgroundColor: '#e500123b',
    },
    [breakpoint.small]: {
      maxWidth: 'calc(100% - 27px)',
      height: '17px',
      fontSize: '13px',
      '&:hover': {
        padding: ' 0px 7px',
      },
    },
    [breakpoint.medium]: {
      maxWidth: 'calc(100% - 27px)',
      height: '17px',
      fontSize: '13px',
      '&:hover': {
        padding: ' 0px 7px',
      },
    },
    [breakpoint.large]: {
      maxWidth: 'calc(100% - 35px)',
      height: '22px',
      fontSize: '17px',
      '&:hover': {
        padding: ' 0px 9px',
      },
    },
  },
  ecuIdTitle: {
    // '&:hover': {
    //   backgroundColor: '#e500123b',
    // },
  },
  fileTitle: {
    // '&:hover': {
    //   backgroundColor: '#eeb6004d',
    // },
  },
  file: {
    display: 'flex',
  },
  files: {
    marginLeft: '40px',
    [breakpoint.small]: {
      marginLeft: '27px',
    },
    [breakpoint.medium]: {
      marginLeft: '27px',
    },
    [breakpoint.large]: {
      marginLeft: '35px',
    },
  },
  popover: {
    width: '1000px',
    minHeight: '200px',
    borderRadius: '29px',
    boxShadow: '0 3px 99px 0 rgba(255, 255, 255, 0.16)',
    padding: '13px 0px 9px 33px',
    [breakpoint.small]: {
      width: '623px',
      minHeight: '133px',
      padding: '11px 0px 6px 22px',
    },
    [breakpoint.medium]: {
      width: '623px',
      minHeight: '133px',
      padding: '11px 0px 6px 22px',
    },
    [breakpoint.large]: {
      width: '815px',
      minHeight: '175px',
      padding: '14px 0px 6px 29px',
    },
  },
  popoverTitle: {
    ...textStyle.title3,
    height: '28px',
    letterSpacing: 'normal',
    color: '#e50012',
    marginBottom: '17px',
    [breakpoint.small]: {
      height: '19px',
      marginBottom: '11px',
      fontSize: '13px',
    },
    [breakpoint.medium]: {
      height: '19px',
      marginBottom: '11px',
      fontSize: '13px',
    },
    [breakpoint.large]: {
      height: '25px',
      marginBottom: '15px',
      fontSize: '17px',
    },
  },
  popoverContent: {
    maxHeight: '560px',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
    },
    '&::-moz-scrollbar': {
      width: '8px',
      height: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#e50012',
      borderRadius: '8px',
    },
    '&::-moz-scrollbar-thumb': {
      backgroundColor: '#e50012',
      borderRadius: '8px',
    },
    [breakpoint.small]: {
      maxHeight: '365px',
      '&::-webkit-scrollbar': {
        width: '5px',
        height: '5px',
      },
      '&::-moz-scrollbar': {
        width: '5px',
        height: '5px',
      },
    },
    [breakpoint.medium]: {
      maxHeight: '365px',
      '&::-webkit-scrollbar': {
        width: '5px',
        height: '5px',
      },
      '&::-moz-scrollbar': {
        width: '5px',
        height: '5px',
      },
    },
    [breakpoint.large]: {
      maxHeight: '488px',
      '&::-webkit-scrollbar': {
        width: '7px',
        height: '7px',
      },
      '&::-moz-scrollbar': {
        width: '7px',
        height: '7px',
      },
    },
  },
  popoverItem: {
    display: 'flex',
    marginBottom: '9px',
    [breakpoint.small]: {
      marginBottom: '6px',
    },
    [breakpoint.medium]: {
      marginBottom: '6px',
    },
    [breakpoint.large]: {
      marginBottom: '8px',
    },
  },
  popoverItemLeft: {
    width: '175px',
    ...textStyle.text3,
    [breakpoint.small]: {
      width: '117px',
      fontSize: '13px',
    },
    [breakpoint.medium]: {
      width: '117px',
      fontSize: '13px',
    },
    [breakpoint.large]: {
      width: '153px',
      fontSize: '17px',
    },
  },
  popoverItemRight: {
    ...textStyle.text3,
    fontFamily: 'sans-serif',
    wordWrap: 'break-word',
    width: 'calc(100% - 175px)',
    paddingRight: '33px',
    [breakpoint.small]: {
      fontSize: '13px',
      width: 'calc(100% - 117px)',
      paddingRight: '22px',
    },
    [breakpoint.medium]: {
      fontSize: '13px',
      width: 'calc(100% - 117px)',
      paddingRight: '22px',
    },
    [breakpoint.large]: {
      fontSize: '17px',
      width: 'calc(100% - 153px)',
      paddingRight: '29px',
    },
  },
});

export default upgradeDetail;
