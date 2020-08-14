/**
 *
 * VehicleStatusAlerts
 *
 */

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import injectReducer from 'utils/injectReducer';
import makeSelectLogin from './selectors';
// import reducer from './reducer';
import { getLogin, checkLoggedInUser } from './actions';
import Login from './Login';

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetLogin: (username, password) => dispatch(getLogin(username, password)),
    onCheckLoggedInUser: () => dispatch(checkLoggedInUser()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// const withReducer = injectReducer({ key: 'login', reducer });

export default compose(
  // withReducer,
  withConnect,
)(Login);
