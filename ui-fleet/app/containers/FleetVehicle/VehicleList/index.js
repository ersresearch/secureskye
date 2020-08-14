import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import injectReducer from 'utils/injectReducer';
import { getVehicleInfo } from 'containers/VehicleInfo/actions';
import { getVehicles, selectedRow } from 'containers/Vehicle/actions';
import { makeSelectVehicle } from 'containers/Vehicle/selectors';
import { getDataEcu } from 'containers/VehicleAlert/actions';
import makeSelectVehicleList from './selectors';
import reducer from './reducer';
import VehicleList from './VehicleList';
import { changeFilterVehicle, changeSearchVehicle } from './actions';

const mapStateToProps = createStructuredSelector({
  vehicleList: makeSelectVehicleList(),
  vehicleManagement: makeSelectVehicle(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetVehicles: params => dispatch(getVehicles(params)),
    onGetVehicleInfo: vehicleId => dispatch(getVehicleInfo(vehicleId)),
    onChangeSearchVehicle: value => dispatch(changeSearchVehicle(value)),
    onChangeFilterVehicle: index => dispatch(changeFilterVehicle(index)),
    onSelectedRow: index => dispatch(selectedRow(index)),
    getDataEcu: id => dispatch(getDataEcu(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'vehicleList', reducer });

export default compose(
  withReducer,
  withConnect,
  withRouter,
)(VehicleList);
