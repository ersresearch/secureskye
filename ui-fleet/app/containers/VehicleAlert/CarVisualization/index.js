/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 09:30:22 
 * @Last Modified by: DanND1
 * @Last Modified time: 2018-12-10 14:52:16
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import PulsatingCircle from 'components/PulsatingCircle';
import Car from 'assets/images/illust_car.png';
import _isUndefined from 'lodash/isUndefined';
import makeSelectVehicleSoftwareUpdate from 'containers/VehicleSoftwareUpdate/selectors';
import styles from 'styles/jss/containers/vehicleCarVisualization';
import makeSelectVehicleMenu from 'containers/VehicleMenu/selectors';
import { makeSelectCarAlerts } from '../CarAlerts/selectors';
import makeSelectVehicleAlert from '../../VehicleAlert/selectors';
let data = [];

export class CarVisualization extends React.PureComponent {
  handleSensorAlert = item => {
    const { classes, CarAlerts, VehicleAlert } = this.props;
    let statusActive;
    if (VehicleAlert.ecuId === item.id) {
      statusActive = true;
    } else if (
      CarAlerts.activeAlert.type === undefined ||
      VehicleAlert.ecuId !== item.id
    ) {
      statusActive = false;
    }
    if (!_isUndefined(item.topPosition) && !_isUndefined(item.leftPosition)) {
      return (
        <PulsatingCircle
          key={item.id}
          type="point"
          id={item.id}
          status={item.securityStatus}
          active={statusActive}
          position={[item.topPosition, item.leftPosition]}
          className={`${classes.sensor}`}
        />
      );
    }
    return null;
  };
  render() {
    const { classes, VehicleAlert } = this.props;
    data = VehicleAlert.dataEcu;
    return (
      <div className={classes.car}>
        <img className={classes.illustCar} src={Car} alt="Car" />
        <div>
          {data.length > 0
            ? data.map(item => this.handleSensorAlert(item))
            : null}
        </div>
      </div>
    );
  }
}

CarVisualization.propTypes = {
  classes: PropTypes.object.isRequired,
  CarAlerts: PropTypes.object.isRequired,
  VehicleAlert: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  CarAlerts: makeSelectCarAlerts(),
  VehicleSWUpdate: makeSelectVehicleSoftwareUpdate(),
  VehicleMenu: makeSelectVehicleMenu(),
  VehicleAlert: makeSelectVehicleAlert(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  withStyles(styles),
)(CarVisualization);
