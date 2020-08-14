/**
 *
 * Alert
 *
 */

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { withRouter } from 'react-router-dom';
import { makeSelectVehicleInfo, makeSelectAlert } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { changeAlertStatus } from './actions';
import Alert from './Alert';

const mapStateToProps = createStructuredSelector({
  vehicleInfo: makeSelectVehicleInfo(),
  alert: makeSelectAlert(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    changeAlertStatus: status => dispatch(changeAlertStatus(status)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'alert', reducer });
const withSaga = injectSaga({ key: 'alert', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withRouter,
)(Alert);
