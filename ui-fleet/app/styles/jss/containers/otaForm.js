import { colorID, breakpoint, textStyle } from '../common';
const otaForm = () => ({
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
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  wrapperOTA: {
    width: '100%',
    height: '100%',
  },
  formContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  form: {
    width: '100%',
    height: '100%',
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
      margin: '0 8px',
      '&:last-child': {
        marginRight: '15px',
      },
      [breakpoint.small]: {
        margin: '0 5px',
      },
      [breakpoint.medium]: {
        margin: '0 5px',
      },
      [breakpoint.large]: {
        margin: '0 6px',
      },
    },
  },
  wrapperInput: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '43%',
    marginBottom: '2%',
  },
  textTitle: {
    fontSize: '21px',
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
  inputField: {
    width: '360px',
    height: '44px',
    margin: 'auto 0',
    marginTop: '-7px',
    [breakpoint.small]: {
      width: '240px',
      height: '29px',
      marginTop: '-5px',
    },
    [breakpoint.medium]: {
      width: '240px',
      height: '29px',
      marginTop: '-5px',
    },
    [breakpoint.large]: {
      width: '315px',
      height: '39px',
      marginTop: '-6px',
    },
  },
  textImportant: {
    color: 'red',
    fontSize: '21px',
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
  txtTextArea: {
    fontWeight: 800,
    ...textStyle.text2,
    '&:disabled': {
      cursor: 'not-allowed',
      backgroundColor: '#e5e5e5',
    },
    width: '1000px',
    height: '300px',
    borderRadius: '6px',
    boxShadow: '0 2px 2px 0 rgba(13, 2, 2, 0.2)',
    padding: '5px 0 0 15px',
    [breakpoint.small]: {
      fontSize: '14px',
      width: '750px',
      height: '200px',
    },
    [breakpoint.medium]: {
      fontSize: '14px',
      width: '750px',
      height: '200px',
    },
    [breakpoint.large]: {
      fontSize: '18px',
      width: '900px',
      height: '263px',
    },
  },
  formContent: {
    width: '100%',
    height: 'calc(100% - 34px)',
    display: 'flex',
    flexDirection: 'column',
  },
  otaForm: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    paddingTop: '30px',
    flex: '1',
    margin: '0 auto',
    [breakpoint.small]: {
      paddingTop: '20px',
    },
    [breakpoint.medium]: {
      paddingTop: '20px',
    },
    [breakpoint.large]: {
      paddingTop: '25px',
    },
  },
  otaInfo: {
    flex: '1',
    marginTop: '2%',
  },
  updateBtnWrapper: {
    position: 'relative',
    top: '-10px',
    left: '2%',
    [breakpoint.small]: {
      top: '-10px',
    },
    [breakpoint.medium]: {
      top: '-10px',
    },
    [breakpoint.large]: {
      top: '-6px',
    },
  },
  chooseImg: {
    position: 'absolute',
    width: '100%',
    height: '50px',
    top: '0',
    left: '0',
    opacity: '0',
  },
  wrapperUploadFile: {
    display: 'flex',
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

export default otaForm;
