/**
 *
 * VehicleAlertIcon
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import _toLower from 'lodash/toLower';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import styles from 'styles/jss/components/vehicleAlertIcon';
import engine from 'assets/images/ic_status_engine_normal.png';
import tire from 'assets/images/ic_status_tire_normal.png';
import oil from 'assets/images/ic_status_oil_normal.png';
import brake from 'assets/images/ic_status_brake_normal.png';
import coolant from 'assets/images/ic_status_coolant_normal.png';
import battery from 'assets/images/ic_status_battery_normal.png';
import engineAlert from 'assets/images/ic_status_engine_alert.png';
import tireAlert from 'assets/images/ic_status_tire_alert.png';
import oilAlert from 'assets/images/ic_status_oil_alert.png';
import brakeAlert from 'assets/images/ic_status_brake_alert.png';
import coolantAlert from 'assets/images/ic_status_coolant_alert.png';
import batteryAlert from 'assets/images/ic_status_battery_alert.png';
import engineCritical from 'assets/images/ic_status_engine_critical.png';
import tireCritical from 'assets/images/ic_status_tire_critical.png';
import oilCritical from 'assets/images/ic_status_oil_critical.png';
import brakeCritical from 'assets/images/ic_status_brake_critical.png';
import coolantCritical from 'assets/images/ic_status_coolant_critical.png';
import batteryCritical from 'assets/images/ic_status_battery_critical.png';
import messages from './messages';
import AlertIcon from '../AlertIcon';

class VehicleAlertIcon extends React.PureComponent {
  render() {
    const { name, status, classes, enable } = this.props;
    let typeIcon;
    let typeName;
    let check = false;
    if (!enable) {
      switch (name) {
        case 'ENGINE':
          typeIcon = engine;
          break;
        case 'TIRE_PRESSURE':
          typeIcon = tire;
          break;
        case 'ENGINE_OIL':
          typeIcon = oil;
          break;
        case 'BRAKES':
          typeIcon = brake;
          break;
        case 'ENGINE_COOLANT':
          typeIcon = coolant;
          break;
        case 'BATTERY':
          typeIcon = battery;
          break;
        default:
          break;
      }
      typeName = <FormattedMessage {...messages[_toLower(name)]} />;
      check = true;
    } else {
      switch (name) {
        case 'ENGINE':
          typeName = <FormattedMessage {...messages.engine} />;
          switch (status) {
            case 'CRITICAL':
              typeIcon = engineCritical;
              break;
            case 'WARNING':
              typeIcon = engineAlert;
              break;
            case 'INFO':
              typeIcon = engine;
              break;
            default:
              typeIcon = engine;
          }
          break;
        case 'TIRE_PRESSURE':
          typeName = <FormattedMessage {...messages.tire_pressure} />;
          switch (status) {
            case 'CRITICAL':
              typeIcon = tireCritical;
              break;
            case 'WARNING':
              typeIcon = tireAlert;
              break;
            case 'INFO':
              typeIcon = tire;
              break;
            default:
              typeIcon = tire;
          }
          break;
        case 'ENGINE_OIL':
          typeName = <FormattedMessage {...messages.engine_oil} />;
          switch (status) {
            case 'WARNING':
              typeIcon = oilAlert;
              break;
            case 'CRITICAL':
              typeIcon = oilCritical;
              break;
            case 'INFO':
              typeIcon = oil;
              break;
            default:
              typeIcon = oil;
          }
          break;

        case 'BRAKES':
          typeName = <FormattedMessage {...messages.brakes} />;
          switch (status) {
            case 'WARNING':
              typeIcon = brakeAlert;
              break;
            case 'CRITICAL':
              typeIcon = brakeCritical;
              break;
            case 'INFO':
              typeIcon = brake;
              break;
            default:
              typeIcon = brake;
          }
          break;
        case 'ENGINE_COOLANT':
          typeName = <FormattedMessage {...messages.engine_coolant} />;
          switch (status) {
            case 'WARNING':
              typeIcon = coolantAlert;
              break;
            case 'CRITICAL':
              typeIcon = coolantCritical;
              break;
            case 'INFO':
              typeIcon = coolant;
              break;
            default:
              typeIcon = coolant;
          }
          break;
        case 'BATTERY':
          typeName = <FormattedMessage {...messages.battery} />;
          switch (status) {
            case 'WARNING':
              typeIcon = batteryAlert;
              break;
            case 'CRITICAL':
              typeIcon = batteryCritical;
              break;
            case 'INFO':
              typeIcon = battery;
              break;
            default:
              typeIcon = battery;
          }
          break;
        default:
          break;
      }
    }

    if (check) {
      return (
        <div className={classes.bgNormal}>
          <div className="overlay-in-a-item">
            <div className="text">
              <FormattedMessage {...messages.na} />
            </div>
          </div>
          <img alt={status} src={typeIcon} className={classes.iconEcu} />
          <Typography className={`${classes.textStyle} ${classes.text}`}>
            {typeName}
          </Typography>
        </div>
      );
    }
    if (status === 'WARNING') {
      return (
        <div className={classes.bgAlert}>
          <AlertIcon
            type={status}
            className={classes.iconAlert}
            size="medium"
          />
          <img alt={name} src={typeIcon} className={classes.iconEcu} />
          <Typography
            className={`${classes.textAlert} ${classes.textStyle}
            ${classes.text}`}
          >
            {typeName}
          </Typography>
        </div>
      );
    }

    if (status === 'CRITICAL') {
      return (
        <div className={classes.bgCritical}>
          <AlertIcon
            type={status}
            className={classes.iconAlert}
            size="medium"
          />
          <img alt={name} src={typeIcon} className={classes.iconEcu} />
          <Typography
            className={`${classes.textCritical} ${classes.textStyle} 
            ${classes.text}`}
          >
            {typeName}
          </Typography>
        </div>
      );
    }

    return (
      <div className={classes.bgNormal}>
        <img alt={name} src={typeIcon} className={classes.iconEcu} />
        <Typography className={`${classes.textStyle} ${classes.text}`}>
          {typeName}
        </Typography>
      </div>
    );
  }
}

VehicleAlertIcon.propTypes = {
  enable: PropTypes.bool,
  name: PropTypes.string.isRequired,
  status: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VehicleAlertIcon);
