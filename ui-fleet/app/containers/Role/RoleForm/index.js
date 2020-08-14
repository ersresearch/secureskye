import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import RoleForm from './RoleForm';
import {
  getRoleByID,
  resetRoleDetail,
  changeUsersList,
  changeUserChecked,
  changeAuthoritiesList,
  resetInitData,
} from '../actions';
import makeSelectRole from '../selectors';

const mapStateToProps = createStructuredSelector({
  role: makeSelectRole(),
});

function mapDispatchToProps(dispatch) {
  return {
    getRoleByID: id => dispatch(getRoleByID(id)),
    onResetRoleDetail: () => dispatch(resetRoleDetail()),
    onChangeUsersList: data => dispatch(changeUsersList(data)),
    onChangeUserChecked: list => dispatch(changeUserChecked(list)),
    onChangeAuthoritiesList: authList =>
      dispatch(changeAuthoritiesList(authList)),
    onResetInitData: data => dispatch(resetInitData(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(RoleForm);
