/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:21:45 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 09:21:45 
 */
/**
 *
 * CarInfoChart
 *
 */

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { makeSelectCarInfoChart, makeSelectVehicleInfo } from './selectors';
import { makeSelectVehicleView } from '../selectors';
import reducer from './reducer';
import saga from './saga';
import { carInfoReset } from './actions';

import { joinNotificationRoom, leaveNotificationRoom } from './socketAction';
import CarInfoChart from './CarInfoChart';

const mapStateToProps = createStructuredSelector({
  carInfoChart: makeSelectCarInfoChart(),
  vehicleView: makeSelectVehicleView(),
  vehicleInfo: makeSelectVehicleInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    carInfoReset: () => dispatch(carInfoReset()),
    handleJoinNoticationRoom: id => dispatch(joinNotificationRoom(id)),
    handleLeaveNotificationRoom: id => dispatch(leaveNotificationRoom(id)),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'carInfoChart', reducer });
const withSaga = injectSaga({ key: 'carInfoChart', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CarInfoChart);
