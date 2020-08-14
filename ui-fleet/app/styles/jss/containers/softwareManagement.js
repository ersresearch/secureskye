/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 09:02:34 
 * @Last Modified by: DanND1
 * @Last Modified time: 2018-12-10 15:05:40
 */
import { textStyle, colorID, breakpoint } from 'styles/jss/common';
const softwareManagement = () => ({
  card: {
    width: '100%',
    height: '48%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '30px',
    [breakpoint.small]: {
      marginBottom: '20px',
    },
    [breakpoint.medium]: {
      marginBottom: '20px',
    },
    [breakpoint.large]: {
      marginBottom: '26px',
    },
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
    height: '73px',
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
  tabs: {
    float: 'left',
    marginLeft: '5px',
  },
  tab: {
    textTransform: 'inherit',
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
  tabSelected: {
    color: colorID.red1,
  },
  tabLabel: {
    ...textStyle.text4,
    color: 'unset',
    [breakpoint.small]: {
      fontSize: '13px',
    },
    [breakpoint.medium]: {
      fontSize: '13px',
    },
    [breakpoint.large]: {
      fontSize: '16px',
    },
  },
  tabLabelContainer: {
    padding: '0',
  },
  clear: {
    clear: 'both',
  },
  circle: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    marginTop: '12px',
    marginRight: '7px',
    [breakpoint.small]: {
      width: '5px',
      height: '5px',
      marginTop: '8px',
      marginRight: '5px',
    },
    [breakpoint.medium]: {
      width: '5px',
      height: '5px',
      marginTop: '8px',
      marginRight: '5px',
    },
    [breakpoint.large]: {
      width: '6px',
      height: '6px',
      marginTop: '10px',
      marginRight: '6px',
    },
  },
  circleALert: {
    backgroundColor: '#E5C200',
  },
  circleCritical: {
    backgroundColor: '#E50012',
  },
  circleNormal: {
    backgroundColor: colorID.gray3,
  },
  circleInformation: {
    backgroundColor: '#28B6DD',
  },
  text: {
    textTransform: 'uppercase',
    ...textStyle.text4,
    fontSize: '20px',
    wordWrap: 'break-word',
    [breakpoint.small]: {
      fontSize: '13px',
    },
    [breakpoint.medium]: {
      fontSize: '13px',
    },
    [breakpoint.large]: {
      fontSize: '16px',
    },
  },
  textColor: {
    ...textStyle.text4,
    fontSize: '20px',
    color: colorID.red1,
    [breakpoint.small]: {
      fontSize: '13px',
    },
    [breakpoint.medium]: {
      fontSize: '13px',
    },
    [breakpoint.large]: {
      fontSize: '16px',
    },
  },
  textAlertStatus: {
    display: 'flex',
    ...textStyle.text4,
    fontSize: '20px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    [breakpoint.small]: {
      fontSize: '13px',
    },
    [breakpoint.medium]: {
      fontSize: '13px',
    },
    [breakpoint.large]: {
      fontSize: '16px',
    },
  },
  textALert: {
    color: '#E5C200',
  },
  textCritical: {
    color: '#E50012',
  },
  textNormal: {
    color: colorID.gray3,
  },
  textInformation: {
    color: '#28B6DD',
  },
  button: {
    width: '190px',
    height: '45px',
    padding: '1px',
    minHeight: '0px',
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: colorID.red2,
    ...textStyle.text5,
    textTransform: 'inherit',
    color: 'white',
    margin: 'auto',
    [breakpoint.small]: {
      width: '110px',
      height: '30px',
      fontSize: '12px',
    },
    [breakpoint.medium]: {
      width: '110px',
      height: '30px',
      fontSize: '12px',
    },
    [breakpoint.large]: {
      width: '166px',
      height: '39px',
      fontSize: '15px',
    },
    '&:hover': {
      backgroundColor: colorID.red1,
    },
    '&:focus': {
      boxShadow: '0 0 0 4px #e5001254',
    },
  },
  buttonShow: {
    display: 'block',
  },
  buttonNone: {
    display: 'none',
  },
  table: {
    overflow: 'auto',
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
    },
    '&::-moz-scrollbar-thumb': {
      backgroundColor: '#BEBEBE',
      borderRadius: '10px',
    },
    [breakpoint.small]: {
      '&::-webkit-scrollbar': {
        width: '9px',
        height: '9px',
      },
      '&::-moz-scrollbar': {
        width: '9px',
        height: '9px',
      },
    },
    [breakpoint.medium]: {
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
});

export default softwareManagement;
