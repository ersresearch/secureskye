/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 08:51:49 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-04 09:22:02
 */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import makeSelectVehicleSoftwareUpdate from './selectors';
import { getData, changeStatusModal } from './action';
import VehicleSoftwareUpdate from './VehicleSoftwareUpdate';

const mapStateToProps = createStructuredSelector({
  VehicleSWUpdate: makeSelectVehicleSoftwareUpdate(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getData: vehicleID => dispatch(getData(vehicleID)),
    changeStatusModal: status => dispatch(changeStatusModal(status)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(VehicleSoftwareUpdate);
