/*
 * @Author: DatNT62 
 * @Date: 2018-11-16 13:40:39 
 * @Last Modified by: DanND1
 * @Last Modified time: 2018-11-22 13:56:46
 */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import RoleList from './RoleList';
import makeSelectRole from '../selectors';
import {
  deleteRoleList,
  selectedRow,
  getAllRoles,
  deleteRoles,
  displayConfirmationDialog,
} from '../actions';

const mapStateToProps = createStructuredSelector({
  role: makeSelectRole(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllRoles: () => dispatch(getAllRoles()),
    onDeleteRoles: data => dispatch(deleteRoles(data)),
    deleteRoleList: list => dispatch(deleteRoleList(list)),
    onSelectedRow: index => dispatch(selectedRow(index)),
    onDisplayDialog: status => dispatch(displayConfirmationDialog(status)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(RoleList);
