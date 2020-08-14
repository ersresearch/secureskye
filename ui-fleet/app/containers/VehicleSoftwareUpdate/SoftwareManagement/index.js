/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 08:52:56 
 * @Last Modified by:   NhuHH 
 * @Last Modified time: 2018-11-13 08:52:56 
 */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import injectReducer from 'utils/injectReducer';
import makeSelectVehicleMenu from 'containers/VehicleMenu/selectors';
import makeSelectSoftwareManagement from './selectors';
import makeSelectVehicleSoftwareUpdate from '../selectors';
import reducer from './reducer';
import SoftwareManagement from './SoftwareManagement';
import {
  changeButtonFilter,
  changeDataFilter,
  getDataChild,
  getButtonId,
} from '../action';

const mapStateToProps = createStructuredSelector({
  SWManagement: makeSelectSoftwareManagement(),
  ECUList: makeSelectVehicleSoftwareUpdate(),
  vehicleMenu: makeSelectVehicleMenu(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    changeButtonFilter: filter => dispatch(changeButtonFilter(filter)),
    changeDataFilter: (data, type) => dispatch(changeDataFilter(data, type)),
    getDataChild: data => dispatch(getDataChild(data)),
    getButtonId: id => dispatch(getButtonId(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'softwareManagement', reducer });

export default compose(
  withReducer,
  withConnect,
  withRouter,
)(SoftwareManagement);
