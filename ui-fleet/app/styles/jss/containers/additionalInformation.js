/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 08:58:42 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-12 10:07:52

 */
import { breakpoint, textStyle } from '../common';
const additionalInformation = () => ({
  root: {
    width: '100%',
    height: '100%',
    margin: '0 auto',
    flexDirection: 'column',
    display: 'flex',
  },
  header: {
    display: 'flex',
  },
  button: {
    outline: 'none',
    marginRight: '6px',
    marginTop: '-7px',
    [breakpoint.large]: {
      marginRight: '5px',
      marginTop: '-6px',
    },
    [breakpoint.medium]: {
      marginRight: '4px',
      marginTop: '-5px',
    },
    [breakpoint.small]: {
      marginRight: '4px',
      marginTop: '-5px',
    },
  },
  buttonDelete: {
    marginLeft: '8px',
    marginRight: 0,
    [breakpoint.large]: {
      marginLeft: '7px',
    },
    [breakpoint.medium]: {
      marginLeft: '5px',
    },
    [breakpoint.small]: {
      marginLeft: '5px',
    },
  },
  buttonDeleteDisable: {
    color: 'white',
    backgroundColor: '#696969',
    '&:hover': {
      backgroundColor: '#696969',
      boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
    },
    marginLeft: '8px',
    marginRight: 0,
    [breakpoint.large]: {
      marginLeft: '7px',
    },
    [breakpoint.medium]: {
      marginLeft: '5px',
    },
    [breakpoint.small]: {
      marginLeft: '5px',
    },
  },
  titleHeader: {},
  buttonItem: {
    margin: 'auto',
    marginRight: 0,
  },
  buttonItemRole: {
    margin: 'auto',
    marginRight: 0,
    display: 'flex',
  },
  itemFormContent: {
    marginTop: '28px',
    [breakpoint.large]: {
      marginTop: '26px',
    },
    [breakpoint.medium]: {
      marginTop: '26px',
    },
    [breakpoint.small]: {
      marginTop: '19px',
    },
  },
  checkboxtable: {
    minHeight: '163px',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.16)',
    borderRadius: '8px',
    [breakpoint.large]: {
      minHeight: '142px',
    },
    [breakpoint.medium]: {
      minHeight: '134px',
    },
    [breakpoint.small]: {
      minHeight: '134px',
    },
  },
  TableComponent: {
    height: '342px',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.16)',
    borderRadius: '8px',
    [breakpoint.large]: {
      height: '336px',
    },
    [breakpoint.medium]: {
      height: '240px',
    },
    [breakpoint.small]: {
      height: '240px',
    },
  },
  TableAdditional: {
    height: '451px',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.16)',
    borderRadius: '8px',
    [breakpoint.large]: {
      height: '430px',
    },
    [breakpoint.medium]: {
      height: '338px',
    },
    [breakpoint.small]: {
      height: '338px',
    },
  },
  input: {
    fontWeight: 600,
    '&::placeholder': {
      ...textStyle.text3,
      color: '#bebebe',
      fontWeight: 100,
    },
    outline: 'none',
    border: '1px solid #f2f2f2',
    maxWidth: '100%',
    width: '360px',
    height: '44px',
    borderRadius: '6px',
    boxShadow: '0 2px 2px 0 rgba(13, 2, 2, 0.2)',
    '&:focus': {
      boxShadow: '0 0 0 4px #33313124',
    },
    padding: '2px 7px',
    margin: '3px',
    [breakpoint.large]: {
      width: '315px',
      height: '39px',
    },
    [breakpoint.medium]: {
      width: '240px',
      height: '29px',
    },
    [breakpoint.small]: {
      width: '240px',
      height: '29px',
    },
  },
  text: {
    ...textStyle.text5,
    fontSize: '21px',
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
  roleSearch: {
    width: '360px',
    height: '44px',
    marginRight: '17px',
    marginTop: '-4px',
    borderRadius: '6px',
    boxShadow: '0 2px 2px 0 rgba(13, 2, 2, 0.2)',
    border: '1px solid #f2f2f2',
    [breakpoint.large]: {
      marginRight: '15px',
      width: '315px',
      height: '39px',
    },
    [breakpoint.medium]: {
      marginTop: '-3px',
      marginRight: '11px',
      width: '240px',
      height: '29px',
    },
    [breakpoint.small]: {
      marginTop: '-3px',
      marginRight: '11px',
      width: '240px',
      height: '29px',
    },
  },
  checkboxRoot: {
    color: 'gray',
    '&$checked': {
      color: '#21a600',
    },
  },
  checked: {},
  cellInput: {
    marginTop: '26px',
    [breakpoint.large]: {
      marginTop: '24px',
    },
    [breakpoint.medium]: {
      marginTop: '26px',
    },
    [breakpoint.small]: {
      marginTop: '26px',
    },
  },
  textError: {
    ...textStyle.text6,
    color: '#E50012',
    [breakpoint.large]: {
      fontSize: '14px',
    },
    [breakpoint.medium]: {
      fontSize: '11px',
    },
    [breakpoint.small]: {
      fontSize: '11px',
    },
  },
});

export default additionalInformation;
