/**
 *
 * CardHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';

import AccessTime from 'assets/images/ic_title_time.png';
import List from 'assets/images/ic_title_list.png';
import Warning from 'assets/images/ic_title_alert.png';
import Wifi from 'assets/images/ic_title_wifi.png';
import Security from 'assets/images/ic_title_security.png';
import styles from 'styles/jss/components/cardHeader';

class CardHeaderComponent extends React.PureComponent {
  render() {
    const { classes, type, className } = this.props;
    let CustomIcon;
    switch (type) {
      case 'list':
        CustomIcon = List;
        break;
      case 'warning':
        CustomIcon = Warning;
        break;
      case 'wifi':
        CustomIcon = Wifi;
        break;
      case 'time':
        CustomIcon = AccessTime;
        break;
      case 'security':
        CustomIcon = Security;
        break;
      default:
        CustomIcon = null;
    }
    return (
      <CardHeader
        className={`${classes.cardHeader} ${className}`}
        title={
          <React.Fragment>
            {CustomIcon ? (
              <img
                src={CustomIcon}
                className={classes.headerIcon}
                alt="HeaderIcon"
              />
            ) : null}
            <span className={classes.title}>{this.props.title}</span>
          </React.Fragment>
        }
      />
    );
  }
}

CardHeaderComponent.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  type: PropTypes.string,
};

export default withStyles(styles)(CardHeaderComponent);
