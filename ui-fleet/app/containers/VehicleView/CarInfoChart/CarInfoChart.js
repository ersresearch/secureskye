/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:21:33 
 * @Last Modified by: LoiDT2
 * @Last Modified time: 2018-12-11 14:18:04
 */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styles from 'styles/jss/containers/carInfoChart';
import PanelTitle from 'components/PanelTitle';
import FuelBar from 'components/FuelBar';
import EngineBar from 'components/EngineBar';
import SpeedometerChart from 'components/SpeedometerChart';
import _isEmpty from 'lodash/isEmpty';
import { withStyles } from '@material-ui/core';
import messages from './messages';
import Mileage from './mileage';
import Gear from './gear';
import {
  validateEngine,
  validateFuel,
  validateSpeed,
  validateRPM,
} from './validateData';
import {
  MIN_VALUE,
  MAX_VALUE_SPEED,
  MAX_VALUE_RPM,
  MAJORTICKSSPEED,
  MAJORTICKSRPM,
} from './constants';
let timers = [];
let oldValueSpeed = 0.0;
let oldValueRpm = 0.0;

export class CarInfoChart extends React.PureComponent {
  componentWillMount() {
    const { handleJoinNoticationRoom } = this.props;
    setTimeout(() => {
      const { vehicleInfo } = this.props;
      handleJoinNoticationRoom(vehicleInfo.data.id);
    }, 3000);
  }
  componentDidUpdate(prevProps) {
    const { carInfoChart } = this.props;
    if (
      prevProps.carInfoChart.speedValue !== carInfoChart.speedValue ||
      prevProps.carInfoChart.rpmValue !== carInfoChart.rpmValue
    ) {
      this.animateGauges();
    }
  }

  animateGauges = () => {
    const { carInfoChart } = this.props;
    const gaugeSpeedChart = document.gauges[document.gauges.length - 2];
    const gaugeRpmChart = document.gauges[document.gauges.length - 1];
    const currentValue = validateSpeed(carInfoChart.speedValue);
    const currentRpm = validateRPM(carInfoChart.rpmValue);
    timers.forEach(timer => {
      clearInterval(timer);
    });
    timers = [];
    const stepSpeed = Math.abs(oldValueSpeed - currentValue) / 6.0;
    const stepRpm = Math.abs(oldValueRpm - currentRpm) / 6.0;
    let newValue = oldValueSpeed;
    let newValueRpm = oldValueRpm;
    const update = setInterval(() => {
      if (newValue > MAX_VALUE_SPEED || newValue < MIN_VALUE) {
        newValue = currentValue;
      } else if (newValue > currentValue) {
        newValue =
          newValue - stepSpeed < currentValue
            ? currentValue
            : newValue - stepSpeed;
        gaugeSpeedChart.value = newValue;
      } else if (newValue < currentValue) {
        newValue =
          newValue + stepSpeed > currentValue
            ? currentValue
            : newValue + stepSpeed;
        gaugeSpeedChart.value = newValue;
      } else {
        gaugeSpeedChart.value = newValue;
        if (oldValueSpeed !== newValue) {
          oldValueSpeed = newValue;
        }
      }
    }, 1000 / 10);
    const updateRpm = setInterval(() => {
      if (newValueRpm > MAX_VALUE_RPM && newValueRpm < MIN_VALUE) {
        newValueRpm = currentRpm;
      } else if (newValueRpm > currentRpm) {
        newValueRpm =
          newValueRpm - stepRpm < currentRpm
            ? currentRpm
            : newValueRpm - stepRpm;
        gaugeRpmChart.value = newValueRpm;
      } else if (newValueRpm < currentRpm) {
        newValueRpm =
          newValueRpm + stepRpm > currentRpm
            ? currentRpm
            : newValueRpm + stepRpm;
        gaugeRpmChart.value = newValueRpm;
      } else {
        gaugeRpmChart.value = newValueRpm;
        if (oldValueRpm !== newValueRpm) {
          oldValueRpm = newValueRpm;
        }
      }
    }, 1000 / 10);

    timers.push(update);
    timers.push(updateRpm);
  };

  componentWillUnmount() {
    const { vehicleInfo } = this.props;
    this.props.carInfoReset();
    this.props.handleLeaveNotificationRoom(vehicleInfo.data.id);
  }

  displayOverlay = () => {
    const { classes } = this.props;
    return (
      <div className={classes.overlay}>
        <div className={classes.textOverlay}>
          <FormattedMessage {...messages.statusCarDetail} />
        </div>
      </div>
    );
  };

