/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 08:59:19 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-19 14:52:31
 */
import { colorID, breakpoint, textStyle } from '../common';
const userForm = () => ({
  formRoot: {},
  root: {
    width: '100%',
    margin: '0 auto',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    margin: '30px',
    height: '95%',
    [breakpoint.large]: {
      margin: '26px',
    },
    [breakpoint.medium]: {
      margin: '20px',
    },
    [breakpoint.small]: {
      margin: '20px',
    },
  },
  text: {
    ...textStyle.text5,
    fontSize: '21px',
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
  textError: {
    ...textStyle.text6,
    color: colorID.red1,
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
  titleForm: {
    fontSize: '21px',
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
  buttonClose: {
    width: '100%',
    height: '88px',
    padding: '20px',
    backgroundColor: '#f2f2f2',
    [breakpoint.large]: {
      height: '76px',
      padding: '17px',
    },
    [breakpoint.medium]: {
      height: '62px',
      padding: '15px',
    },
    [breakpoint.small]: {
      height: '62px',
      padding: '15px',
    },
  },
  button: {
    outline: 'none',
    marginRight: '6px',
    marginTop: '-7px',
    borderRadius: '6px',
    color: 'black',
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
  buttonHeader: {
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
  buttonRegister: {
    backgroundColor: colorID.red1,
    color: colorID.white,
    '&:hover': {
      backgroundColor: colorID.red2,
      boxShadow: '0 0 0 4px #e5001254',
    },
    marginLeft: '8px',
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
  buttonClear: {
    '&:hover': {
      backgroundColor: colorID.gray4,
      boxShadow: '0 0 0 4px #7070707a',
    },
    marginLeft: '8px',
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
  form: {
    width: '100%',
    height: 'calc(100% - 50px)',
    position: 'relative',
    [breakpoint.large]: {
      height: 'calc(100% - 44px)',
    },
    [breakpoint.medium]: {
      height: 'calc(100% - 34px)',
    },
    [breakpoint.small]: {
      height: 'calc(100% - 34px)',
    },
  },
  formContent: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden scroll',
    height: 'calc(100% - 90px)',
    '&::-webkit-scrollbar': {
      width: '10px',
      height: '0px',
    },
    '&::-moz-scrollbar': {
      width: '10px',
      height: '0px',
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
      height: 'calc(100% - 70px)',
      '&::-webkit-scrollbar': {
        width: '9px',
        height: '0px',
      },
      '&::-moz-scrollbar': {
        width: '9px',
        height: '0px',
      },
    },
    [breakpoint.medium]: {
      height: 'calc(100% - 46px)',
      '&::-webkit-scrollbar': {
        width: '7px',
        height: '0px',
      },
      '&::-moz-scrollbar': {
        width: '7px',
        height: '0px',
      },
    },
    [breakpoint.small]: {
      height: 'calc(100% - 46px)',
      '&::-webkit-scrollbar': {
        width: '7px',
        height: '0px',
      },
      '&::-moz-scrollbar': {
        width: '7px',
        height: '0px',
      },
    },
  },
  fieldError: {
    marginTop: '0px',
  },
  input: {
    fontWeight: 600,
    '&::placeholder': {
      ...textStyle.text3,
      color: '#bebebe',
      fontWeight: 100,
    },
    textIndent: '16px',
    position: 'relative',
    border: '1px solid #f2f2f2',
    maxWidth: '100%',
    width: '360px',
    height: '44px',
    borderRadius: '6px',
    outline: 'none',
    boxShadow: '0 2px 2px 0 rgba(13, 2, 2, 0.2)',
    '&:focus': {
      boxShadow: '0 0 0 4px #33313124',
    },
    [breakpoint.large]: {
      height: '39px',
      width: '315px',
      textIndent: '14px',
    },
    [breakpoint.medium]: {
      height: '29px',
      width: '241px',
      textIndent: '11px',
    },
    [breakpoint.small]: {
      height: '29px',
      width: '241px',
      textIndent: '11px',
    },
  },
  inputDate: {
    boxShadow: '0 2px 2px 0 rgba(13, 2, 2, 0.2)',
    textIndent: '6px',
    position: 'relative',
    border: '1px solid #f2f2f2',
    maxWidth: '100%',
    width: '360px',
    height: '44px',
    borderRadius: '6px',
    outline: 'none',
    fontWeight: 600,
    '&:focus': {
      boxShadow: '0 0 0 4px #33313124',
    },
    [breakpoint.large]: {
      height: '39px',
      width: '315px',
      textIndent: '5px',
    },
    [breakpoint.medium]: {
      height: '29px',
      width: '241px',
      textIndent: '4px',
    },
    [breakpoint.small]: {
      height: '29px',
      width: '241px',
      textIndent: '4px',
    },
  },
  inputGender: {
    fontWeight: 750,
    position: 'relative',
    border: '1px solid #f2f2f2',
    maxWidth: '100%',
    width: '360px',
    height: '44px',
    borderRadius: '6px',
    outline: 'none',
    boxShadow: '0 2px 2px 0 rgba(13, 2, 2, 0.2)',
    '&:focus': {
      boxShadow: '0 0 0 4px #33313124',
    },
    [breakpoint.large]: {
      height: '39px',
      width: '315px',
    },
    [breakpoint.medium]: {
      height: '29px',
      width: '241px',
    },
    [breakpoint.small]: {
      height: '29px',
      width: '241px',
    },
  },
  itemForm: {
    width: '100%',
    height: '100%',
  },
  borderForm: {
    borderTop: '1px solid #3331314f',
    padding: '26px 160px',
    [breakpoint.large]: {
      padding: '23px 140px',
    },
    [breakpoint.medium]: {
      padding: '18px 107px',
    },
    [breakpoint.small]: {
      padding: '18px 107px',
    },
  },
  personal: {
    padding: '26px 160px 0px 160px',
    [breakpoint.large]: {
      padding: '23px 140px 0px 140px',
    },
    [breakpoint.medium]: {
      padding: '18px 107px 0px 107px',
    },
    [breakpoint.small]: {
      padding: '18px 107px 0px 107px',
    },
  },
  itemFormContent: {
    display: 'flex',
    marginTop: '22px',

    [breakpoint.large]: {
      marginTop: '40px',
    },
    [breakpoint.medium]: {
      marginTop: '16px',
    },
    [breakpoint.small]: {
      marginTop: '16px',
    },
  },
  attachFile: {
    paddingTop: '37px',
    [breakpoint.large]: {
      paddingTop: '32px',
    },
    [breakpoint.medium]: {
      paddingTop: '25px',
    },
    [breakpoint.small]: {
      paddingTop: '25px',
    },
  },
  contentLeft: {
    width: '43%',
    marginRight: '14%',
  },
  contentRight: {
    width: '43%',
  },
  textField: {
    marginBottom: '23px',
    display: 'flex',
    height: '46px',
    [breakpoint.large]: {
      marginBottom: '23px',
      height: '44px',
    },
    [breakpoint.medium]: {
      height: '36px',
      marginBottom: '17px',
    },
    [breakpoint.small]: {
      height: '36px',
      marginBottom: '17px',
    },
  },
  fieldName: {
    width: '180px',
    marginTop: '9px',
    // ...textStyle.text5,
    fontSize: '21px',
    [breakpoint.large]: {
      width: '157px',
      fontSize: '18px',
      marginTop: '8px',
    },
    [breakpoint.medium]: {
      width: '120px',
      fontSize: '14px',
      marginTop: '7px',
    },
    [breakpoint.small]: {
      width: '120px',
      fontSize: '14px',
      marginTop: '7px',
    },
  },
  fieldInput: {
    margin: '0 auto',
    marginRight: '0',
  },
  areaCode: {
    margin: '0 auto',
    marginRight: '0',
    display: 'flex',
    boxShadow: '0 2px 5px 0 rgba(13, 2, 2, 0.2)',
    borderRadius: '6px',
    height: '44px',
    [breakpoint.large]: {
      height: '39px',
    },
    [breakpoint.medium]: {
      height: '29px',
    },
    [breakpoint.small]: {
      height: '29px',
    },
  },
  areaCodeSelect: {
    borderRight: 'solid 1px #f2f2f2',
  },
  textfieldName: {
    color: colorID.red1,
  },
  header: {
    display: 'flex',
  },
  buttonItem: {
    margin: 'auto',
    marginRight: 0,
    position: 'relative',
  },
  titleHeader: {},
  checkboxtable: {
    minHeight: '300px',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.16)',
    borderRadius: '8px',
  },
  buttonUpload: {
    color: colorID.white,
    position: 'absolute',
  },
  chooseImg: {
    opacity: '0',
    width: '144px',
    height: '48px',
    fontSize: '16px',
    '&:hover': {
      backgroundColor: colorID.red2,
      boxShadow: '0 0 0 4px #e5001254',
    },
    [breakpoint.large]: {
      width: '126px',
      height: '42px',
      fontSize: '14px',
    },
    [breakpoint.medium]: {
      width: '96.48px',
      height: '32.16px',
      fontSize: '12px',
    },
    [breakpoint.small]: {
      width: '96.48px',
      height: '32.16px',
      fontSize: '12px',
    },
  },
  images: {
    width: '365px',
    marginRight: '20px',
    '&:last-child': {
      marginRight: '0',
    },
    [breakpoint.large]: {
      width: '319px',
    },
    [breakpoint.medium]: {
      width: '223px',
    },
    [breakpoint.small]: {
      width: '223px',
    },
  },
  imageItem: {
    display: 'flex',
    marginBottom: '20px',
    width: '360px',
    [breakpoint.large]: {
      width: '319px',
    },
    [breakpoint.medium]: {
      width: '220px',
    },
    [breakpoint.small]: {
      width: '220px',
    },
  },
  imageItemConten: {
    width: 'calc(100% - 59px)',
    [breakpoint.large]: {
      width: 'calc(100% - 52px)',
    },
    [breakpoint.medium]: {
      width: 'calc(100% - 39px)',
    },
    [breakpoint.small]: {
      width: 'calc(100% - 39px)',
    },
  },
  imageItemButton: {
    width: '59px',
    [breakpoint.large]: {
      width: '52px',
    },
    [breakpoint.medium]: {
      width: '39px',
    },
    [breakpoint.small]: {
      width: '39px',
    },
  },
  imageItemButtonDownload: {
    width: '32px',
    height: '32px',
    minHeight: 0,
    minWidth: 0,
    padding: 0,
    backgroundColor: '#16a6bb',
    marginLeft: '16px',
    borderRadius: '5px',
    outline: 'none',
    '&:hover': {
      boxShadow: '0px 0px 2px 5px rgba(173, 168, 168, 0.42)',
      backgroundColor: '#b9b3b4',
    },
    [breakpoint.large]: {
      marginLeft: '14px',
      width: '28px',
      height: '28px',
    },
    [breakpoint.medium]: {
      marginLeft: '11px',
      width: '21px',
      height: '21px',
    },
    [breakpoint.small]: {
      marginLeft: '11px',
      width: '21px',
      height: '21px',
    },
  },
  imageItemButtonDelete: {
    marginTop: '16px',
    backgroundColor: colorID.red1,
    [breakpoint.large]: {
      marginTop: '14px',
    },
    [breakpoint.medium]: {
      marginTop: '11px',
    },
    [breakpoint.small]: {
      marginTop: '11px',
    },
  },
  imageButtonSize: {
    width: '18px',
    height: '18px',
    [breakpoint.large]: {
      width: '16px',
      height: '16px',
    },
    [breakpoint.medium]: {
      width: '12px',
      height: '12px',
      marginLeft: '-1px',
      marginTop: '-3px',
    },
    [breakpoint.small]: {
      width: '12px',
      height: '12px',
    },
  },
  imageSize: {
    width: '306px',
    height: '200px',
    objectFit: 'contain',
    [breakpoint.large]: {
      width: '268px',
      height: '191px',
    },
    [breakpoint.medium]: {
      width: '181px',
      height: '133px',
    },
    [breakpoint.small]: {
      width: '181px',
      height: '133px',
    },
  },
  txtInput: {
    '&:disabled': {
      cursor: 'not-allowed',
    },
    '&::placeholder': {
      color: '#bebebe',
      fontSize: '21px',
      paddingLeft: '16px',
    },
    boxShadow: '0 2px 2px 0 rgba(13, 2, 2, 0.2)',
    borderRadius: '6px',
    border: 'solid 1px #f2f2f2',
    width: '55%',
    height: '44px',
    outline: 'none',
    [breakpoint.large]: {
      height: '39px',
      '&::placeholder': {
        color: '#bebebe',
        fontSize: '18px',
        paddingLeft: '14px',
      },
    },
    [breakpoint.medium]: {
      height: '29px',
      '&::placeholder': {
        color: '#bebebe',
        fontSize: '14px',
        paddingLeft: '11px',
      },
    },
    [breakpoint.small]: {
      height: '29px',
      '&::placeholder': {
        color: '#bebebe',
        fontSize: '14px',
        paddingLeft: '11px',
      },
    },
  },
  txtareaCode: {
    width: '130px',
    height: '44px',
    borderRadius: '10px',
    outline: 'none',
    '&:focus': {
      boxShadow: '0 0 0 4px #33313124',
    },
    [breakpoint.large]: {
      height: '39px',
      width: '120px',
    },
    [breakpoint.medium]: {
      height: '29px',
      width: '95px',
    },
    [breakpoint.small]: {
      height: '29px',
      width: '95px',
    },
  },
  inputPhone: {
    fontWeight: 600,
    '&::placeholder': {
      color: '#bebebe',
      fontSize: '21px',
      fontWeight: 100,
    },
    textIndent: '16px',
    position: 'relative',
    maxWidth: '100%',
    width: '230px',
    height: '44px',
    borderRadius: '10px',
    outline: 'none',
    '&:focus': {
      boxShadow: '0 0 0 4px #33313124',
    },
    [breakpoint.large]: {
      height: '39px',
      width: '195px',
      textIndent: '14px',
      '&::placeholder': {
        fontSize: '18px',
      },
    },
    [breakpoint.medium]: {
      height: '29px',
      width: '145px',
      textIndent: '11px',
      '&::placeholder': {
        fontSize: '14px',
      },
    },
    [breakpoint.small]: {
      height: '29px',
      width: '145px',
      textIndent: '11px',
      '&::placeholder': {
        fontSize: '14px',
      },
    },
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

export default userForm;
