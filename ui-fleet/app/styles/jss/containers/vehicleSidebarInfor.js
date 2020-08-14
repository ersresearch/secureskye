/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 09:02:02 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-18 13:30:48
 */
import { colorID, textStyle, breakpoint } from 'styles/jss/common';
const vehicleSidebarInfor = () => ({
  card: {
    backgroundImage: `linear-gradient(${colorID.gray3}, ${colorID.gray4})`,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    borderRadius: '0',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '5px',
      height: '5px',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
      backgroundColor: '#c1c1c1',
    },
    width: '22%',
  },
  tabHeader: {
    padding: '0 0 0 0',
    width: '100%',
    height: '9%',
    alignItems: 'center',
    display: 'flex',
  },
  tabRoot: {
    width: '50%',
    textTransform: 'none',
    minWidth: 'unset',
  },
  tabLabel: {
    ...textStyle.title3,
    lineHeight: 1.36,
    letterSpacing: 'normal',
    textAlign: 'center',
  },
  tabIndicator: {
    display: 'none',
  },
  tabSelected: {
    backgroundImage: 'linear-gradient(to right, #fb0316, #470006)',
  },
  rootHeader: {
    height: '100%',
    width: '100%',
  },
  flexContainer: {
    height: '100%',
  },
  divider: {
    backgroundColor: '#787878',
    height: '1.5px',
  },
  tabContent: {
    marginTop: '10%',
    width: '100%',
    paddingLeft: '54px',
    paddingRight: '54px',
    '&:last-child': {
      paddingBottom: 0,
      paddingTop: 0,
    },
    [breakpoint.small]: {
      paddingLeft: '36px',
      paddingRight: '36px',
    },
    [breakpoint.medium]: {
      paddingLeft: '36px',
      paddingRight: '36px',
    },
    [breakpoint.large]: {
      paddingLeft: '47px',
      paddingRight: '47px',
    },
  },
});
export default vehicleSidebarInfor;
