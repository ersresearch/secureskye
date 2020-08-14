/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:13:20 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 09:13:20 
 */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

// import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectVehicle } from './../../selectors';
import reducer from './../../reducer';
import UpdateForm from './UpdateVehicle';
import { updateVehicle, upLoadImage } from './../../actions';

const mapStateToProps = createStructuredSelector({
  VehicleManagement: makeSelectVehicle(),
});

function mapDispatchToProps(dispatch) {
  return {
    onUpdateVehicle: (vehicleId, vehicleName) =>
      dispatch(updateVehicle(vehicleId, vehicleName)),
    onUploadImage: (vehicleId, file) => dispatch(upLoadImage(vehicleId, file)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'vehicle', reducer });
// const withSaga = injectSaga({ key: 'vehicle', saga });

export default compose(
  withReducer,
  //   withSaga,
  withConnect,
  withRouter,
)(UpdateForm);
