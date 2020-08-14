import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Footer from 'components/Footer';
import AppDecorator from 'containers/AppDecorator';
import styles from 'styles/jss/containers/fleetDashboard';
import TotalVehicleChart from './TotalVehicleChart/Loadable';
import AnomaliesChart from './AnomaliesChart/Loadable';
import RiskLevelGaugeChart from './RiskLevelGaugeChart/Loadable';
import Map from './Map/Loadable';
import AlertDashboard from './AlertDashboard/Loadable';

export class FleetDashboard extends React.PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <AppDecorator>
        <div className={classes.root}>
          <div className={classes.panels}>
            <div className={classes.topPanels}>
              <div className={classes.panelsMap}>
                <Map />
              </div>
              <div className={classes.alertPanel}>
                <AlertDashboard />
              </div>
            </div>
            <div className={classes.bottomPanels}>
              <Grid className={classes.container} container>
                <Grid className={classes.spacing} item xs={4}>
                  <TotalVehicleChart />
                </Grid>
                <Grid className={classes.spacing} item xs={5}>
                  <AnomaliesChart />
                </Grid>
                <Grid className={classes.spacing} item xs={3}>
                  <RiskLevelGaugeChart />
                </Grid>
              </Grid>
            </div>
          </div>
          <Footer />
        </div>
      </AppDecorator>
    );
  }
}

FleetDashboard.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(FleetDashboard);