  render() {
    const { classes, carInfoChart, vehicleView } = this.props;
    let mileageInfo = false;
    let checkListData = false;
    let carInfoStatus = false;
    if (_isEmpty(vehicleView.status) || vehicleView.status.length === 0) {
      checkListData = true;
    }
    if (!vehicleView.status.TRIP_ODOMETER && !vehicleView.status.ODOMETER) {
      mileageInfo = true;
    }
    if (
      !vehicleView.status.SPEED &&
      !vehicleView.status.RPM &&
      !vehicleView.status.FUEL &&
      !vehicleView.status.TEMPERATURE &&
      !vehicleView.status.GEAR &&
      mileageInfo
    ) {
      carInfoStatus = true;
    }
    if (carInfoStatus || checkListData) {
      return (
        <div className={classes.overlayWrapper}>
          <div className={classes.textWrapperOverlay}>
            <FormattedMessage {...messages.statusCar} />
          </div>
        </div>
      );
    }
    return (
      <div className={classes.container}>
        <div className={classes.topChart}>
          <div className={classes.chartContent}>
            <div className={classes.speedometerChart}>
              {vehicleView.status.SPEED || this.displayOverlay()}
              <PanelTitle
                subtitle={3}
                title={<FormattedMessage {...messages.speed} />}
              />
              <div className="speedometerChartDetail">
                <SpeedometerChart
                  min={MIN_VALUE}
                  max={MAX_VALUE_SPEED}
                  units="km/h"
                  majorTicks={MAJORTICKSSPEED}
                />
              </div>
              <div className={classes.meterInfo}>
                <span className={classes.meterNumber}>
                  {Math.round(validateSpeed(carInfoChart.speedValue))}
                </span>
                <span className={classes.meterUnit}>km/h</span>
              </div>
            </div>
            <div className={classes.veticalBarChart}>
              {vehicleView.status.FUEL || this.displayOverlay()}
              <PanelTitle
                subtitle={3}
                title={<FormattedMessage {...messages.fuel} />}
              />
              <FuelBar className={classes.fuel} value={carInfoChart.fuelValue}>
                <span className={classes.unitMax}>F</span>
                <span className={classes.unitMin}>E</span>
              </FuelBar>
              <div className={classes.meterBarInfo}>
                <span className={classes.meterNumber}>
                  {Math.round(validateFuel(carInfoChart.fuelValue) * 1.2)}
                </span>
                <span className={classes.meterUnit}> km</span>
              </div>
            </div>
          </div>
          <div className={classes.chartContent}>
            <div className={classes.veticalBarChart}>
              {vehicleView.status.TEMPERATURE || this.displayOverlay()}
              <PanelTitle
                subtitle={3}
                title={<FormattedMessage {...messages.engine} />}
              />
              <EngineBar
                classEngine={classes.engine}
                classArrow={classes.arrow}
                classMeter={classes.meter}
                value={carInfoChart.engineValue}
              >
                <span className={classes.unitMax}>H</span>
                <span className={classes.unitMin}>C</span>
              </EngineBar>
              <div className={classes.meterBarInfo}>
                <span className={classes.meterNumber}>
                  {Math.round(validateEngine(carInfoChart.engineValue))}
                </span>
                <span className={classes.meterUnit}> °C</span>
              </div>
            </div>
            <div className={classes.speedometerChart}>
              {vehicleView.status.RPM || this.displayOverlay()}
              <PanelTitle
                subtitle={3}
                title={<FormattedMessage {...messages.rpm} />}
              />
              <div className="speedometerChartDetail">
                <SpeedometerChart
                  min={MIN_VALUE}
                  max={MAX_VALUE_RPM}
                  units="x1000"
                  majorTicks={MAJORTICKSRPM}
                />
              </div>
              <div className={classes.meterInfo}>
                <span className={classes.meterNumber}>
                  {Math.round(validateRPM(carInfoChart.rpmValue))}
                </span>
                <span className={classes.meterUnit}>rpm</span>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.bottomChart}>
          <div className={classes.mileageInfo}>
            {!mileageInfo || this.displayOverlay()}
            <PanelTitle
              subtitle={3}
              title={<FormattedMessage {...messages.mileage} />}
            />
            <Mileage vehicleView={vehicleView} carInfoChart={carInfoChart} />
          </div>
          <div className={classes.gearInfo}>
            {vehicleView.status.GEAR || this.displayOverlay()}
            <PanelTitle
              subtitle={3}
              title={<FormattedMessage {...messages.gear} />}
            />
            <Gear carInfoChart={carInfoChart} />
          </div>
        </div>
      </div>
    );
  }
}

CarInfoChart.propTypes = {
  classes: PropTypes.object.isRequired,
  carInfoChart: PropTypes.object.isRequired,
  vehicleInfo: PropTypes.object.isRequired,
  vehicleView: PropTypes.object.isRequired,
  handleLeaveNotificationRoom: PropTypes.func.isRequired,
  handleJoinNoticationRoom: PropTypes.func.isRequired,
  carInfoReset: PropTypes.func.isRequired,
};
export default withStyles(styles)(CarInfoChart);
