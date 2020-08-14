import { breakpoint, colorID, textStyle } from '../common';

const roleForm = () => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: '0',
  },
  panels: {
    height: '95%',
    width: '100%',
    padding: '30px',
    minHeight: '0',
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
  card: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    padding: 0,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '0',
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  wrapperForm: {
    overflow: 'auto',
  },
  wrapperBtn: {
    backgroundColor: colorID.gray1,
    display: 'flex',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
  btnSave: {
    color: '#ffffff',
    backgroundColor: '#d10010',
  },
  btnCancel: {
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  wrapperContent: {
    width: '85%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 0',
    [breakpoint.small]: {
      padding: '16px 0',
    },
    [breakpoint.medium]: {
      padding: '16px 0',
    },
    [breakpoint.large]: {
      padding: '20px 0',
    },
  },
  detail: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: '12%',
  },
  wrapperInput: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '45%',
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
  panelTitle: {
    margin: 'auto 0',
  },
  inputField: {
    width: '360px',
    height: '44px',
    margin: 'auto 0',
    [breakpoint.small]: {
      width: '240px',
      height: '29px',
    },
    [breakpoint.medium]: {
      width: '240px',
      height: '29px',
    },
    [breakpoint.large]: {
      width: '315px',
      height: '39px',
    },
  },
  inputFieldSelect: {
    marginTop: 0,
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
    width: '360px',
    height: '44px',
    outline: 'none',
    [breakpoint.large]: {
      height: '39px',
      width: '315px',
      '&::placeholder': {
        color: '#bebebe',
        fontSize: '18px',
        paddingLeft: '14px',
      },
    },
    [breakpoint.medium]: {
      height: '29px',
      width: '240px',
      '&::placeholder': {
        color: '#bebebe',
        fontSize: '14px',
        paddingLeft: '11px',
      },
    },
    [breakpoint.small]: {
      height: '29px',
      width: '240px',
      '&::placeholder': {
        color: '#bebebe',
        fontSize: '14px',
        paddingLeft: '11px',
      },
    },
  },
  userHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  wrapperSelect: {
    display: 'flex',
    margin: 'auto 0',
    '& > *': {
      marginLeft: '15px',
      [breakpoint.small]: {
        marginLeft: '10px',
      },
      [breakpoint.medium]: {
        marginLeft: '10px',
      },
      [breakpoint.large]: {
        marginLeft: '13px',
      },
    },
  },
  tableDetail: {
    marginTop: '18px',
    display: 'flex',
    flex: 1,
    border: '1px solid #f2f2f2',
    boxShadow: '0 2px 2px 0 rgba(13, 2, 2, 0.2)',
    borderRadius: '6px',
    minHeight: 0,
    overflow: 'auto',
    [breakpoint.small]: {
      marginTop: '12px',
    },
    [breakpoint.medium]: {
      marginTop: '12px',
    },
    [breakpoint.large]: {
      marginTop: '15px',
    },
  },
  authConfig: {
    height: '42%',
  },
  userList: {
    height: '35%',
  },
  formContainer: {
    height: '100%',
    position: 'relative',
  },
  naValue: {
    width: '48px',
    height: '48px',
    display: 'flex',
  },
  text: {
    ...textStyle.text3,
    margin: 'auto',
  },
  buttonDeleteDisable: {
    color: 'white',
    backgroundColor: '#696969',
    '&:hover': {
      backgroundColor: '#696969',
      boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
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

export default roleForm;
