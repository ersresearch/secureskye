import React from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import _isUndefined from 'lodash/isUndefined';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import styles from 'styles/jss/containers/roleForm';
import Button from 'components/Button';
import SearchBox from 'components/SearchBox';
import PanelTitle from 'components/PanelTitle';
import messages from 'containers/Role/messages';
import Table from 'components/Table';
import { ShowNotify } from 'utils/actionUtils';
import Chance from 'chance';

const chance = new Chance();
export class UserList extends React.PureComponent {
  handleChangeUser = value => {
    this.props.onSelectUser(value);
  };

  addUser = id => {
    const { user, role, onChangeUsersList } = this.props;
    const { usersList } = role;
    if (!_isUndefined(id)) {
      const userSelect = user.data.find(item => item.id === id);
      if (!usersList.find(item => item.id === userSelect.id)) {
        // eslint-disable-next-line no-underscore-dangle
        userSelect._id = chance.guid();
        usersList.push(userSelect);
        onChangeUsersList(usersList);
      } else {
        ShowNotify('warning', 'User is existed in the list');
      }
    } else {
      ShowNotify('warning', 'Please select a User to add');
    }
  };

  deleteUser = listChecked => {
    const { role, onChangeUsersList, onChangeUserChecked } = this.props;
    const { usersList } = role;
    if (!_isEmpty(listChecked)) {
      const removed = usersList.filter(
        obj => listChecked.indexOf(obj.id) === -1,
      );
      onChangeUsersList(removed);
      onChangeUserChecked([]);
    } else {
      ShowNotify('warning', 'Please select User to delete');
    }
  };

  componentDidMount() {
    const { user, onGetUsers, onInitSelectUser } = this.props;
    if (_isEmpty(user.data)) {
      onGetUsers();
    } else {
      onInitSelectUser(user.data);
    }
  }

  componentDidUpdate(prevProps) {
    const { user, onInitSelectUser } = this.props;
    if (user.data !== prevProps.user.data) {
      onInitSelectUser(user.data);
    }
  }

  componentWillUnmount() {
    this.props.onChangeUsersList([]);
    this.props.onSelectUser({});
  }

  render() {
    const { classes, role } = this.props;
    const columnsUser = [
      {
        id: '#',
        Header: <PanelTitle title="#" subtitle={4} />,
        Cell: row => row.index + 1,
        width: 80,
      },
      {
        id: 'user',
        Header: <PanelTitle title="User" subtitle={4} />,
        accessor: data => data.name,
      },
      {
        id: 'email',
        Header: <PanelTitle title="Email" subtitle={4} />,
        accessor: data => data.email,
      },
    ];
    return (
      <div className={`${classes.wrapperContent} ${classes.userList}`}>
        <div className={classes.userHeader}>
          <div className={classes.panelTitle}>
            <PanelTitle
              title={<FormattedMessage {...messages.userList} />}
              subtitle={2}
            />
          </div>
          <div className={classes.wrapperSelect}>
            <div
              className={`${classes.inputField} ${classes.inputFieldSelect}`}
            >
              <SearchBox
                className={classes.txtSelect}
                onChangeSelect={this.handleChangeUser}
                options={role.initSelectUser}
                placeholder="Type or Select Value"
              />
            </div>
            <Button
              onClick={() => this.addUser(role.selectedUser.value)}
              variant="primary"
            >
              <FormattedMessage {...messages.add} />
            </Button>
            <Button
              onClick={() => this.deleteUser(role.usersChecked)}
              variant="primary"
              className={
                _isEmpty(role.usersList) ? classes.buttonDeleteDisable : false
              }
            >
              <FormattedMessage {...messages.delete} />
            </Button>
          </div>
        </div>
        <div className={classes.tableDetail}>
          <Table
            data={role.usersList}
            columns={columnsUser}
            statusCheck={role.usersChecked}
            handleStatusCheck={this.props.onChangeUserChecked}
            showNoData={false}
            checkboxTable
          />
        </div>
      </div>
    );
  }
}

UserList.propTypes = {
  data: PropTypes.object,
  role: PropTypes.object,
  user: PropTypes.object,
  classes: PropTypes.object,
  onChangeUserChecked: PropTypes.func,
  onGetUsers: PropTypes.func,
  onInitSelectUser: PropTypes.func,
  onChangeUsersList: PropTypes.func,
  onSelectUser: PropTypes.func,
};

export default withStyles(styles)(UserList);
