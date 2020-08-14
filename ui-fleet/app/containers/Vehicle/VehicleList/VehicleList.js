import React from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import { UrlPath } from 'commons/constants';
import { withStyles, Card, CardContent } from '@material-ui/core';
import styles from 'styles/jss/containers/vehicle';
import { ShowNotify } from 'utils/actionUtils';
import Table from 'components/Table';
import Button from 'components/Button';
import CardHeaderComponent from 'components/CardHeader';
import PanelTitle from 'components/PanelTitle';
import AlertDialog from 'components/AlertDialog/Loadable';
import Footer from 'components/Footer/index';
import { FormattedMessage } from 'react-intl';
import Loading from 'components/CircularProgress';
import messages from './../messages';
const maxNumber = 1;

export class VehicleList extends React.Component {
  componentDidMount() {
    const {
      vehicle,
      vehicleList,
      getAllVehicle,
      onChangeFilterVehicle,
    } = this.props;
    if (_isEmpty(vehicle.data) || vehicleList.filter !== 'DEFAULT') {
      getAllVehicle();
      onChangeFilterVehicle('DEFAULT');
    }
  }
  componentWillUnmount() {
    this.props.deleteVehicleList([]);
  }
  onClickButton(id) {
    this.props.onResetImage();
    this.props.history.replace({
      pathname: `${UrlPath}/vehicle`,
      search: `?id=${id}`,
    });
  }
  handleSelectVehicle = (colId, vehicle) => {
    const { onSelectedRow, onGetVehicleInfo, getDataEcu } = this.props;
    if (colId !== 'checkbox') {
      onSelectedRow(vehicle.id);
      onGetVehicleInfo(vehicle.id);
      getDataEcu(vehicle.id);
    }
  };
  handleDeleteVehicle() {
    const { statusCheck } = this.props.vehicle;
    this.props.deleteVehicle(statusCheck);
    this.props.displayDeleteDialog('', false);
    this.props.deleteVehicleList([]);
  }
  cancleDeleteVehicle() {
    this.props.displayDeleteDialog('', false);
  }
  onClickButtonDelete(id) {
    const { statusCheck } = this.props.vehicle;
    if (statusCheck.length >= maxNumber) {
      this.props.displayDeleteDialog(id, true);
    } else {
      ShowNotify('warning', 'Please select Vehicle to delete');
    }
  }
  onClickButtonUpdate() {
    const { statusCheck } = this.props.vehicle;
    if (statusCheck.length === maxNumber) {
      this.props.history.replace({
        pathname: `${UrlPath}/vehicle`,
        search: `?id=${statusCheck[0]}`,
      });
    } else if (statusCheck.length < maxNumber) {
      ShowNotify('warning', 'Please selete a Vehicle');
    } else {
      ShowNotify('warning', 'Please choose one Vehicle only');
    }
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
  displayButton() {
    const { classes } = this.props;
    return (
      <div className={classes.groupButton}>
        <Button
          variant="primary"
          onClick={() => this.onClickButton('register')}
        >
          <FormattedMessage {...messages.buttonAdd} />
        </Button>
        <Button variant="primary" onClick={() => this.onClickButtonUpdate()}>
          <FormattedMessage {...messages.buttonUpdate} />
        </Button>
        <Button variant="primary" onClick={() => this.onClickButtonDelete()}>
          <FormattedMessage {...messages.buttonRemove} />
        </Button>
      </div>
    );
  }
  displayHeader = title => (
    <PanelTitle
      title={<FormattedMessage {...messages[title]} />}
      subtitle={4}
    />
  );
  render() {
    const { classes, vehicle } = this.props;
    const columns = [
      {
        id: 'name',
        Header: this.displayHeader('name'),
        accessor: row => <span className={classes.text}>{row.name}</span>,
      },
      {
        id: 'vin',
        Header: this.displayHeader('vin'),
        accessor: row => <span className={classes.text}>{row.vin}</span>,
      },
      {
        id: 'make',
        Header: this.displayHeader('make'),
        accessor: row => <span className={classes.text}>{row.makerName}</span>,
      },
      {
        id: 'model',
        Header: this.displayHeader('model'),
        accessor: row => <span className={classes.text}>{row.modelName}</span>,
      },
      {
        id: 'color',
        Header: this.displayHeader('color'),
        accessor: row => (
          <div className={classes.wrapperColor}>
            <div
              style={{ backgroundColor: row.color }}
              className={classes.colorVehicle}
            />
          </div>
        ),
      },
      {
        id: 'body',
        Header: this.displayHeader('bodyType'),
        accessor: row => <span className={classes.text}>{row.bodyType}</span>,
      },
    ];
    const dataFormat = [];
    if (!_isEmpty(vehicle.data)) {
      vehicle.data.map(
        item => (item.deleted ? dataFormat : dataFormat.push(item)),
      );
    }
    return (
      <div className={classes.container}>
        <div className={classes.panels}>
          <Card className={classes.card}>
            <CardHeaderComponent
              type="list"
              title={<FormattedMessage {...messages.header} />}
            />
            <CardContent className={classes.cardContent}>
              {vehicle.isLoading && this.displayLoading()}
              {this.displayButton()}
              <div className={classes.ReactTable}>
                <Table
                  data={dataFormat}
                  columns={columns}
                  statusCheck={vehicle.statusCheck}
                  handleChangeColumn={this.handleSelectVehicle}
                  selectedRow={vehicle.selectedRow}
                  handleStatusCheck={this.props.deleteVehicleList}
                  checkboxTable
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
        <AlertDialog
          check={vehicle.alertDialogStatus}
          type="confirmation"
          title={<FormattedMessage {...messages.deleteDialogTitle} />}
          description={
            <FormattedMessage {...messages.deleteDialogDescription} />
          }
          handleDelete={() => this.handleDeleteVehicle()}
          cancleDelete={() => this.cancleDeleteVehicle()}
        />
      </div>
    );
  }
}

VehicleList.propTypes = {
  classes: PropTypes.object.isRequired,
  vehicle: PropTypes.object.isRequired,
  vehicleList: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onSelectedRow: PropTypes.func.isRequired,
  getAllVehicle: PropTypes.func.isRequired,
  onChangeFilterVehicle: PropTypes.func,
  onGetVehicleInfo: PropTypes.func.isRequired,
  deleteVehicle: PropTypes.func.isRequired,
  displayDeleteDialog: PropTypes.func.isRequired,
  onResetImage: PropTypes.func.isRequired,
  deleteVehicleList: PropTypes.func.isRequired,
  getDataEcu: PropTypes.func.isRequired,
};

export default withStyles(styles)(VehicleList);
