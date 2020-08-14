/**
 *
 * VehicleView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppDecorator from 'containers/AppDecorator';
import styles from 'styles/jss/containers/vehicleView';
import Footer from 'components/Footer';
import Alert from 'containers/Alert/Loadable';
import qs from 'qs';
import TimeDataGraph from './TimeDataGraph/Loadable';
import VehicleStatusAlerts from './VehicleStatusAlerts/Loadable';
import VehicleSidebar from '../VehicleSidebar/Loadable';
import CarInfoChart from './CarInfoChart/Loadable';
import VehicleMap from './VehicleMap/Loadable';

export class VehicleView extends React.PureComponent {
  componentDidMount() {
    const { location } = this.props;
    const vehicleId = qs.parse(location.search)['?id'] || '';
    this.props.getVehicleStatus(vehicleId);
  }
  render() {
    const { classes } = this.props;
    return (
      <AppDecorator>
        <Alert>
          <div className={classes.root}>
            <VehicleSidebar />
            <div className={classes.vehicleView}>
              <div className={classes.panels}>
                <div className={classes.topPanels}>
                  <div className={classes.panelViewLeft}>
                    <CarInfoChart />
                  </div>
                  <div className={classes.panelViewRight}>
                    <VehicleMap />
                  </div>
                </div>
                <div className={classes.bottomPanels}>
                  <div className={classes.panelViewLeft}>
                    <TimeDataGraph />
                  </div>
                  <div className={classes.panelViewRight}>
                    <VehicleStatusAlerts />
                  </div>
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

VehicleView.propTypes = {
  classes: PropTypes.object,
  getVehicleStatus: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default withStyles(styles)(VehicleView);
