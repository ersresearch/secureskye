/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:01:51 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 09:01:51 
 */
/**
 *
 * RiskLevelGaugeChart
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { RadialGauge } from 'react-canvas-gauges';
import { withStyles } from '@material-ui/core/styles';
import styles from 'styles/jss/containers/riskCurrentGauge';
import PanelTitle from 'components/PanelTitle';

import messages from './messages';
import { MAX_VALUE_RISK, MIN_VALUE_RISK } from './constants';

const timers = [];
let oldValue = 1.0;
let oldRiskValue = 0;

export class RiskLevelGaugeChart extends React.PureComponent {
  componentDidMount() {
    const { handleJoinNoticationRoom } = this.props;
    setTimeout(() => {
      handleJoinNoticationRoom();
    }, 3000);
  }

  componentDidUpdate() {
    this.animateGauges();
  }
  componentWillUnmount() {
    this.props.handleLeaveNotificationRoom();
    this.props.riskCurrentReset();
  }
  animateGauges = () => {
    const { handleGaugeChart } = this.props;
    let currentValue = handleGaugeChart.value;
    if (currentValue > MAX_VALUE_RISK || currentValue < MIN_VALUE_RISK) {
      currentValue = oldValue;
    }
    document.gauges.forEach(gauge => {
      const gaugeChart = gauge;
      timers.forEach(timer => {
        clearInterval(timer);
      });
      timers.pop();
      const step = Math.abs(oldValue - currentValue) / 20.0;
      let newValue = oldValue;
      const update = setInterval(() => {
        if (newValue > currentValue) {
          newValue =
            newValue - step < currentValue ? currentValue : newValue - step;
          gaugeChart.value = newValue;
        } else if (newValue < currentValue) {
          newValue =
            newValue + step > currentValue ? currentValue : newValue + step;
          gaugeChart.value = newValue;
        } else {
          gaugeChart.value = newValue;
          if (oldValue !== newValue) {
            oldValue = newValue;
          }
        }
      }, 1000 / 20);
      timers.push(update);
    });
  };

  render() {
    const { classes, handleGaugeChart } = this.props;
    let currentRiskValue = handleGaugeChart.value;
    if (
      currentRiskValue <= MAX_VALUE_RISK &&
      currentRiskValue >= MIN_VALUE_RISK
    ) {
      oldRiskValue = currentRiskValue;
    } else {
      currentRiskValue = oldRiskValue;
    }
    return (
      <React.Fragment>
        <PanelTitle
          subtitle={2}
          title={<FormattedMessage {...messages.riskLevel} />}
        />
        <div className={classes.riskLevelWrapper}>
          <div className={classes.riskLevelGauges}>
            <div className="riskCurrentGauge">
              <RadialGauge
                width={500}
                height={500}
                value={1}
                minValue={1}
                maxValue={7}
                majorTicks={handleGaugeChart.majorTicks}
                minorTicks={5}
                highlights={[
                  { from: 1, to: 4, color: '#2B2721' },
                  { from: 4, to: 5.5, color: '#786D60' },
                  { from: 5.5, to: 7, color: '#E2000D' },
                ]}
                colorMajorTicks="black"
                needleCircleSize="0"
                needleWidth={2.5}
                colorBorderShadow="#F9E5CB"
                colorPlate="transparent"
                colorNeedle="black"
                colorNeedleEnd="black"
                borders={false}
                valueBox={false}
                fontNumbersSize={30}
                highlightsWidth={5}
                strokeTicks={false}
                animationRule="linear"
              />
            </div>
            <div className={classes.riskLevel_info_gauge}>
              <div className={classes.lowhigh}>
                <span className={classes.gauge_low}>
                  <FormattedMessage {...messages.low} />
                </span>
                <span className={classes.gauge_high}>
                  <FormattedMessage {...messages.high} />
                </span>
              </div>
              <div className={classes.gauge_level}>
                <span className={classes.levelTitle}>
                  <FormattedMessage {...messages.level} />
                </span>
                <span className={classes.level_info}>{currentRiskValue}</span>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

RiskLevelGaugeChart.propTypes = {
  handleGaugeChart: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  handleLeaveNotificationRoom: PropTypes.func.isRequired,
  handleJoinNoticationRoom: PropTypes.func.isRequired,
  riskCurrentReset: PropTypes.func.isRequired,
};

export default withStyles(styles)(RiskLevelGaugeChart);
