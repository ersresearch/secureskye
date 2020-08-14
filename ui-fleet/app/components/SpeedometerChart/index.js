/**
 *
 * SpeedometerChart
 *
 */

import React from 'react';
import { RadialGauge } from 'react-canvas-gauges';
import PropTypes from 'prop-types';

/* eslint-disable react/prefer-stateless-function */
class SpeedometerChart extends React.PureComponent {
  render() {
    const { min, max, majorTicks, units } = this.props;
    return (
      <RadialGauge
        width="270"
        height="215"
        units={units}
        fontUnitsSize={30}
        value={0}
        minValue={min}
        maxValue={max}
        majorTicks={majorTicks}
        minorTicks={4}
        highlights={[{ from: 0, to: 12, color: 'transparent' }]}
        needleCircleSize="0"
        needleWidth={2.5}
        colorUnits="#F0F0F0"
        colorPlate="transparent"
        colorNeedle="#F0F0F0"
        colorNeedleEnd="#F0F0F0"
        colorMinorTicks="#F0F0F0"
        colorMajorTicks="#F0F0F0"
        colorNumbers="#F0F0F0"
        borders={false}
        valueBox={false}
        fontNumbersSize={22}
        highlightsWidth={5}
        strokeTicks={false}
        animationRule="linear"
      />
    );
  }
}

SpeedometerChart.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  majorTicks: PropTypes.array,
  units: PropTypes.string,
};

export default SpeedometerChart;
