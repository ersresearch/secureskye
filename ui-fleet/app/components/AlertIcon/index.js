/**
 *
 * AlertIcon
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import WarningSmall from 'assets/images/ic_alert_24.png';
import WarningMedium from 'assets/images/ic_alert_34.png';
import WarningLarge from 'assets/images/ic_alert_36.png';
import CriticalSmall from 'assets/images/ic_critical_24.png';
import CriticalMedium from 'assets/images/ic_critical_34.png';
import CriticalLarge from 'assets/images/ic_critical_36.png';
import InfoSmall from 'assets/images/ic_info_24.png';
import InfoLarge from 'assets/images/ic_info_36.png';

class AlertIcon extends React.PureComponent {
  render() {
    const { size, type, className } = this.props;
    let icon;
    switch (type) {
      case 'WARNING':
        switch (size) {
          case 'small':
            icon = WarningSmall;
            break;
          case 'medium':
            icon = WarningMedium;
            break;
          case 'large':
            icon = WarningLarge;
            break;
          default:
            icon = WarningSmall;
        }
        break;
      case 'CRITICAL':
        switch (size) {
          case 'small':
            icon = CriticalSmall;
            break;
          case 'medium':
            icon = CriticalMedium;
            break;
          case 'large':
            icon = CriticalLarge;
            break;
          default:
            icon = CriticalSmall;
        }
        break;
      case 'INFO':
        switch (size) {
          case 'small':
            icon = InfoSmall;
            break;
          case 'large':
            icon = InfoLarge;
            break;
          default:
            icon = InfoSmall;
        }
        break;
      default:
        break;
    }
    return <img src={icon} className={className} alt={icon} />;
  }
}

AlertIcon.propTypes = {
  size: PropTypes.string,
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default AlertIcon;
