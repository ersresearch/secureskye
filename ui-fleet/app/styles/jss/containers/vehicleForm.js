import { colorID, breakpoint } from '../common';
const vehicleForm = () => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    height: '100%',
    minHeight: '0',
  },
  panels: {
    height: '95%',
    width: '100%',
    padding: '30px',
    [breakpoint.small]: {
      padding: '20px',
    },
    [breakpoint.medium]: {
      padding: '20px',
    },
    [breakpoint.large]: {
      padding: '26px',
    },
  },
  container: {
    display: 'flex',
    width: '78%',
    height: '100%',
    flexDirection: 'column',
  },
  buttonRegister: {
    backgroundColor: colorID.red1,
    color: colorID.white,
    width: '100px',
    height: '40px',
    borderRadius: '6px',
    outline: 'none',
    fontSize: '18px',
    [breakpoint.large]: {
      width: '90px',
      fontSize: '16px',
    },
    [breakpoint.medium]: {
      fontSize: '13px',
      width: '77px',
      height: '35px',
    },
    [breakpoint.small]: {
      fontSize: '13px',
      width: '77px',
      height: '35px',
    },
    '&:focus': {
      boxShadow: '0 0 0 4px #e5001254',
    },
  },
  buttonRemove: {
    backgroundColor: colorID.gray2,
    color: colorID.white,
    borderRadius: '6px',
    outline: 'none',
    marginLeft: '8px',
    width: '100px',
    height: '40px',
    fontSize: '18px',
    [breakpoint.large]: {
      width: '90px',
      fontSize: '16px',
    },
    [breakpoint.medium]: {
      fontSize: '13px',
      width: '77px',
      height: '35px',
    },
    [breakpoint.small]: {
      fontSize: '13px',
      width: '77px',
      height: '35px',
    },
  },
  input: {
    border: '1px solid #3331314f',
    width: '100%',
    height: '40px',
    borderRadius: '10px',
    outline: 'none',
    '&:focus': {
      boxShadow: '0 0 0 4px #33313124',
    },
    [breakpoint.large]: {
      height: '35px',
    },
    [breakpoint.medium]: {
      height: '27px',
    },
    [breakpoint.small]: {
      height: '27px',
    },
  },
  fieldName: {
    width: '200px',
    margin: 'auto',
    [breakpoint.large]: {
      width: '177px',
      fontSize: '14px',
    },
    [breakpoint.medium]: {
      width: '140px',
      fontSize: '11px',
    },
    [breakpoint.small]: {
      width: '140px',
      fontSize: '11px',
    },
  },
  text: {
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
  wrapperVehicle: {
    display: 'flex',
    height: '100%',
  },
  txtSelect: {
    '&:disabled': {
      cursor: 'not-allowed',
    },
    '&::placeholder': {
      color: '#bebebe',
      fontSize: '21px',
      paddingLeft: '16px',
    },
    // paddingLeft: '10px',
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
  txtInput: {
    width: '55%',
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
  wrapperFormInfo: {
    width: '100%',
    display: 'flex',
    height: '100%',
  },
  wrapperForm: {
    display: 'flex',
    width: '100%',
    padding: '20px 30px 0 33px',
    [breakpoint.small]: {
      padding: '13px 20px 0 22px',
    },
    [breakpoint.medium]: {
      padding: '13px 20px 0 22px',
    },
    [breakpoint.large]: {
      padding: '18px 26px 0 29px',
    },
  },
  txtInfo: {
    fontSize: '21px',
    marginBottom: '4%',
    display: 'flex',
    justifyContent: 'space-between',
    width: '95%',
    [breakpoint.small]: {
      fontSize: '14px',
    },
    [breakpoint.medium]: {
      fontSize: '14px',
    },
    [breakpoint.large]: {
      fontSize: '18px',
    },
  },
  wrapperLeft: {
    position: 'relative',
    width: '50%',
  },
  wrapperRight: {
    position: 'relative',
    width: '50%',
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'column',
  },
  btnOn: {
    backgroundColor: '#D5E8D4',
    border: '1px solid #A9CC9A',
    marginLeft: '25%',
    marginTop: '-5%',
  },
  btnOff: {
    backgroundColor: '#F8CECC',
    border: '1px solid #D7928F',
    marginLeft: '25%',
    marginTop: '-5%',
  },
  parameterInfo: {
    display: 'flex',
    marginLeft: '30px',
    fontSize: '21px',
    marginTop: '-1%',
    [breakpoint.small]: {
      marginLeft: '20px',
      fontSize: '14px',
    },
    [breakpoint.medium]: {
      marginLeft: '20px',
      fontSize: '14px',
    },
    [breakpoint.large]: {
      marginLeft: '27px',
      fontSize: '18px',
    },
  },
  txtFuel: {
    display: 'flex',
  },
  txtOdo: {
    display: 'flex',
    marginLeft: '37%',
    [breakpoint.small]: {
      marginLeft: '25%',
    },
    [breakpoint.medium]: {
      marginLeft: '25%',
    },
    [breakpoint.large]: {
      marginLeft: '32%',
    },
  },
  OBDConfig: {
    display: 'flex',
    marginLeft: '30px',
    marginTop: '2%',
    fontSize: '21px',
    [breakpoint.small]: {
      fontSize: '14px',
      marginLeft: '20px',
    },
    [breakpoint.medium]: {
      fontSize: '14px',
      marginLeft: '20px',
    },
    [breakpoint.large]: {
      fontSize: '18px',
      marginLeft: '26px',
    },
  },
  cmbModel: {
    width: '51%',
  },
  addConfig: {
    marginTop: '3%',
  },
  selectDevice: {
    '&:disabled': {
      cursor: 'no-drop',
    },
    width: '55%',
    height: '44px',
    borderRadius: '6px',
    boxShadow: '0 2px 2px 0 rgba(13, 2, 2, 0.2)',
    border: 'solid 1px #f2f2f2',
    backgroundColor: '#ffffff',
    outline: 'none',
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
  selectModel: {
    '&:disabled': {
      cursor: 'no-drop',
    },
    width: '55%',
    height: '44px',
    borderRadius: '6px',
    boxShadow: '0 2px 2px 0 rgba(13, 2, 2, 0.2)',
    border: 'solid 1px #f2f2f2',
    backgroundColor: '#ffffff',
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
  imgCar: {
    width: '322px',
    height: '197px',
    marginTop: '30px',
    objectFit: 'contain',
    [breakpoint.small]: {
      width: '215px',
      height: '131px',
    },
    [breakpoint.medium]: {
      width: '215px',
      height: '131px',
    },
    [breakpoint.large]: {
      width: '282px',
      height: '170px',
    },
  },
  notChooseImg: {
    position: 'relative',
    width: '320px',
    height: '150px',
    backgroundColor: '#ffffff',
    [breakpoint.small]: {
      width: '215px',
      height: '131px',
    },
    [breakpoint.medium]: {
      width: '215px',
      height: '131px',
    },
    [breakpoint.large]: {
      width: '282px',
      height: '170px',
    },
  },
  txtChooseImg: {
    position: 'absolute',
    fontSize: '16px',
    transform: 'translate(-50%,70px)',
    [breakpoint.small]: {
      transform: 'translate(-50%,80%)',
      fontSize: '14px',
    },
    [breakpoint.medium]: {
      transform: 'translate(-50%,40px)',
      fontSize: '14px',
    },
    [breakpoint.large]: {
      transform: 'translate(-50%,55px)',
    },
  },
  updateBtnWrapper: {
    position: 'relative',
    top: '50px',
    left: '-50px',
  },
  chooseImg: {
    position: 'absolute',
    width: '90px',
    height: '40px',
    top: '0',
    opacity: '0',
  },
  btnUpload: {
    position: 'absolute',
    backgroundColor: '#F8CECC',
    border: '1px solid #D7928F',
  },
  btnSave: {
    fontWeight: 'bold',
    color: colorID.white,
    fontSize: '21px',
    position: 'absolute',
    right: '23.7%',
    top: '23%',
    width: '10%',
    height: '48px',
    textTransform: 'none',
    boxShadow: '0px 2px 2px rgba(0,0,0,0.3)',
    borderRadius: '6px',
    [breakpoint.small]: {
      height: '33px',
      fontSize: '14px',
    },
    [breakpoint.medium]: {
      height: '33px',
      fontSize: '14px',
    },
    [breakpoint.large]: {
      height: '44px',
      fontSize: '18px',
    },
    backgroundColor: '#d10010',
  },
  btnReset: {
    fontWeight: 'bold',
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    fontSize: '21px',
    right: '12.6%',
    top: '23%',
    width: '10%',
    height: '50px',
    boxShadow: '0px 2px 2px rgba(0,0,0,0.3)',
    textTransform: 'none',
    borderRadius: '6px',
    [breakpoint.small]: {
      height: '33px',
      fontSize: '14px',
    },
    [breakpoint.medium]: {
      height: '33px',
      fontSize: '14px',
    },
    [breakpoint.large]: {
      height: '44px',
      fontSize: '18px',
    },
  },
  btnCancle: {
    fontWeight: 'bold',
    position: 'absolute',
    right: '1.4%',
    top: '23%',
    fontSize: '21px',
    backgroundColor: '#FFFFFF',
    width: '10%',
    height: '50px',
    boxShadow: '0px 2px 2px rgba(0,0,0,0.3)',
    textTransform: 'none',
    borderRadius: '6px',
    [breakpoint.small]: {
      height: '33px',
      fontSize: '14px',
    },
    [breakpoint.medium]: {
      height: '33px',
      fontSize: '14px',
    },
    [breakpoint.large]: {
      height: '44px',
      fontSize: '18px',
    },
  },
  wrapperBtn: {
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
  formContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  btnToggle: {
    marginLeft: '130px',
  },
  toggleButton: {
    width: '88px',
    height: '36px',
    [breakpoint.small]: {
      width: '59px',
      height: '24px',
    },
    [breakpoint.medium]: {
      width: '59px',
      height: '24px',
    },
    [breakpoint.large]: {
      width: '77px',
      height: '32px',
    },
  },
  wrapperToggle: {
    width: '55%',
    display: 'flex',
  },
  overlay: {
    width: '100%',
    height: '100%',
    // borderRadius: '5px',
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: '1',
    cursor: 'pointer',
    position: 'absolute',
  },
  cardContent: {
    position: 'relative',
    flex: '1',
    padding: '0 0 0 0 ',
    width: '100%',
    height: '100%',
  },
  iconLoading: {
    height: '100%',
  },
  fuelCheckBox: {
    '&:disabled': {
      cursor: 'no-drop',
    },
    marginTop: '-8px',
    [breakpoint.small]: {
      marginTop: '-13px',
    },
    [breakpoint.medium]: {
      marginTop: '-13px',
    },
    [breakpoint.large]: {
      marginTop: '-9px',
    },
  },
  textfieldName: {
    color: colorID.red1,
  },
  txtColor: {
    width: '80px',
    height: '27px',
    [breakpoint.large]: {
      width: '70px',
      height: '24px',
    },
    [breakpoint.medium]: {
      width: '53px',
      height: '18px',
    },
    [breakpoint.small]: {
      width: '53px',
      height: '18px',
    },
  },
  wrapperColor: {
    width: '55%',
    display: 'flex',
  },
  txtTitle: {
    margin: 'auto 0',
  },
});

export default vehicleForm;
