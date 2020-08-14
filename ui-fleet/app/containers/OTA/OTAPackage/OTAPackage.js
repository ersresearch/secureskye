/*
 * @Author: NhuHH 
 * @Date: 2018-11-28 07:56:27 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-19 15:09:54
 */
import React from 'react';
import PropTypes from 'prop-types';
// import qs from 'qs';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core';
import styles from 'styles/jss/containers/otaList';
import { ShowNotify } from 'utils/actionUtils';
import { DateFormatSoftware } from 'utils/timeStampUtil';
import { UrlPath } from 'commons/constants';
import PanelTitle from 'components/PanelTitle';
import Button from 'components/Button';
import AlertDialog from 'components/AlertDialog/Loadable';
import Table from 'components/Table';
import Loading from 'components/CircularProgress';
import messages from '../messages';

const maxNumber = 1;
export class OTAPackage extends React.PureComponent {
  componentDidMount() {
    this.props.getOTA();
  }
  componentWillUnmount() {
    this.props.handleStatusCheckList([]);
  }
  handleSelectOTA = (type, info) => {
    if (type !== 'checkbox') {
      this.props.handleSelectRowId(info.id);
    }
  };
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
  handleView = () => {
    const { selectedRow } = this.props.otaPackage;
    this.props.history.replace({
      pathname: `${UrlPath}/ota/view`,
      search: `?id=${selectedRow}`,
    });
  };
  handleUpdate = () => {
    const { statusCheck } = this.props.otaPackage;
    if (statusCheck.length === maxNumber) {
      this.props.history.replace({
        pathname: `${UrlPath}/ota/update`,
        search: `?id=${statusCheck[0]}`,
      });
    } else if (statusCheck.length < maxNumber) {
      ShowNotify('warning', 'Please selete a OTA');
    } else {
      ShowNotify('warning', 'Please choose one OTA only');
    }
  };
  handleCreate = () => {
    this.props.history.push(`${UrlPath}/ota/create`);
  };
  onClickButtonDelete = () => {
    const { statusCheck } = this.props.otaPackage;
    if (statusCheck.length >= maxNumber) {
      this.props.displayDeleteDialog(true);
    } else {
      ShowNotify('warning', 'Please select OTA to delete');
    }
  };
  cancelDelete = () => {
    this.props.displayDeleteDialog(false);
  };
  handleDelete = () => {
    const { statusCheck } = this.props.otaPackage;
    this.props.handleDeleteOTA(statusCheck);
    this.props.displayDeleteDialog(false);
  };
  render() {
    const { classes, otaPackage } = this.props;
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
      },
      {
        id: 'category',
        Header: (
          <PanelTitle
            title={<FormattedMessage {...messages.category} />}
            subtitle={4}
          />
        ),
        accessor: row => <span className={classes.text}>{row.category}</span>,
      },
      {
        id: 'family',
        Header: (
          <PanelTitle
            title={<FormattedMessage {...messages.family} />}
            subtitle={4}
          />
        ),
        accessor: row => <span className={classes.text}>{row.family}</span>,
      },
      {
        id: 'status',
        Header: (
          <PanelTitle
            title={<FormattedMessage {...messages.status} />}
            subtitle={4}
          />
        ),
        accessor: row => <span className={classes.text}>{row.status}</span>,
      },
      {
        id: 'date',
        Header: (
          <PanelTitle
            title={<FormattedMessage {...messages.date} />}
            subtitle={4}
          />
        ),
        accessor: row => (
          <span className={classes.text}>{DateFormatSoftware(row.date)}</span>
        ),
      },
      {
        id: 'action',
        Header: '',
        accessor: row =>
          otaPackage.selectedRow === row.id ? (
            <Button
              className={classes.buttonView}
              variant="primary"
              onClick={() => this.handleView()}
            >
              {<FormattedMessage {...messages.buttonView} />}
            </Button>
          ) : null,
      },
    ];
    return (
      <React.Fragment>
        {otaPackage.isLoading && this.displayLoading()}
        <div className={classes.header}>
          <Button variant="primary" onClick={() => this.handleCreate()}>
            <FormattedMessage {...messages.buttonAdd} />
          </Button>
          <Button variant="primary" onClick={() => this.handleUpdate()}>
            {<FormattedMessage {...messages.buttonUpdate} />}
          </Button>
          <Button variant="primary" onClick={() => this.onClickButtonDelete()}>
            {<FormattedMessage {...messages.buttonDelete} />}
          </Button>
        </div>
        <Table
          data={otaPackage.data ? otaPackage.data : []}
          columns={columns}
          statusCheck={otaPackage.statusCheck}
          handleChangeColumn={this.handleSelectOTA}
          handleStatusCheck={this.props.handleStatusCheckList}
          selectedRow={otaPackage.selectedRow}
          checkboxTable
        />
        <AlertDialog
          check={otaPackage.alertDialogStatus}
          type="confirmation"
          title={<FormattedMessage {...messages.dialogTitle} />}
          description={<FormattedMessage {...messages.dialogDes} />}
          handleDelete={() => this.handleDelete()}
          cancleDelete={() => this.cancelDelete()}
        />
      </React.Fragment>
    );
  }
}

OTAPackage.propTypes = {
  classes: PropTypes.object.isRequired,
  otaPackage: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  handleStatusCheckList: PropTypes.func.isRequired,
  displayDeleteDialog: PropTypes.func.isRequired,
  handleDeleteOTA: PropTypes.func.isRequired,
  getOTA: PropTypes.func.isRequired,
  handleSelectRowId: PropTypes.func,
};

export default withStyles(styles)(OTAPackage);
