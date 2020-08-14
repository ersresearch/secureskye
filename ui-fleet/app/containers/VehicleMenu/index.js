/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:19:02 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 09:19:02 
 */
/**
 *
 * VehicleMenu
 *
 */

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

// import injectReducer from 'utils/injectReducer';
import {
  getEcuId,
  getVehicleAlertsFilterEcu,
  getClickButton,
  getAlertInfor,
} from 'containers/VehicleAlert/actions';
import makeSelectVehicleMenu from './selectors';
// import reducer from './reducer';
import { goToSoftwareUpdateDetail } from './actions';
import VehicleMenu from './VehicleMenu';
import { makeSelectMenuBar } from '../MenuBar/selectors';
import { getVehicleInfo } from '../VehicleInfo/actions';
import makeSelectVehicleInfo from '../VehicleInfo/selectors';

const mapStateToProps = createStructuredSelector({
  vehicleMenu: makeSelectVehicleMenu(),
  vehicleInfo: makeSelectVehicleInfo(),
  menuBar: makeSelectMenuBar(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetAlertInfor: data => dispatch(getAlertInfor(data)),
    onGetEcuId: ecuId => dispatch(getEcuId(ecuId)),
    onGetVehicleAlertsFilterEcu: ecuId =>
      dispatch(getVehicleAlertsFilterEcu(ecuId)),
    onGetVehicleInfo: vehicleId => dispatch(getVehicleInfo(vehicleId)),
    goToSoftwareUpdateDetail: () => dispatch(goToSoftwareUpdateDetail()),
    onGetClickButton: status => dispatch(getClickButton(status)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// const withReducer = injectReducer({ key: 'vehicleMenu', reducer });

export default compose(
  withRouter,
  // withReducer,
  withConnect,
)(VehicleMenu);
