/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:01:26 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 09:01:26 
 */
/**
 *
 * RiskLevelGaugeChart
 *
 */

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import makeSelectRiskLevelGaugeChart from './selectors';
import reducer from './reducer';
import { joinNotificationRoom, leaveNotificationRoom } from './socketAction';
import RiskLevelGaugeChart from './RiskLevelGaugeChart';
import { riskCurrentReset } from './actions';

const mapStateToProps = createStructuredSelector({
  risklevelgaugechart: makeSelectRiskLevelGaugeChart(),
  handleGaugeChart: makeSelectRiskLevelGaugeChart(),
});

function mapDispatchToProps(dispatch) {
  return {
    riskCurrentReset: () => dispatch(riskCurrentReset()),
    handleJoinNoticationRoom: () => dispatch(joinNotificationRoom()),
    handleLeaveNotificationRoom: () => dispatch(leaveNotificationRoom()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'riskLevelGaugeChart', reducer });

export default compose(
  withReducer,
  withConnect,
)(RiskLevelGaugeChart);
