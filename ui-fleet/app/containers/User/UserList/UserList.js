/*
 * @Author: NhuHH 
 * @Date: 2018-11-14 11:39:06 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-19 14:58:51
 */
import React from 'react';
import PropTypes from 'prop-types';
import { UrlPath } from 'commons/constants';

import { withStyles, Card, Checkbox } from '@material-ui/core';
import Button from 'components/Button';
import styles from 'styles/jss/containers/userList';
import CardHeaderComponent from 'components/CardHeader';
import Table from 'components/Table';
import AlertDialog from 'components/AlertDialog/Loadable';
import PanelTitle from 'components/PanelTitle';
import Tooltips from 'components/Tooltips';
import { FormattedMessage } from 'react-intl';
import { ShowNotify } from 'utils/actionUtils';
import Loading from 'components/CircularProgress';
import messages from './messages';
const maxNumber = 1;

export class UserList extends React.Component {
  componentDidMount() {
    this.props.getListUser();
  }
  componentWillUnmount() {
    this.props.deleteUserList([]);
  }
  onClickButtonAdd(id) {
    this.props.history.replace({
      pathname: `${UrlPath}/user`,
      search: `?id=${id}`,
    });
  }
  displayLoading = () => {
    const { classes } = this.props;
    return (
      <div className={classes.overlay}>
        <div className={classes.iconLoading}>
          <Loading />
        </div>
      </div>
    );
  };
  onClickButtonUpdate() {
    const { statusCheck } = this.props.user;
    if (statusCheck.length === maxNumber) {
      this.props.history.replace({
        pathname: `${UrlPath}/user`,
        search: `?id=${statusCheck[0]}`,
      });
    } else if (statusCheck.length < maxNumber) {
      ShowNotify('warning', 'Please selete a User');
    } else {
      ShowNotify('warning', 'Please choose one User only');
    }
  }
  handleSelectUser = (colId, row) => {
    if (colId !== 'checkbox') {
      this.props.SelectRowId(row.id);
    }
  };
  handleChangeEnabled = () => {
    const { activeUser } = this.props.user;
    this.props.putApiActiveUser(activeUser.id, activeUser.enable);
    this.props.displayDeleteDialog(null, null, null, false);
  };
  cancelChangeEnbled = () => {
    this.props.displayDeleteDialog(null, null, null, false);
  };
  onClickChangeEnabledButton = row => event => {
    this.props.displayDeleteDialog(
      row.id,
      row.name,
      event.target.checked,
      true,
    );
  };
  render() {
    const { classes, user } = this.props;
    const columns = [
      {
        id: 'username',
        Header: (
          <PanelTitle
            title={<FormattedMessage {...messages.username} />}
            subtitle={4}
          />
        ),
        accessor: row => <span className={classes.text}>{row.name}</span>,
      },
      {
        id: 'fullName',
        Header: (
          <PanelTitle
            title={<FormattedMessage {...messages.fullName} />}
            subtitle={4}
          />
        ),
        accessor: row => (
          <span className={classes.text}>{`${row.firstName} ${row.middleName ||
            ''} ${row.lastName}`}</span>
        ),
      },
      {
        id: 'role',
        Header: (
          <PanelTitle
            title={<FormattedMessage {...messages.role} />}
            subtitle={4}
          />
        ),
        accessor: row => (
          <span className={classes.text}>
            {row.roles ? row.roles[0].name : ''}
          </span>
        ),
      },
      {
        id: 'email',
        Header: (
          <PanelTitle
            title={<FormattedMessage {...messages.eamil} />}
            subtitle={4}
          />
        ),
        accessor: row => <span className={classes.text}>{row.email}</span>,
      },
      {
        id: 'phomeNumber',
        Header: (
          <PanelTitle
            title={<FormattedMessage {...messages.phomeNumber} />}
            subtitle={4}
          />
        ),
        accessor: row => (
          <span className={classes.text}>
            {row.phoneAreaCode}
            {row.phoneNumber}
          </span>
        ),
      },
      {
        id: 'active',
        Header: (
          <PanelTitle
            title={<FormattedMessage {...messages.active} />}
            subtitle={4}
          />
        ),
        accessor: row => (
          <Tooltips
            type="USER_MANAGEMENT"
            content={row.enabled}
            classes={{
              tooltipHover: classes.tooltipHover,
            }}
          >
            <Checkbox
              checked={row.enabled ? row.enabled : false}
              classes={{
                root: classes.checkboxRoot,
                checked: classes.checked,
              }}
              onChange={this.onClickChangeEnabledButton(row)}
              value="enabled"
            />
          </Tooltips>
        ),
      },
    ];
    return (
      <div className={classes.root}>
        <Card className={classes.container}>
          {user.isLoading && this.displayLoading()}
          <CardHeaderComponent
            type="list"
            title={<FormattedMessage {...messages.header} />}
          />
          <div className={classes.header}>
            <Button
              variant="primary"
              onClick={() => this.onClickButtonAdd('register')}
            >
              <FormattedMessage {...messages.buttonAdd} />
            </Button>
            <Button
              variant="primary"
              onClick={() => this.onClickButtonUpdate()}
            >
              {<FormattedMessage {...messages.buttonUpdate} />}
            </Button>
          </div>
          <div className={classes.ReactTable}>
            <Table
              data={user.data}
              columns={columns}
              statusCheck={user.statusCheck}
              handleChangeColumn={this.handleSelectUser}
              selectedRow={user.selectedRow}
              handleStatusCheck={this.props.deleteUserList}
              checkboxTable
            />
          </div>
          <AlertDialog
            check={user.alertDialogStatus}
            type="confirmation"
            title={`Change status of ${user.activeUser.name}`}
            description={
              <FormattedMessage {...messages.changeEnableUserDescription} />
            }
            handleDelete={() => this.handleChangeEnabled()}
            cancleDelete={() => this.cancelChangeEnbled()}
          />
        </Card>
      </div>
    );
  }
}

UserList.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  getListUser: PropTypes.func.isRequired,
  getUserInformationById: PropTypes.func.isRequired,
  SelectRowId: PropTypes.func.isRequired,
  deleteUserList: PropTypes.func.isRequired,
  displayDeleteDialog: PropTypes.func.isRequired,
  putApiActiveUser: PropTypes.func.isRequired,
};

export default withStyles(styles)(UserList);
