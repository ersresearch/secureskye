/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 09:31:56 
 * @Last Modified by:   NhuHH 
 * @Last Modified time: 2018-11-13 09:31:56 
 */
/**
 *
 * CarAlerts
 *
 */

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import injectReducer from 'utils/injectReducer';
import { getData as getDataEcu } from 'containers/VehicleSoftwareUpdate/action';

import { makeSelectCarAlerts } from './selectors';
import makeSelectVehicleAlert from '../selectors';
import reducer from './reducer';
import CarAlerts from './CarAlerts';
import {
  getVehicleAlertsList,
  getVehicleAlertsFilter,
  getData,
  getAlertInfor,
  getClickButton,
  getActiveAlert,
  changeFilterAlert,
  handleChangeToggle,
  getEcuId,
  getNormalFilter,
  changeCheckBox,
  getAlertEcu,
  resetCheckBox,
  ignoreAlert,
} from '../actions';

const mapStateToProps = createStructuredSelector({
  carAlerts: makeSelectCarAlerts(),
  vehicleAlert: makeSelectVehicleAlert(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetVehicleAlerts: id => dispatch(getVehicleAlertsList(id)),
    onGetData: data => dispatch(getData(data)),
    onGetAlertInfor: data => dispatch(getAlertInfor(data)),
    onGetClickButton: type => dispatch(getClickButton(type)),
    onGetActiveAlert: data => dispatch(getActiveAlert(data)),
    onChangeFilterAlert: index => dispatch(changeFilterAlert(index)),
    onhandleChangeToggle: open => dispatch(handleChangeToggle(open)),
    onGetVehicleAlertsFilter: (vehicleId, type) =>
      dispatch(getVehicleAlertsFilter(vehicleId, type)),
    onGetEcuId: ecuId => dispatch(getEcuId(ecuId)),
    onGetNormalFilter: vehicleId => dispatch(getNormalFilter(vehicleId)),
    onGetDataEcu: vehicleId => dispatch(getDataEcu(vehicleId)),
    onChangeCheckBox: () => dispatch(changeCheckBox()),
    onGetAlertEcu: data => dispatch(getAlertEcu(data)),
    onResetCheckBox: () => dispatch(resetCheckBox()),
    onIgnoreAlert: (alertId, vehicleId) =>
      dispatch(ignoreAlert(alertId, vehicleId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'carAlerts', reducer });

export default compose(
  withReducer,
  withConnect,
  withRouter,
)(CarAlerts);
