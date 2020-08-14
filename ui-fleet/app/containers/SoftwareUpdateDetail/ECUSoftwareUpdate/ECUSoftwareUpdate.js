/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 08:55:04 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-12 14:00:51
 */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import CardHeaderComponent from 'components/CardHeader';
import CheckStatusIcon from 'components/CheckIcon/Loadable';
import { DateFormat } from 'utils/timeStampUtil';
import AlertIcon from 'components/AlertIcon/Loadable';
import _isEmpty from 'lodash/isEmpty';
import _isUndefined from 'lodash/isUndefined';
import {
  withStyles,
  Grid,
  Card,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Icon,
} from '@material-ui/core';
import { parseQuery } from 'utils/actionUtils';
import styles from 'styles/jss/containers/vehicleECUSoftwareUpdate';
import messages from './messages';
import {
  NA,
  SUCCESS,
  ERROR,
  INSTALLING,
  FEATURE,
  CURRENT,
  LATEST,
} from '../constants';

let DataECU = [];
export class ECUSoftwareUpdate extends React.PureComponent {
  componentWillMount() {
    const { handleJoinSoftwareVersionRoom, location } = this.props;
    const { id } = parseQuery(location.search);
    setTimeout(() => {
      handleJoinSoftwareVersionRoom(id);
    }, 3000);
  }
  handleUpdate = (softwareId, ecuId) => {
    this.props.getHandleUpdate(softwareId, ecuId);
  };

  btnSecure = data => {
    const { location } = this.props;
    const { id } = parseQuery(location.search);
    const { classes } = this.props;
    if (!_isUndefined(data.software)) {
      if (
        data.current.versionCode === data.software.latest.versionCode &&
        data.status === SUCCESS
      ) {
        const BtnStatus = () => (
          <span>
            <CheckStatusIcon type="check" className={classes.btnIcon} />
            <button className={`${classes.button} ${classes.buttonSuccess}`}>
              {<FormattedMessage {...messages.btnsuccess} />}
            </button>
          </span>
        );
        return <BtnStatus />;
      } else if (
        data.current.versionCode !== data.software.latest.versionCode &&
        data.status === SUCCESS
      ) {
        const BtnStatus = () => (
          <span>
            <CheckStatusIcon type="update" className={classes.btnIcon} />
            <button
              onClick={() => this.handleUpdate(data.software.id, id)}
              variant="contained"
              className={`${classes.button} ${classes.buttonUpdate}`}
            >
              {<FormattedMessage {...messages.buttonUpdate} />}
            </button>
          </span>
        );
        return <BtnStatus />;
      } else if (
        _isUndefined(data.current.versionCode) ||
        _isUndefined(data.software.latest.versionCode)
      ) {
        const BtnStatus = () => (
          <span className={classes.empty}>
            {<FormattedMessage {...messages.empty} />}
          </span>
        );
        return <BtnStatus />;
      }
    }
    if (data.status === ERROR) {
      const BtnStatus = () => (
        <span>
          <AlertIcon type="WARNING" size="large" className={classes.btnIcon} />
          <button
            variant="contained"
            className={`${classes.button} ${classes.buttonError}`}
          >
            {<FormattedMessage {...messages.btnerror} />}
          </button>
        </span>
      );
      return <BtnStatus />;
    }
    return null;
  };

