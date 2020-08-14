/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 09:35:16 
 * @Last Modified by: DanND1
 * @Last Modified time: 2018-12-10 14:51:44
 */
import { colorID, textStyle, breakpoint } from 'styles/jss/common';
const vehicleECUSidebar = () => ({
  root: {
    width: '22%',
    height: '100%',
    margin: 'auto',
    borderRadius: '0',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '5px',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
      backgroundColor: '#c1c1c1',
    },
    backgroundImage: `linear-gradient(${colorID.gray3}, ${colorID.gray4})`,
  },
  cardContent: {
    paddingLeft: '54px',
    paddingRight: '54px',
    [breakpoint.large]: {
      paddingLeft: '47px',
      paddingRight: '47px',
    },
    [breakpoint.medium]: {
      paddingLeft: '36px',
      paddingRight: '36px',
    },
    [breakpoint.small]: {
      paddingLeft: '36px',
      paddingRight: '36px',
    },
  },
  detailSidebar: {
    marginTop: '30px',
    [breakpoint.large]: {
      marginTop: '30px',
    },
    [breakpoint.medium]: {
      marginTop: '26px',
    },
    [breakpoint.small]: {
      marginTop: '20px',
    },
  },
  titleSidebar: {
    ...textStyle.title2,
    color: colorID.white,
    marginTop: '50px',
    [breakpoint.large]: {
      marginTop: '43px',
      fontSize: '22px',
    },
    [breakpoint.medium]: {
      marginTop: '33px',
      fontSize: '16px',
    },
    [breakpoint.small]: {
      marginTop: '33px',
      fontSize: '16px',
    },
  },
  infor: {
    padding: '26px 0',
    borderBottom: '1px solid #E3E3E3',
    display: 'flex',
    [breakpoint.large]: {
      padding: '22px 0',
    },
    [breakpoint.medium]: {
      padding: '17px 0',
    },
    [breakpoint.small]: {
      padding: '17px 0',
    },
  },
  colLeft: {
    width: '140px',
    [breakpoint.large]: {
      width: '120px',
    },
    [breakpoint.medium]: {
      width: '90px',
    },
    [breakpoint.small]: {
      width: '90px',
    },
  },
  colRight: {
    width: 'calc(100% - 140px)',
    [breakpoint.large]: {
      width: 'calc(100% - 120px)',
    },
    [breakpoint.medium]: {
      width: 'calc(100% - 90px)',
    },
    [breakpoint.small]: {
      width: 'calc(100% - 90px)',
    },
  },
  textLeft: {
    ...textStyle.text2,
    color: colorID.white,
    fontFamily: 'Arial',
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
  textRight: {
    ...textStyle.text2,
    color: colorID.white,
    wordWrap: 'break-word',
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
});

export default vehicleECUSidebar;
