/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 09:20:50 
 * @Last Modified by: DanND1
 * @Last Modified time: 2018-12-05 14:35:07
 */
import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';
import Footer from 'components/Footer';
import Alert from 'containers/Alert/Loadable';
import styles from 'styles/jss/containers/vehicleAlert';
import AppDecorator from 'containers/AppDecorator';
// import qs from 'qs';
import VehicleSidebar from '../VehicleSidebar/Loadable';
import CarVisualization from './CarVisualization/Loadable';
import CarAlerts from './CarAlerts/Loadable';

export class VehicleAlert extends React.Component {
  componentDidMount() {
    // const { location } = this.props;
    // const vehicleId = qs.parse(location.search)['?id'] || '';
    // this.props.onGetDataEcu(vehicleId);
  }
  render() {
    const { classes } = this.props;
    return (
      <AppDecorator>
        <Alert>
          <div className={classes.root}>
            <VehicleSidebar />
            <div className={classes.vehicleAlert}>
              <div className={classes.panels}>
                <div className={classes.sensorVisualization}>
                  <CarVisualization />
                </div>
                <div className={classes.sensorAlerts}>
                  <CarAlerts />
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </Alert>
      </AppDecorator>
    );
  }
}

VehicleAlert.propTypes = {
  classes: PropTypes.object.isRequired,
  // onGetDataEcu: PropTypes.func.isRequired,
  // location: PropTypes.object.isRequired,
};

export default withStyles(styles)(VehicleAlert);
