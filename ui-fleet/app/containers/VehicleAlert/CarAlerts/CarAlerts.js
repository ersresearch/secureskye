import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import _isUndefined from 'lodash/isUndefined';
import {
  withStyles,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Paper,
  Checkbox,
} from '@material-ui/core';
import moment from 'moment';
import CardHeader from 'components/CardHeader/Loadable';
import styles from 'styles/jss/containers/vehicleCarALerts';
import AlertIcon from 'components/AlertIcon/Loadable';
import { parseQuery } from 'utils/actionUtils';
import cachedIcon from 'assets/images/ic_cached.png';
import deleteIcon from 'assets/images/ic_delete.png';
import createIcon from 'assets/images/ic_create.png';
import messages from './messages';

export class VehicleAlert extends React.Component {
  componentDidMount() {
    this.props.onGetClickButton('ALL');
    this.props.onhandleChangeToggle(false);
    const { location } = this.props;
    const { id } = parseQuery(location.search);
    if (id) {
      this.props.onGetVehicleAlerts(id);
      this.props.onGetDataEcu(id);
    }
  }
  componentWillUnmount() {
    this.props.onResetCheckBox();
    this.props.onGetAlertInfor('');
    this.props.onGetEcuId('');
  }
  componentDidUpdate(prevProps) {
    const { carAlerts } = this.props;
    if (prevProps.carAlerts.checkBox !== carAlerts.checkBox) {
      this.handleDisplayAlertEcu();
    }
  }
  handleGetAlertEcu = () => {
    const { vehicleAlert, carAlerts } = this.props;
    const dataList = [];
    for (let i = 0; i < vehicleAlert.dataEcu.length; i += 1) {
      if (vehicleAlert.dataEcu[i].securityStatus !== 'NORMAL') {
        dataList.push(vehicleAlert.dataEcu[i]);
      }
    }
    if (!carAlerts.checkBox) {
      this.props.onGetAlertEcu(dataList);
    }
  };
  displayIcon(status, type) {
    const { classes, carAlerts } = this.props;
    switch (status) {
      case 'INFORMATION':
        if (type === 'btn') {
          return (
            <span className={classes.iconAlert}>
              <AlertIcon type="INFO" size="small" className={classes.btnIcon} />
              <span
                className={
                  carAlerts.onClickButton !== 'INFORMATION'
                    ? classes.textHeaderButton
                    : classes.textHeaderButtonFocus
                }
              >
                <FormattedMessage {...messages.btnInfor} />
              </span>
            </span>
          );
        }
        return (
          <AlertIcon type="INFO" size="large" className={classes.itemIcon} />
        );
      case 'WARNING':
        if (type === 'btn') {
          return (
            <span className={classes.iconAlert}>
              <AlertIcon
                type="WARNING"
                size="small"
                className={classes.btnIcon}
              />
              <span
                className={
                  carAlerts.onClickButton !== 'WARNING'
                    ? classes.textHeaderButton
                    : classes.textHeaderButtonFocus
                }
              >
                <FormattedMessage {...messages.btnAlert} />
              </span>
            </span>
          );
        }
        return (
          <AlertIcon type="WARNING" size="large" className={classes.itemIcon} />
        );
      case 'CRITICAL':
        if (type === 'btn') {
          return (
            <span className={classes.iconAlert}>
              <AlertIcon
                type="CRITICAL"
                size="small"
                className={classes.btnIcon}
              />
              <span
                className={
                  carAlerts.onClickButton !== 'CRITICAL'
                    ? classes.textHeaderButton
                    : classes.textHeaderButtonFocus
                }
              >
                <FormattedMessage {...messages.btnCritical} />
              </span>
            </span>
          );
        }
        return (
          <AlertIcon
            type="CRITICAL"
            size="large"
            className={classes.itemIcon}
          />
        );
      case 'ALL':
        return (
          <span className={classes.iconAlert}>
            <span
              className={
                carAlerts.onClickButton !== 'ALL'
                  ? classes.textHeaderButton
                  : classes.textHeaderButtonFocus
              }
            >
              <FormattedMessage {...messages.show} />
            </span>
          </span>
        );
      default:
        return null;
    }
  }

