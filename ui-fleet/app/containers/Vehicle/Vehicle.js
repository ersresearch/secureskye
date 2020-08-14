import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import styles from 'styles/jss/containers/vehicle';
import AppDecorator from 'containers/AppDecorator';
import VehicleInfo from '../VehicleInfo/Loadable';
import VehicleList from './VehicleList/Loadable';

export class Vehicle extends React.PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <AppDecorator>
        <div className={classes.root}>
          <Card className={classes.cardInfor}>
            <CardContent className={classes.tabContent}>
              <VehicleInfo />
            </CardContent>
          </Card>
          <VehicleList />
        </div>
      </AppDecorator>
    );
  }
}

Vehicle.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Vehicle);
