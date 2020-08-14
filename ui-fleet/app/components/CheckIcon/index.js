/**
 *
 * AlertIcon
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import CheckIcon from 'assets/images/ic_check.png';
import UpdateIcon from 'assets/images/circle_down.png';

/* eslint-disable react/prefer-stateless-function */
class CheckStatusIcon extends React.PureComponent {
  render() {
    const { type, className } = this.props;
    let icon;
    switch (type) {
      case 'check':
        icon = CheckIcon;
        break;
      case 'update':
        icon = UpdateIcon;
        break;
      default:
        icon = CheckIcon;
    }
    return <img src={icon} className={className} alt="Check" />;
  }
}

CheckStatusIcon.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
};

export default CheckStatusIcon;
