/*
 * @Author: NhuHH 
 * @Date: 2018-11-15 11:30:54 
 * @Last Modified by: LoiDT2
 * @Last Modified time: 2018-11-23 10:24:40
 */
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core';
import styles from 'styles/jss/containers/userForm';
import UserForm from './UserForm';
import {
  getUserInformationById,
  getUserUpdate,
  postCreateUser,
  getRoles,
} from './../actions';
import { makeSelectUser } from '../selectors';
import { makeAdditionalInformation } from './AdditionalInformation/selectors';
import { makeAttachmentInformation } from './AttachFile/selectors';
import { makeRoleInformation } from './RoleInformation/selectors';

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  additional: makeAdditionalInformation(),
  role: makeRoleInformation(),
  attachment: makeAttachmentInformation(),
});
function mapDispatchToProps(dispatch) {
  return {
    getUserInformationById: id => dispatch(getUserInformationById(id)),
    getUserUpdate: (userId, data) => dispatch(getUserUpdate(userId, data)),
    postCreateUser: data => dispatch(postCreateUser(data)),
    getRoles: () => dispatch(getRoles()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
  withStyles(styles),
)(UserForm);
