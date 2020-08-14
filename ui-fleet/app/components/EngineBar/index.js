/**
 *
 * EngineBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';

import styles from 'styles/jss/components/engineBar';
import MeterEngine from 'assets/images/meter_engine.png';
import MeterEngineArrow from 'assets/images/meter_engine_arw.png';
const MAX_VALUE = 100;
const MIN_VALUE = 0;
let oldValue = 0;

class EngineBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.arrowEngine = React.createRef();
    this.meterEngine = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      let currentValue = nextProps.value;
      if (
        currentValue <= MAX_VALUE &&
        currentValue >= MIN_VALUE &&
        currentValue != null
      ) {
        oldValue = currentValue;
      } else {
        currentValue = oldValue;
      }
      const shift = this.arrowEngine.current.offsetHeight / 2;
      const yRange = this.meterEngine.current.clientHeight;
      const y = Math.floor(((MAX_VALUE - currentValue) / MAX_VALUE) * yRange);
      this.arrowEngine.current.style.top = `${y - shift}px`;
    }
    return null;
  }

  componentDidMount() {
    const currentValue = Math.max(0, Math.min(100, this.props.value));
    const shift = this.arrowEngine.current.offsetHeight / 2;
    const yRange = this.meterEngine.current.clientHeight;
    const y = Math.floor(((100 - currentValue) / 100) * yRange);
    this.arrowEngine.current.style.top = `${y - shift}px`;
  }

  render() {
    const { classes, classEngine, classArrow, classMeter } = this.props;
    return (
      <div className={`${classes.engine} ${classEngine}`}>
        <img
          ref={this.arrowEngine}
          src={MeterEngineArrow}
          className={`${classes.arrow} ${classArrow}`}
          alt="meter-arrow"
        />
        <img
          src={MeterEngine}
          className={classMeter}
          ref={this.meterEngine}
          alt="meter"
        />
        {this.props.children}
      </div>
    );
  }
}

EngineBar.propTypes = {
  classes: PropTypes.object,
  value: PropTypes.number,
  children: PropTypes.node,
  classArrow: PropTypes.string,
  classMeter: PropTypes.string,
  classEngine: PropTypes.string,
};

export default withStyles(styles)(EngineBar);
