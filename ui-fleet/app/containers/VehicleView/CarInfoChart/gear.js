/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:21:41 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 09:21:41 
 */
/**
 *
 * CarInfoChart
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import styles from 'styles/jss/containers/carInfoChart';
import { withStyles } from '@material-ui/core/styles';

export class Gear extends React.PureComponent {
  render() {
    const { classes, carInfoChart } = this.props;
    const gear = classes.gearNumber;
    const gearChangeCar = classes.gearChange;
    return (
      <div className={classes.gearDetail}>
        <div className={carInfoChart.gear === 'ONE' ? gearChangeCar : gear}>
          1
        </div>
        <div className={carInfoChart.gear === 'TWO' ? gearChangeCar : gear}>
          2
        </div>
        <div className={carInfoChart.gear === 'NEUTRAL' ? gearChangeCar : gear}>
          N
        </div>
        <div className={carInfoChart.gear === 'DRIVE' ? gearChangeCar : gear}>
          D
        </div>
        <div className={carInfoChart.gear === 'REVERSE' ? gearChangeCar : gear}>
          R
        </div>
        <div className={carInfoChart.gear === 'PARK' ? gearChangeCar : gear}>
          P
        </div>
      </div>
    );
  }
}

Gear.propTypes = {
  classes: PropTypes.object.isRequired,
  carInfoChart: PropTypes.object.isRequired,
};

export default compose(withStyles(styles))(Gear);
