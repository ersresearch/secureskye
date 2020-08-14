/**
 *
 * FuelBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';

import styles from 'styles/jss/components/fuelBar';
const MAX_VALUE = 100;
const MIN_VALUE = 0;
let oldValue = 0;

class FuelBar extends React.PureComponent {
  render() {
    const { classes, value, className } = this.props;
    let currentValue = value;
    if (
      currentValue <= MAX_VALUE &&
      currentValue >= MIN_VALUE &&
      currentValue != null
    ) {
      oldValue = currentValue;
    } else {
      currentValue = oldValue;
    }
    return (
      <div className={`${classes.fuel} ${className}`}>
        <div
          style={{ height: `${currentValue}%` }}
          className={classes.fuelValue}
        />
        {this.props.children}
      </div>
    );
  }
}

FuelBar.propTypes = {
  value: PropTypes.number,
  children: PropTypes.node,
  classes: PropTypes.object,
  className: PropTypes.string,
};

export default withStyles(styles)(FuelBar);
