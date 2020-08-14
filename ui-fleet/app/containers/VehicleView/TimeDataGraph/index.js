/**
 *
 * TimeDataGraph
 *
 */

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { withTheme } from '@material-ui/core/styles';

import injectSaga from 'utils/injectSaga';
import { withRouter } from 'react-router-dom';
import injectReducer from 'utils/injectReducer';
import { makeSelectTimeDataGraph, makeSelectVehicleInfo } from './selectors';
import { makeSelectVehicleView } from '../selectors';
import reducer from './reducer';
import saga from './saga';

import {
  handleChangeTab,
  handleChangeDuration,
  getDataSpeed,
  getDataRpm,
  getDataSpeedFilter,
  getDataRpmFilter,
} from './actions';
import { joinNotificationRoom, leaveNotificationRoom } from './socketAction';

import TimeDataGraph from './TimeDataGraph';

const mapStateToProps = createStructuredSelector({
  timedatagraph: makeSelectTimeDataGraph(),
  vehicleView: makeSelectVehicleView(),
  vehicleInfo: makeSelectVehicleInfo(),
});

const mapDispatchToProps = dispatch => ({
  handleChangeTab: bindActionCreators(handleChangeTab, dispatch),
  handleChangeDuration: bindActionCreators(handleChangeDuration, dispatch),
  getDataSpeed: (vehicleId, timestamp) =>
    dispatch(getDataSpeed(vehicleId, timestamp)),
  getDataRpm: (vehicleId, timestamp) =>
    dispatch(getDataRpm(vehicleId, timestamp)),
  onGetDataSpeedFilter: (vehicleId, timestamp, timeSeriesOption) =>
    dispatch(getDataSpeedFilter(vehicleId, timestamp, timeSeriesOption)),
  onGetDataRpmFilter: (vehicleId, timestamp, timeSeriesOption) =>
    dispatch(getDataRpmFilter(vehicleId, timestamp, timeSeriesOption)),
  joinNotificationRoom: () => dispatch(joinNotificationRoom()),
  leaveNotificationRoom: () => dispatch(leaveNotificationRoom()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'timeDataGraph', reducer });
const withSaga = injectSaga({ key: 'timeDataGraph', saga });

export default compose(
  withTheme(),
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(TimeDataGraph);
