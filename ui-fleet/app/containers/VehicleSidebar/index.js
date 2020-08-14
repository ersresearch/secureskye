/**
 *
 * VehicleSidebar
 *
 */

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { withRouter } from 'react-router-dom';
import makeSelectVehicleSidebar from './selectors';
import reducer from './reducer';
import saga from './saga';
import { changeTabIndex } from './actions';
import VehicleSidebar from './VehicleSidebar';
import { getDataEcu } from '../VehicleAlert/actions';

const mapStateToProps = createStructuredSelector({
  vehicleSidebar: makeSelectVehicleSidebar(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeTabIndex: index => dispatch(changeTabIndex(index)),
    getDataEcu: vehicleId => dispatch(getDataEcu(vehicleId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'vehicleSidebar', reducer });
const withSaga = injectSaga({ key: 'vehicleSidebar', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withRouter,
)(VehicleSidebar);
