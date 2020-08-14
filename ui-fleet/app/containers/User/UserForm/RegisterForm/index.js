/*
 * @Author: NhuHH 
 * @Date: 2018-11-14 11:38:32 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-18 11:18:27
 */
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import RegisterForm from './RegisterForm';
import { getUserInformationById, getUserInfo } from './../../actions';
import { makeSelectUser } from '../../selectors';
import { resetDataAdd } from '../AdditionalInformation/actions';
import { resetDataAttachFile } from '../AttachFile/actions';
import { resetDataRole } from '../RoleInformation/actions';
import { makeAdditionalInformation } from '../AdditionalInformation/selectors';
import { makeRoleInformation } from '../RoleInformation/selectors';
import { makeAttachmentInformation } from '../AttachFile/selectors';

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  addInfor: makeAdditionalInformation(),
  role: makeRoleInformation(),
  attach: makeAttachmentInformation(),
});
function mapDispatchToProps(dispatch) {
  return {
    resetDataAdd: data => dispatch(resetDataAdd(data)),
    resetDataAttachFile: data => dispatch(resetDataAttachFile(data)),
    resetDataRole: data => dispatch(resetDataRole(data)),
    getUserInformationById: userId => dispatch(getUserInformationById(userId)),
    getUserInfo: data => dispatch(getUserInfo(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(RegisterForm);
