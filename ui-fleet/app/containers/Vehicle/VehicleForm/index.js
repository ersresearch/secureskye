/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 10:01:49 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 10:01:49 
 */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import injectReducer from 'utils/injectReducer';
import { makeSelectVehicle } from './../selectors';
import reducer from './../reducer';
import vehicleForm from './VehicleForm';
import { getAllModel, getOBDConfigure } from './../actions';

const mapStateToProps = createStructuredSelector({
  VehicleManagement: makeSelectVehicle(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllModel: () => dispatch(getAllModel()),
    getOBDConfigure: () => dispatch(getOBDConfigure()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'vehicle', reducer });

export default compose(
  withReducer,
  withConnect,
  withRouter,
)(vehicleForm);
