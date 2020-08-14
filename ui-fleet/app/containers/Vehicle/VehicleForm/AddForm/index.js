/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:12:41 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 09:12:41 
 */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

// import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectVehicle } from './../../selectors';
import reducer from './../../reducer';
import { addVehicle } from './../../actions';
import AddForm from './AddVehicle';

const mapStateToProps = createStructuredSelector({
  VehicleManagement: makeSelectVehicle(),
});

function mapDispatchToProps(dispatch) {
  return {
    onAddVehicle: data => dispatch(addVehicle(data)),
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
)(AddForm);
