/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 09:15:56 
 * @Last Modified by: LoiDT2
 * @Last Modified time: 2018-12-14 16:46:08
 */
import { colorID, breakpoint, textStyle } from '../common';
const vehicle = () => ({
  root: {
    width: '100%',
    margin: '0 auto',
    height: '100%',
    display: 'flex',
  },
  sidebar: {
    width: '22%',
  },
  container: {
    width: '78%',
    height: '100%',
  },
  cardInfor: {
    backgroundImage: `linear-gradient(${colorID.gray3}, ${colorID.gray4})`,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
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
    width: '22%',
  },
  tabContent: {
    marginTop: '18%',
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
    position: 'relative',
  },
  panels: {
    width: '100%',
    height: '95%',
    padding: '30px',
    [breakpoint.large]: {
      padding: '26px',
    },
    [breakpoint.medium]: {
      padding: '20px',
    },
    [breakpoint.small]: {
      padding: '20px',
    },
  },
  vehicleList: {
    height: '100%',
  },
  headerLeft: {
    width: '50%',
    margin: 'auto',
    ...textStyle.title2,
  },
  headerRight: {
    width: '50%',
    textAlign: 'right',
    margin: 'auto',
  },
  text: {
    ...textStyle.text3,
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
  button: {
    fontWeight: 'bold',
    borderRadius: '6px',
    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
    backgroundColor: '#d10010',
    color: colorID.white,
    outline: 'none',
    width: '144px',
    height: '48px',
    [breakpoint.large]: {
      width: '126px',
      height: '42px',
    },
    [breakpoint.medium]: {
      width: '96px',
      height: '32.16px',
    },
    [breakpoint.small]: {
      width: '96px',
      height: '32.16px',
    },
  },
  buttonRegister: {
    margin: 'auto',
    '&:hover': { backgroundColor: colorID.red2 },
    '&:focus': {
      boxShadow: '0 0 0 4px #e5001254',
    },
  },
  buttonUpdate: {
    '&:hover': { backgroundColor: colorID.red2 },
    '&:focus': {
      boxShadow: '0 0 0 4px #e5001254',
    },
    margin: '12px 16px',
    [breakpoint.large]: {
      margin: '10.5px 14px',
    },
    [breakpoint.medium]: {
      margin: '8.04px 10.72px',
    },
    [breakpoint.small]: {
      margin: '8.04px 10.72px',
    },
  },
  buttonRemove: {
    '&:hover': { backgroundColor: colorID.red2 },
    '&:focus': {
      boxShadow: '0 0 0 4px #e5001254',
    },
    margin: '12px 0px',
    [breakpoint.large]: {
      margin: '10.5px 0px',
    },
    [breakpoint.medium]: {
      margin: '8.04px 0px',
    },
    [breakpoint.small]: {
      margin: '8.04px 0px',
    },
  },
  CarIcon: {
    width: '30px',
    height: '30px',
    [breakpoint.large]: {
      width: '26px',
      height: '26px',
    },
    [breakpoint.medium]: {
      width: '20px',
      height: '20px',
    },
    [breakpoint.small]: {
      width: '20px',
      height: '20px',
    },
  },
  textRegister: {
    ...textStyle.text5,
    color: colorID.white,
    textAlign: 'center',
    marginLeft: '5px',
    marginTop: '4px',
    [breakpoint.large]: {
      fontSize: '16px',
    },
    [breakpoint.medium]: {
      fontSize: '14px',
      marginTop: '2px',
    },
    [breakpoint.small]: {
      fontSize: '14px',
      marginTop: '2px',
    },
  },
  ReactTable: {
    height: 'calc(100% - 92px)',
    [breakpoint.large]: {
      height: 'calc(100% - 81px)',
    },
    [breakpoint.medium]: {
      height: 'calc(100% - 61px)',
    },
    [breakpoint.small]: {
      height: 'calc(100% - 61px)',
    },
  },
  rtHeader: {
    backgroundColor: 'none',
  },
  content: {
    display: 'flex',
    padding: '0 10px',
    [breakpoint.large]: {
      padding: '0 10px',
    },
    [breakpoint.medium]: {
      padding: '0 3px',
    },
    [breakpoint.small]: {
      padding: '0 3px',
    },
  },
  buttonView: {
    width: '80px',
    height: '50px',
    backgroundColor: colorID.gray2,
    borderRadius: '6px',
    outline: 'none',
    marginLeft: '10px',
    [breakpoint.large]: {
      width: '75px',
      height: '45px',
    },
    [breakpoint.medium]: {
      width: '60px',
      height: '35px',
    },
    [breakpoint.small]: {
      width: '60px',
      height: '35px',
    },
    '&:hover': {
      backgroundColor: '#828080',
    },
    '&:focus': {
      boxShadow: '0 0 0 4px #9e979754',
    },
  },
  wrapperColor: {
    display: 'flex',
  },
  colorVehicle: {
    boxShadow: '1px 1px 0px 0px #ddd',
    border: '1px solid #DDD',
    width: '26px',
    height: '26px',
    [breakpoint.large]: {
      width: '23px',
      height: '23px',
    },
    [breakpoint.medium]: {
      width: '17px',
      height: '17px',
    },
    [breakpoint.small]: {
      width: '17px',
      height: '17px',
    },
    borderRadius: '4px',
    margin: 'auto 0',
    marginRight: '5px',
  },
  groupButton: {
    backgroundColor: colorID.gray1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '92px',
    [breakpoint.large]: {
      height: '81px',
    },
    [breakpoint.medium]: {
      height: '61px',
    },
    [breakpoint.small]: {
      height: '61px',
    },
    '& > *': {
      margin: '0 15px',
      '&:first-child': {
        marginRight: 0,
      },
      '&:last-child': {
        marginLeft: 0,
      },
      [breakpoint.small]: {
        margin: '0 10px',
      },
      [breakpoint.medium]: {
        margin: '0 10px',
      },
      [breakpoint.large]: {
        margin: '0 13px',
      },
    },
  },
  checkboxRoot: {
    color: 'gray',
    '&$checked': {
      color: '#21a600',
    },
  },
  checked: {},
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: '1',
    cursor: 'pointer',
    position: 'absolute',
  },
  iconLoading: {
    height: '100%',
  },
});

export default vehicle;
