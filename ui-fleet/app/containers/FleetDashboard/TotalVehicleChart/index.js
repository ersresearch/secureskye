/**
 *
 * TotalVehicleChart
 *
 */

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import makeSelectTotalVehicleChart from './selectors';
import reducer from './reducer';
import saga from './saga';
import TotalVehicleChart from './TotalVehicleChart';
import {
  joinVehicleOnlineStatisticRoom,
  leaveVehicleOnlineStatisticRoom,
} from './socketAction';
import { getTotalVehicle } from './actions';

const mapStateToProps = createStructuredSelector({
  totalVehicleChart: makeSelectTotalVehicleChart(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleGetTotalVehicle: () => dispatch(getTotalVehicle()),
    handleJoinVehicleOnlineStatisticRoom: () =>
      dispatch(joinVehicleOnlineStatisticRoom()),
    handleLeaveVehicleOnlineStatisticRoom: () =>
      dispatch(leaveVehicleOnlineStatisticRoom()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'totalVehicleChart', reducer });
const withSaga = injectSaga({ key: 'totalVehicleChart', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TotalVehicleChart);
