import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from 'styles/jss/containers/fleetVehicle';
import Footer from 'components/Footer';
import AppDecorator from 'containers/AppDecorator';
import VehicleList from './VehicleList/Loadable';
import VehicleSidebar from '../VehicleSidebar/Loadable';

export class FleetVehicle extends React.PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <AppDecorator>
        <div className={classes.root}>
          <VehicleSidebar />
          <div className={classes.vehicleList}>
            <div className={classes.panels}>
              <VehicleList />
            </div>
            <Footer />
          </div>
        </div>
      </AppDecorator>
    );
  }
}

FleetVehicle.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(FleetVehicle);
