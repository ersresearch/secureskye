const login = () => ({
  login_page: {
    backgroundSize: 'cover',
    width: '100%',
    height: '100%',
    position: 'fixed',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '200px',
  },
  block_login_page: {
    width: '320px',
    margin: '0 auto',
    position: 'relative',
    zIndex: '99',
  },
  container: {
    backgroundColor: '#242424',
    width: '300px',
    textAlign: 'center',
    border: '1px solid #B22222',
    borderRadius: '10px',
  },
  button: {
    width: '220px',
    color: 'white',
    backgroundColor: '#D8000F',
    marginTop: '20px',
    fontWeight: 'bold',
  },
  validation: {
    color: 'red',
    fontSize: '15px',
  },
  cssLabel: {
    '&$cssFocused': {
      color: 'white',
    },
  },
  cssFocused: {},
  cssUnderline: {
    width: '220px',
    fontSize: '12px',
    color: 'white',
    '&:before': {
      borderBottomColor: 'red',
    },
    '&:after': {
      borderBottomColor: 'red',
    },
  },
  txtText: {
    color: 'white',
  },
  logo: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '174px',
    marginBottom: '40px',
  },
});

export default login;
