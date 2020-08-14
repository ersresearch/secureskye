/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 09:19:58 
 * @Last Modified by:   NhuHH 
 * @Last Modified time: 2018-11-13 09:19:58 
 */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

// import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// import { getDataMenu } from 'containers/VehicleMenu/actions';
import makeSelectVehicleSoftwareUpdate from 'containers/VehicleSoftwareUpdate/selectors';
import { getData as getDataALertEcu } from 'containers/VehicleSoftwareUpdate/action';
import makeSelectVehicleAlert from './selectors';
import reducer from './reducer';
// import saga from './saga';
import VehicleAlert from './VehicleAlert';
import { getDataEcu } from './actions';

const mapStateToProps = createStructuredSelector({
  vehicleAlert: makeSelectVehicleAlert(),
  ECUList: makeSelectVehicleSoftwareUpdate(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onGetDataAlertEcu: vehicleId => dispatch(getDataALertEcu(vehicleId)),
    onGetDataEcu: vehicleId => dispatch(getDataEcu(vehicleId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'vehicleAlert', reducer });
// const withSaga = injectSaga({ key: 'vehicleAlert', saga, mode: DAEMON });

export default compose(
  withReducer,
  // withSaga,
  withConnect,
)(VehicleAlert);
