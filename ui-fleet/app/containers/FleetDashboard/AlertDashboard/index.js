/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:00:05 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 09:00:05 
 */
/**
 *
 * AlertDashboard
 *
 */

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAlertDashboard from './selectors';
import reducer from './reducer';
// import saga from './saga';
import {
  getDataAlert,
  getAlertFilter,
  getCriticalFilter,
  getInformationFilter,
  goToVehicleList,
  goToVehicleSecurity,
  handleChangeButtonAlert,
  getClickButton,
} from './actions';
import { filterMarker } from '../Map/actions';
import { joinNotificationRoom, leaveNotificationRoom } from './socketAction';
import AlertDashboard from './AlertDashboard';

const mapStateToProps = createStructuredSelector({
  alertsDashboard: makeSelectAlertDashboard(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllAlert: () => dispatch(getDataAlert()),
    getAlertFilter: () => dispatch(getAlertFilter()),
    getCriticalFilter: () => dispatch(getCriticalFilter()),
    getInformationFilter: () => dispatch(getInformationFilter()),
    handleJoinNoticationRoom: () => dispatch(joinNotificationRoom()),
    handleLeaveNotificationRoom: () => dispatch(leaveNotificationRoom()),
    goToVehicleList: () => dispatch(goToVehicleList()),
    goToVehicleSecurity: () => dispatch(goToVehicleSecurity()),
    filterMarker: markers => dispatch(filterMarker(markers)),
    handleChangeButtonAlert: filter =>
      dispatch(handleChangeButtonAlert(filter)),
    getClickButton: (type, id) => dispatch(getClickButton(type, id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'alertDashboard', reducer });
// const withSaga = injectSaga({ key: 'alertDashboard', saga });

export default compose(
  withReducer,
  // withSaga,
  withConnect,
)(AlertDashboard);
