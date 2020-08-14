/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:13:05 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-19 09:49:02
 */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

// import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectVehicle } from './../../selectors';
import reducer from './../../reducer';
import {
  changeStatusFuel,
  changeStatusOdo,
  changeImage,
  resetData,
  getVehicleById,
} from './../../actions';
import FormInfo from './FormInfo';

const mapStateToProps = createStructuredSelector({
  VehicleManagement: makeSelectVehicle(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeStatusFuel: status => dispatch(changeStatusFuel(status)),
    onChangeStatusOdo: status => dispatch(changeStatusOdo(status)),
    onChangeImage: (file, imageURL) => dispatch(changeImage(file, imageURL)),
    onResetData: () => dispatch(resetData()),
    onGetVehicleById: vehicleId => dispatch(getVehicleById(vehicleId)),
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
)(FormInfo);
