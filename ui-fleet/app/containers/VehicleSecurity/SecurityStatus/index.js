/**
 *
 * SecurityStatus
 *
 */

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSecurityStatus from './selectors';
import reducer from './reducer';
import saga from './saga';
import SecurityStatus from './SecurityStatus';
import { getSecurityStatus } from './actions';

const mapStateToProps = createStructuredSelector({
  securityStatus: makeSelectSecurityStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetSecurityStatus: vehicleId => dispatch(getSecurityStatus(vehicleId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'securityStatus', reducer });
const withSaga = injectSaga({ key: 'securityStatus', saga });

export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(SecurityStatus);
