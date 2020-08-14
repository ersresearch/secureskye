/*
 * @Author: NhuHH 
 * @Date: 2018-11-14 11:39:14 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-11-20 18:58:22
 */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import { makeSelectUser } from '../selectors';
import UserList from './UserList';
import {
  getListUser,
  getUserInformationById,
  SelectRowId,
  displayDeleteDialog,
  deleteUserList,
  putApiActiveUser,
} from '../actions';

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListUser: () => dispatch(getListUser()),
    getUserInformationById: id => dispatch(getUserInformationById(id)),
    SelectRowId: id => dispatch(SelectRowId(id)),
    displayDeleteDialog: (id, name, enable, status) =>
      dispatch(displayDeleteDialog(id, name, enable, status)),
    deleteUserList: list => dispatch(deleteUserList(list)),
    putApiActiveUser: (userId, value) =>
      dispatch(putApiActiveUser(userId, value)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(UserList);
