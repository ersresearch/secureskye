/*
 * @Author: NhuHH 
 * @Date: 2018-11-29 08:13:01 
 * @Last Modified by: LoiDT2
 * @Last Modified time: 2018-12-14 17:02:05
 */
import { colorID, breakpoint, textStyle } from '../common';
const otaList = () => ({
  header: {
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
  button: {
    fontWeight: 'bold',
    borderRadius: '6px',
    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
    backgroundColor: '#d10010',
    color: colorID.white,
    outline: 'none',
    width: '144px',
    height: '48px',
    fontSize: '21px',
    [breakpoint.large]: {
      width: '126px',
      height: '42px',
      fontSize: '18px',
    },
    [breakpoint.medium]: {
      width: '96px',
      height: '32px',
      fontSize: '14px',
    },
    [breakpoint.small]: {
      width: '96px',
      height: '32px',
      fontSize: '14px',
    },
  },
  buttonView: {
    marginLeft: '10px',
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
  checkboxRoot: {
    color: 'gray',
    '&$checked': {
      color: '#21a600',
    },
  },
  checked: {},
  tooltipHover: {
    position: 'relative',
  },
  buttonHeader: {
    margin: 'auto',
    marginRight: 0,
  },
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

export default otaList;
