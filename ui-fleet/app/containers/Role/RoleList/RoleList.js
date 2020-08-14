/*
 * @Author: DatNT62 
 * @Date: 2018-11-16 13:40:50 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-19 15:02:28
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from 'components/Button';
import CardHeaderComponent from 'components/CardHeader';
import Table from 'components/Table';
import PanelTitle from 'components/PanelTitle';
import AlertDialog from 'components/AlertDialog';
import styles from 'styles/jss/containers/role';
import Loading from 'components/CircularProgress';
import { UrlPath } from 'commons/constants';
import { ShowNotify } from 'utils/actionUtils';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';
const maxNumber = 1;
class RoleList extends React.PureComponent {
  componentWillUnmount() {
    this.props.deleteRoleList([]);
  }
  componentDidMount() {
    this.props.getAllRoles();
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
  updateRole = () => {
    const { statusCheck } = this.props.role;
    if (statusCheck.length === maxNumber) {
      this.props.history.replace({
        pathname: `${UrlPath}/role/update`,
        search: `?id=${statusCheck[0]}`,
      });
    } else if (statusCheck.length < maxNumber) {
      ShowNotify('warning', 'Please selete a Role');
    } else {
      ShowNotify('warning', 'Please choose one Role only');
    }
  };
  createRole = () => {
    this.props.history.replace({
      pathname: `${UrlPath}/role/create`,
    });
  };

  deleteRole = () => {
    const { statusCheck } = this.props.role;
    if (statusCheck.length >= maxNumber) {
      this.props.onDisplayDialog(true);
    } else {
      ShowNotify('warning', 'Please select Role to delete');
    }
  };

  handleDeleteRoles = () => {
    const { statusCheck } = this.props.role;
    this.props.onDeleteRoles(statusCheck);
    this.props.onDisplayDialog(false);
    this.props.deleteRoleList([]);
  };

  cancleDeleteRoles = () => {
    this.props.onDisplayDialog(false);
  };

  handleSelectRole = (colId, role) => {
    const { onSelectedRow } = this.props;
    if (colId !== 'checkbox') {
      onSelectedRow(role.id);
    }
  };
  render() {
    const { classes, role } = this.props;
    const columns = [
      {
        id: 'name',
        Header: (
          <PanelTitle
            title={<FormattedMessage {...messages.name} />}
            subtitle={4}
          />
        ),
        accessor: row => <span className={classes.text}>{row.name}</span>,
        width: 400,
      },
      {
        id: 'description',
        Header: (
          <PanelTitle
            title={<FormattedMessage {...messages.description} />}
            subtitle={4}
          />
        ),
        accessor: row => (
          <span className={classes.text}>{row.description}</span>
        ),
      },
    ];
    return (
      <React.Fragment>
        <Card className={classes.card}>
          <CardHeaderComponent
            type="list"
            title={<FormattedMessage {...messages.header} />}
          />
          <CardContent className={classes.cardContent}>
          {role.isLoading && this.displayLoading()}
            <div className={classes.header}>
              <Button variant="primary" onClick={() => this.createRole()}>
                <FormattedMessage {...messages.add} />
              </Button>
              <Button variant="primary" onClick={() => this.updateRole()}>
                <FormattedMessage {...messages.update} />
              </Button>
              <Button variant="primary" onClick={() => this.deleteRole()}>
                <FormattedMessage {...messages.delete} />
              </Button>
            </div>
            <Table
              data={role.data}
              columns={columns}
              statusCheck={role.statusCheck}
              handleChangeColumn={this.handleSelectRole}
              selectedRow={role.selectedRow}
              handleStatusCheck={this.props.deleteRoleList}
              checkboxTable
            />
          </CardContent>
        </Card>
        <AlertDialog
          check={role.alertDialogStatus}
          type="confirmation"
          title={<FormattedMessage {...messages.deleteDialogTitle} />}
          description={
            <FormattedMessage {...messages.deleteDialogDescription} />
          }
          handleDelete={() => this.handleDeleteRoles()}
          cancleDelete={() => this.cancleDeleteRoles()}
        />
      </React.Fragment>
    );
  }
}

RoleList.propTypes = {
  getAllRoles: PropTypes.func,
  deleteRoleList: PropTypes.func,
  onSelectedRow: PropTypes.func,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
  role: PropTypes.object,
  onDeleteRoles: PropTypes.func,
  onDisplayDialog: PropTypes.func,
};

export default withStyles(styles)(RoleList);
