import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import makeSelectFleetDashboard from './selectors';
import reducer from './reducer';
import FleetDashboard from './FleetDashboard';

const mapStateToProps = createStructuredSelector({
  fleetdashboard: makeSelectFleetDashboard(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'fleetDashboard', reducer });

export default compose(
  withReducer,
  withConnect,
)(FleetDashboard);
