import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Alert from 'containers/Alert/Loadable';
import styles from 'styles/jss/containers/vehicleSecurity';
import Footer from 'components/Footer';
import AppDecorator from 'containers/AppDecorator';
import VehicleSidebar from '../VehicleSidebar/Loadable';
import SecurityStatus from './SecurityStatus/Loadable';

export class VehicleSecurity extends React.PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <AppDecorator>
        <Alert>
          <div className={classes.root}>
            <VehicleSidebar />
            <div className={classes.carSecurity}>
              <div className={classes.panels}>
                <SecurityStatus />
              </div>
              <Footer />
            </div>
          </div>
        </Alert>
      </AppDecorator>
    );
  }
}

VehicleSecurity.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VehicleSecurity);
