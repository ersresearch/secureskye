import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectUser } from 'containers/User/selectors';
import {
  selectUser,
  changeUsersList,
  initSelectUser,
  changeUserChecked,
} from 'containers/Role/actions';
import makeSelectRole from 'containers/Role/selectors';
import { getListUser } from 'containers/User/actions';
import UserList from './UserList';

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  role: makeSelectRole(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeUserChecked: list => dispatch(changeUserChecked(list)),
    onGetUsers: () => dispatch(getListUser()),
    onSelectUser: data => dispatch(selectUser(data)),
    onChangeUsersList: data => dispatch(changeUsersList(data)),
    onInitSelectUser: data => dispatch(initSelectUser(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(UserList);
