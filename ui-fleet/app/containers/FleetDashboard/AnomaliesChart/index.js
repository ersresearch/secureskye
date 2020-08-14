/*
 * @Author: DatNT62 
 * @Date: 2018-11-13 09:00:43 
 * @Last Modified by:   DatNT62 
 * @Last Modified time: 2018-11-13 09:00:43 
 */
/**
 *
 * AnomaliesChart
 *
 */

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAnomaliesChart from './selectors';
import reducer from './reducer';
import saga from './saga';
import { changeDuration, getAnomalies } from './actions';
import AnomaliesChart from './AnomaliesChart';
import { joinNotificationRoom, leaveNotificationRoom } from './socketAction';

const mapStateToProps = createStructuredSelector({
  anomaliesChart: makeSelectAnomaliesChart(),
});

const mapDispatchToProps = dispatch => ({
  onChangeDuration: duration => dispatch(changeDuration(duration)),
  onGetAnomalies: duration => dispatch(getAnomalies(duration)),
  handleJoinNoticationRoom: () => dispatch(joinNotificationRoom()),
  handleLeaveNotificationRoom: () => dispatch(leaveNotificationRoom()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'anomaliesChart', reducer });
const withSaga = injectSaga({ key: 'anomaliesChart', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AnomaliesChart);
