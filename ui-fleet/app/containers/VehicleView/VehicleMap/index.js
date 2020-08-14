/*
 * @Author: DatNT62 
 * @Date: 2018-11-13 09:04:31 
 * @Last Modified by:   DatNT62 
 * @Last Modified time: 2018-11-13 09:04:31 
 */
/**
 *
 * VehicleMap
 *
 */

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { withRouter } from 'react-router-dom';
import makeSelectVehicleMap from './selectors';
import { makeSelectVehicleView } from '../selectors';
import { makeSelectVehicleInfo } from '../CarInfoChart/selectors';
import reducer from './reducer';
import saga from './saga';

import {
  getAllMarkers,
  getTheLatestPoint,
  changeClassNameForNav,
} from './actions';
import { joinDeviceDataRoom, leaveDeviceDataRoom } from './socketAction';
import VehicleMap from './VehicleMap';

const mapStateToProps = createStructuredSelector({
  vehiclemap: makeSelectVehicleMap(),
  vehicleView: makeSelectVehicleView(),
  vehicleInfo: makeSelectVehicleInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleGetTheLatestPoint: vehicleId =>
      dispatch(getTheLatestPoint(vehicleId)),
    handleGetAllMarkers: vehicleId => dispatch(getAllMarkers(vehicleId)),
    changeClassNameForNav: className =>
      dispatch(changeClassNameForNav(className)),
    handleJoinDeviceDataRoom: id => dispatch(joinDeviceDataRoom(id)),
    handleleaveDeviceDataRoom: id => dispatch(leaveDeviceDataRoom(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'vehicleMap', reducer });
const withSaga = injectSaga({ key: 'vehicleMap', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withRouter,
)(VehicleMap);