  btnLoading = () => {
    const { classes } = this.props;
    const BtnLoading = () => (
      <span>
        <Icon className="iconUpdate"> cached </Icon>
        <button
          variant="contained"
          className={`${classes.button} ${classes.buttonUpdating}`}
        >
          {<FormattedMessage {...messages.btnupdating} />}
        </button>
      </span>
    );
    return <BtnLoading />;
  };
  displayItemRow = (data, type) => {
    const { classes } = this.props;
    switch (type) {
      case FEATURE:
        return !_isEmpty(data) ? (
          data.map(n => (
            <TableCell
              className={this.displayStyleRow(n.status)}
              classes={{ root: classes.tableFeatureRoot }}
              key={n.id}
            >
              {n.software ? n.software.name : NA}
            </TableCell>
          ))
        ) : (
          <TableCell />
        );
      case CURRENT:
        return !_isEmpty(data) ? (
          data.map(n => (
            <TableCell
              className={this.displayStyleRow(n.status)}
              classes={{
                root: classes.tableCellRoot,
              }}
              key={n.id}
            >
              <span className={classes.dateInfor}>
                {n.currentdate === '' ? (
                  <span className={classes.empty}>
                    {<FormattedMessage {...messages.empty} />}
                  </span>
                ) : (
                  DateFormat(n.current.availableSince)
                )}
              </span>
              <br />
              <span className={classes.versionInfor}>
                {n.current.versionName || NA}
              </span>
            </TableCell>
          ))
        ) : (
          <TableCell />
        );
      case LATEST:
        return !_isEmpty(data) ? (
          data.map(n => (
            <TableCell
              className={this.displayStyleRow(n.status)}
              classes={{
                root: classes.tableCellRoot,
              }}
              key={n.id}
            >
              <span className={classes.dateInfor}>
                {n.software ? (
                  DateFormat(n.software.latest.availableSince)
                ) : (
                  <span className={classes.empty}>
                    {<FormattedMessage {...messages.empty} />}
                  </span>
                )}
              </span>
              <br />
              <span className={classes.versionInfor}>
                {n.software ? n.software.latest.versionName : NA}
              </span>
            </TableCell>
          ))
        ) : (
          <TableCell />
        );
      default:
        return null;
    }
  };
  displayStyleRow(status) {
    const { classes } = this.props;
    if (status === INSTALLING) {
      return classes.overlay;
    }
    return classes.current;
  }
  displayButtonUpdateAvailable(data) {
    const { classes } = this.props;
    return !_isEmpty(data) ? (
      data.map(item => (
        <TableCell
          key={item.id}
          className={this.displayStyleRow(item.status)}
          classes={{ root: classes.tableCellRoot }}
        >
          {item.status === INSTALLING
            ? this.btnLoading()
            : this.btnSecure(item)}
        </TableCell>
      ))
    ) : (
      <TableCell />
    );
  }
  updateData(index) {
    const { handleUpdateLicense } = this.props;
    const listDataCurrent = handleUpdateLicense.data.softwareInstallation;
    listDataCurrent.splice(index, 1, handleUpdateLicense.dataCurrent);
    return listDataCurrent;
  }

  componentWillUnmount() {
    this.props.resetData();
  }
  formatDataECUSoftware = () => {
    const { data, software } = this.props.handleUpdateLicense;
    const { softwareInstallation } = data;
    const DataFormat = [];
    if (
      !_isUndefined(softwareInstallation) &&
      !_isEmpty(softwareInstallation)
    ) {
      softwareInstallation.forEach(item => {
        if (!_isEmpty(software)) {
          software.forEach(element => {
            if (item.softwareId === element.id) {
              const soft = {
                ...item,
                software: element,
              };
              DataFormat.push(soft);
            }
          });
        } else {
          DataFormat.push(item);
        }
      });
    }
    return DataFormat;
  };
  render() {
    const { classes } = this.props;
    DataECU = this.formatDataECUSoftware();
    return (
      <Grid className={classes.root}>
        <Card className={classes.tableWrapper}>
          <CardHeaderComponent
            type="wifi"
            title={<FormattedMessage {...messages.title} />}
          />
          <div className={classes.table}>
            {!_isEmpty(DataECU) ? (
              <Table classes={{ root: classes.tableRoot }}>
                <TableBody>
                  <TableRow className={classes.tableRowFeature}>
                    <TableCell classes={{ root: classes.tableTitle }}>
                      <FormattedMessage {...messages.feature} />
                    </TableCell>
                    {this.displayItemRow(DataECU, FEATURE)}
                  </TableRow>
                  <TableRow className={classes.tableRowVersion}>
                    <TableCell
                      classes={{
                        root: classes.tableTitleRoot,
                      }}
                    >
                      <FormattedMessage {...messages.current} />
                    </TableCell>
                    {this.displayItemRow(DataECU, CURRENT)}
                  </TableRow>
                  <TableRow className={classes.tableRowVersion}>
                    <TableCell
                      classes={{
                        root: classes.tableTitleRoot,
                      }}
                    >
                      <FormattedMessage {...messages.latest} />
                    </TableCell>
                    {this.displayItemRow(DataECU, LATEST)}
                  </TableRow>
                  <TableRow className={classes.tableRowButton}>
                    <TableCell
                      classes={{
                        root: classes.tableTitleRoot,
                      }}
                    >
                      <div className={classes.textUpdate}>
                        <FormattedMessage {...messages.update} />
                      </div>
                    </TableCell>
                    {this.displayButtonUpdateAvailable(DataECU)}
                  </TableRow>
                </TableBody>
              </Table>
            ) : (
              <div className={`${classes.tableEmpty} ${classes.tableRoot}`}>
                No data
              </div>
            )}
          </div>
        </Card>
      </Grid>
    );
  }
}

ECUSoftwareUpdate.propTypes = {
  classes: PropTypes.object.isRequired,
  handleUpdateLicense: PropTypes.object.isRequired,
  handleJoinSoftwareVersionRoom: PropTypes.func.isRequired,
  getHandleUpdate: PropTypes.func.isRequired,
  resetData: PropTypes.func.isRequired,
  getDataSodtwareVersion: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default withStyles(styles)(ECUSoftwareUpdate);