  displayListAlert(data) {
    const { classes } = this.props;
    if (data === undefined || data.length === 0) {
      return (
        <div className={classes.listItemEmpty}>
          <span className={classes.textlistEmpty}>
            <FormattedMessage {...messages.empty} />
          </span>
        </div>
      );
    }
    return data.map((item, index) => (
      <ListItem
        key={item.id}
        className={this.displayListItemFocus(item.alertType)}
        id={index}
        onClick={() =>
          this.goToGetAlertInfor(item.alertType, index, item.ecuId)
        }
      >
        <ListItemIcon className={classes.itemIcon}>
          {this.displayIcon(item.alertType, null)}
        </ListItemIcon>
        <ListItemText className={classes.listItemText}>
          <span className={classes.dateItem}>
            {moment
              .unix(item.timestamp / 1000000000)
              .format('MMM D, YYYY H:mm')}
          </span>{' '}
          <br />
          <span className={classes.titleItem}>{item.alertTitle}</span>
        </ListItemText>
      </ListItem>
    ));
  }
  displayAlertDetail() {
    const { classes, carAlerts } = this.props;
    if (carAlerts.AlertInfor.alertType === undefined) {
      return null;
    }
    return (
      <ListItem className={classes.listItemInfor}>
        <div className={classes.alertInfor}>
          <span className={classes.alertIcon}>
            {this.displayIcon(carAlerts.AlertInfor.alertType, null)}
          </span>
          <span className={classes.nameInfor}>
            {this.displayTitleAlertInfor(carAlerts.AlertInfor.alertType)}
          </span>
          <br />
          <span className={classes.dateInfor}>
            {moment
              .unix(carAlerts.AlertInfor.timestamp / 1000000000)
              .format('MMM D, YYYY H:mm')}
          </span>
          <br />
          <span className={classes.titleInfor}>
            {carAlerts.AlertInfor.detailAlert}
          </span>
        </div>
        <div className={classes.alertInforDetail}>
          <span className={classes.textDetail}>
            <span>ECU ID: </span>
            {carAlerts.AlertInfor.ecuId}
          </span>
          <br />
          <span className={classes.textDetail}>
            {carAlerts.AlertInfor.message}
          </span>
        </div>
      </ListItem>
    );
  }

  handleIgnoreAlert() {
    const { location } = this.props;
    const { id } = parseQuery(location.search);
    const { carAlerts, onIgnoreAlert } = this.props;
    if (!_isUndefined(carAlerts.AlertInfor.id) && !_isUndefined(id)) {
      onIgnoreAlert(carAlerts.AlertInfor.id, id);
      this.props.onGetAlertInfor([]);
    }
  }

  FilterListAlert = type => {
    this.props.onChangeFilterAlert(type);
    switch (type) {
      case 'WARNING':
      case 'CRITICAL':
      case 'INFORMATION':
        this.props.onGetClickButton(type);
        this.props.onGetAlertInfor([]);
        this.props.onGetEcuId('');
        return this.displayFilterListAlert(type);
      case 'NORMAL':
        this.props.onGetAlertInfor([]);
        this.props.onGetEcuId('');
        this.handleNormalEcu();
        return this.displayFilterListAlert(type);
      default:
        this.handleGetAlertEcu();
        this.props.onGetClickButton(type);
        this.props.onGetAlertInfor([]);
        this.props.onGetEcuId('');
        return this.displayFilterListAlert(type);
    }
  };

  displayFilterListAlert(type) {
    const { location } = this.props;
    const { id } = parseQuery(location.search);
    if (id) {
      switch (type) {
        case 'WARNING':
          return this.props.onGetVehicleAlertsFilter(id, type);
        case 'CRITICAL':
          return this.props.onGetVehicleAlertsFilter(id, type);
        case 'INFORMATION':
          return this.props.onGetVehicleAlertsFilter(id, type);
        case 'NORMAL':
          return null;
        default:
          return this.props.onGetVehicleAlerts(id);
      }
    }
    return null;
  }
  displayListItemFocus(type) {
    const alertInfor = this.props.carAlerts.AlertInfor;
    if (type === alertInfor) {
      return this.props.classes.listItemFocus;
    }
    return this.props.classes.listItem;
  }

  displayTitleAlertInfor = status => {
    switch (status) {
      case 'INFORMATION':
        return <FormattedMessage {...messages.btnInfor} />;
      case 'WARNING':
        return <FormattedMessage {...messages.btnAlert} />;
      case 'CRITICAL':
        return <FormattedMessage {...messages.btnCritical} />;
      case 'NORMAL':
        return <FormattedMessage {...messages.normal} />;
      default:
        return null;
    }
  };

  goToGetAlertInfor(type, index, ecuId) {
    this.props.onGetAlertInfor(this.props.carAlerts.data[index]);
    this.props.onGetActiveAlert(this.props.carAlerts.data[index]);
    this.props.onGetEcuId(ecuId);
  }

