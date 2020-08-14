/**
 *
 * ToggleButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ToggleOn from 'assets/images/swithc_on.png';
import ToggleOff from 'assets/images/swithc_off.png';

class ToggleButton extends React.PureComponent {
  render() {
    const { type, className } = this.props;
    let btn;
    switch (type) {
      case 'on':
        btn = ToggleOn;
        break;
      case 'off':
        btn = ToggleOff;
        break;
      default:
        btn = ToggleOn;
    }
    return <img src={btn} className={className} alt="Toggle" />;
  }
}

ToggleButton.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
};

export default ToggleButton;
