/**
 *
 * VehicleStatusAlerts
 *
 */

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectVehicleStatusAlerts from './selectors';
import { makeSelectVehicleView } from '../selectors';
import reducer from './reducer';
import saga from './saga';
import VehicleStatusAlerts from './VehicleStatusAlerts';
import { getComponentStatusAlerts } from './actions';
import { joinDeviceDataRoom, leaveDeviceDataRoom } from './socketAction';
import makeSelectVehicleInfo from '../../VehicleInfo/selectors';

const mapStateToProps = createStructuredSelector({
  vehicleStatusAlerts: makeSelectVehicleStatusAlerts(),
  vehicleInfo: makeSelectVehicleInfo(),
  vehicleView: makeSelectVehicleView(),
});

function mapDispatchToProps(dispatch) {
  return {
    getComponentStatusAlerts: vehicleId =>
      dispatch(getComponentStatusAlerts(vehicleId)),
    handleJoinDeviceDataRoom: vehicleId =>
      dispatch(joinDeviceDataRoom(vehicleId)),
    handleLeaveDeviceDataRoom: vehicleId =>
      dispatch(leaveDeviceDataRoom(vehicleId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'vehicleStatusAlerts', reducer });
const withSaga = injectSaga({ key: 'vehicleStatusAlerts', saga });

export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(VehicleStatusAlerts);