  handleToggle = () => {
    const { carAlerts } = this.props;
    if (carAlerts.open === true) {
      return this.props.onhandleChangeToggle(false);
    }
    return this.props.onhandleChangeToggle(true);
  };
  handleDisplayAlertEcu = () => {
    const { location } = this.props;
    const { id } = parseQuery(location.search);
    const { carAlerts } = this.props;
    if (!carAlerts.checkBox) {
      this.handleGetAlertEcu();
    } else {
      this.props.onGetDataEcu(id);
    }
  };
  handleNormalEcu = () => {
    this.props.onChangeCheckBox();
  };
  render() {
    const { classes, carAlerts } = this.props;
    const listData = carAlerts.data;
    return (
      <div className={classes.carAlerts}>
        <div className={classes.carAlertsHeader}>
          <div className={classes.headerLeft}>
            <button
              onClick={() => this.FilterListAlert('CRITICAL')}
              className={`${classes.headerButton} ${classes.button}`}
            >
              {this.displayIcon('CRITICAL', 'btn')}
            </button>
            <button
              onClick={() => this.FilterListAlert('WARNING')}
              className={`${classes.headerButton} ${classes.button}`}
            >
              {this.displayIcon('WARNING', 'btn')}
            </button>
            <button
              onClick={() => this.FilterListAlert('INFORMATION')}
              className={classes.button}
            >
              {this.displayIcon('INFORMATION', 'btn')}
            </button>
          </div>
          <div className={classes.headerRight}>
            <button
              onClick={() => this.FilterListAlert('ALL')}
              className={`${classes.headerButton} ${classes.button}`}
            >
              {this.displayIcon('ALL', null)}
            </button>
            <div className={classes.textNormal}>
              <button
                onClick={() => this.FilterListAlert('NORMAL')}
                className={classes.button}
              >
                <Checkbox
                  className={classes.checkBox}
                  checked={carAlerts.checkBox}
                  value="checked"
                />
                <span className={classes.textHeaderButton}>
                  <FormattedMessage {...messages.NormalECU} />
                </span>
              </button>
            </div>
          </div>
        </div>
        <Card className={classes.card}>
          <CardHeader
            title={<FormattedMessage {...messages.header} />}
            type="warning"
          />
          <CardContent className={classes.cardContent}>
            <div className={classes.alertList}>
              <List className={classes.listAlert}>
                {this.displayListAlert(listData)}
              </List>
            </div>
            <div className={classes.alertDetail}>
              <div
                className={`${classes.menu} ${
                  carAlerts.open === true ? classes.menuShow : classes.menuNone
                } ${
                  carAlerts.AlertInfor.id === undefined
                    ? classes.menuOpacity
                    : null
                }`}
              >
                <button
                  onClick={() => this.handleToggle()}
                  className={classes.buttonMenu}
                >
                  <span className={classes.menuItem}>
                    <span className={classes.itemLeft}>
                      <img
                        src={createIcon}
                        className={classes.itemIcon}
                        alt="Critical"
                      />
                    </span>
                    <span className={`${classes.itemRight} ${classes.primary}`}>
                      <FormattedMessage {...messages.writeComment} />
                    </span>
                  </span>
                </button>
                <button
                  onClick={() => this.handleToggle()}
                  className={classes.buttonMenu}
                >
                  <span className={classes.menuItem}>
                    <span className={classes.itemLeft}>
                      <img
                        src={cachedIcon}
                        className={classes.itemIcon}
                        alt="Critical"
                      />
                    </span>
                    <span className={`${classes.itemRight} ${classes.primary}`}>
                      <FormattedMessage {...messages.updateSoftware} />
                    </span>
                  </span>
                </button>
                <button
                  onClick={() => this.handleToggle()}
                  className={classes.buttonMenu}
                >
                  <span className={classes.menuItem}>
                    <span className={classes.itemLeft}>
                      <img
                        src={deleteIcon}
                        className={classes.itemIcon}
                        alt="Critical"
                      />
                    </span>
                    <span className={`${classes.itemRight} ${classes.primary}`}>
                      <FormattedMessage {...messages.removeMessage} />
                    </span>
                  </span>
                </button>
              </div>
              <div className={classes.infoDetail}>
                <List className={classes.listDetail}>
                  {this.displayAlertDetail()}
                </List>
              </div>
              <div className={classes.buttonDetail}>
                <Button
                  className={classes.buttonTDB}
                  onClick={() => this.handleToggle()}
                  aria-haspopup="true"
                >
                  {<FormattedMessage {...messages.buttonAction} />}
                </Button>
                <Button
                  className={classes.buttonIgnore}
                  onClick={() => this.handleIgnoreAlert()}
                >
                  {<FormattedMessage {...messages.buttonIgnore} />}
                </Button>
              </div>
              <Paper />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

VehicleAlert.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  vehicleAlert: PropTypes.object.isRequired,
  carAlerts: PropTypes.object.isRequired,
  onGetData: PropTypes.func.isRequired,
  onGetClickButton: PropTypes.func.isRequired,
  onChangeFilterAlert: PropTypes.func.isRequired,
  onGetAlertInfor: PropTypes.func.isRequired,
  onGetActiveAlert: PropTypes.func.isRequired,
  onhandleChangeToggle: PropTypes.func.isRequired,
  onGetVehicleAlerts: PropTypes.func.isRequired,
  onGetVehicleAlertsFilter: PropTypes.func.isRequired,
  onGetEcuId: PropTypes.func.isRequired,
  onGetNormalFilter: PropTypes.func.isRequired,
  onGetDataEcu: PropTypes.func.isRequired,
  onChangeCheckBox: PropTypes.func.isRequired,
  onGetAlertEcu: PropTypes.func.isRequired,
  onResetCheckBox: PropTypes.func.isRequired,
  onIgnoreAlert: PropTypes.func,
};

export default withStyles(styles)(VehicleAlert);
