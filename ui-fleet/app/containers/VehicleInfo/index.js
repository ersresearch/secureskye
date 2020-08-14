import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import makeSelectVehicleInfo from './selectors';
import VehicleInfo from './VehicleInfo';
import { getVehicleInfo } from './actions';

const mapStateToProps = createStructuredSelector({
  vehicleInfo: makeSelectVehicleInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetVehicleInfo: vehicleId => dispatch(getVehicleInfo(vehicleId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(VehicleInfo);
