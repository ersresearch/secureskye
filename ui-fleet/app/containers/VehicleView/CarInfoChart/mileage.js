/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:21:57 
 * @Last Modified by: LoiDT2
 * @Last Modified time: 2018-11-30 10:36:11
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
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { MAX_VALUE_TRIP_ODO, MIN_VALUE } from './constants';
let oldTripValue = 0.0;
let oldOdoValue = 0.0;
export class Mileage extends React.PureComponent {
  render() {
    const { classes, carInfoChart, vehicleView } = this.props;
    let mileageInfo = false;
    let currentTripValue = carInfoChart.tripValue;
    let currentOdoValue = carInfoChart.odoValue;
    if (
      currentTripValue >= MIN_VALUE &&
      currentTripValue <= MAX_VALUE_TRIP_ODO &&
      currentTripValue != null
    ) {
      oldTripValue = currentTripValue;
    } else {
      currentTripValue = oldTripValue;
    }
    if (
      currentOdoValue >= MIN_VALUE &&
      currentOdoValue <= MAX_VALUE_TRIP_ODO &&
      currentOdoValue != null
    ) {
      oldOdoValue = currentOdoValue;
    } else {
      currentOdoValue = oldOdoValue;
    }
    if (!vehicleView.status.TRIP_ODOMETER && !vehicleView.status.ODOMETER) {
      mileageInfo = true;
    }
    return (
      <div className={classes.mileageDetail}>
        <div className={classes.mileageWrap}>
          {vehicleView.status.TRIP_ODOMETER || mileageInfo ? (
            <div />
          ) : (
            <div className={classes.overlay}>
              <div className={classes.textOverlay}>
                <FormattedMessage {...messages.statusCarDetail} />
              </div>
            </div>
          )}
          <span className={classes.mileageTitle}>TRIP:</span>
          <span className={classes.mileageNumber}>
            {Math.round(currentTripValue)}
          </span>
          <span className={classes.mileageUnit}>km</span>
        </div>
        <div className={classes.mileageWrap}>
          {vehicleView.status.ODOMETER || mileageInfo ? (
            <div />
          ) : (
            <div className={classes.overlay}>
              <div className={classes.textOverlay}>
                <FormattedMessage {...messages.statusCarDetail} />
              </div>
            </div>
          )}
          <span className={classes.mileageTitle}>ODO:</span>
          <span className={classes.mileageNumber}>
            {Math.round(currentOdoValue)}
          </span>
          <span className={classes.mileageUnit}>km</span>
        </div>
      </div>
    );
  }
}

Mileage.propTypes = {
  classes: PropTypes.object.isRequired,
  carInfoChart: PropTypes.object.isRequired,
  vehicleView: PropTypes.object.isRequired,
};

export default compose(withStyles(styles))(Mileage);
