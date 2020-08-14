/**
 *
 * SecurityButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import styles from 'styles/jss/components/securityButton';

class SecurityButton extends React.PureComponent {
  render() {
    const { classes, isActive, className } = this.props;
    let button;
    let type;
    if (isActive) {
      button = 'buttonOn';
      type = 'ON';
    } else {
      button = 'buttonOff';
      type = 'OFF';
    }
    return (
      <button className={`${classes[button]} ${classes.button} ${className}`}>
        <span>{type}</span>
      </button>
    );
  }
}

SecurityButton.propTypes = {
  isActive: PropTypes.bool,
  className: PropTypes.string,
  classes: PropTypes.object,
};

export default withStyles(styles)(SecurityButton);
