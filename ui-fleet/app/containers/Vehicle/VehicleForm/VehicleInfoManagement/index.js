/**
 *
 * VehicleInfoManagement
 *
 */

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { withRouter } from 'react-router-dom';

import VehicleInfoManagement from './VehicleInfoManagement';
import { makeSelectVehicle } from './../../selectors';
import { changeImage } from './../../actions';

const mapStateToProps = createStructuredSelector({
  VehicleManagement: makeSelectVehicle(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeImage: (file, imageURL) => dispatch(changeImage(file, imageURL)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(VehicleInfoManagement);
