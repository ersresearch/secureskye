/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 09:14:15 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-04 13:24:07
 */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { getVehicleInfo } from 'containers/VehicleInfo/actions';
import { changeFilterVehicle } from 'containers/FleetVehicle/VehicleList/actions';
import makeSelectVehicleList from 'containers/FleetVehicle/VehicleList/selectors';
import { getDataEcu } from 'containers/VehicleAlert/actions';
import { makeSelectVehicle } from './../selectors';
import VehicleList from './VehicleList';
import {
  getVehicles,
  selectedRow,
  deleteVehicle,
  displayDeleteDialog,
  resetImage,
  deleteVehicleList,
} from './../actions';

const mapStateToProps = createStructuredSelector({
  vehicle: makeSelectVehicle(),
  vehicleList: makeSelectVehicleList(),
});

function mapDispatchToProps(dispatch) {
  return {
    onResetImage: () => dispatch(resetImage()),
    onSelectedRow: index => dispatch(selectedRow(index)),
    onGetVehicleInfo: vehicleId => dispatch(getVehicleInfo(vehicleId)),
    getAllVehicle: filter => dispatch(getVehicles(filter)),
    onChangeFilterVehicle: filter => dispatch(changeFilterVehicle(filter)),
    deleteVehicle: id => dispatch(deleteVehicle(id)),
    displayDeleteDialog: (id, status) =>
      dispatch(displayDeleteDialog(id, status)),
    deleteVehicleList: list => dispatch(deleteVehicleList(list)),
    getDataEcu: id => dispatch(getDataEcu(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(VehicleList);
