/*
 * @Author: DatNT62 
 * @Date: 2018-11-13 09:04:34 
 * @Last Modified by:   DatNT62 
 * @Last Modified time: 2018-11-13 09:04:34 
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from 'styles/jss/containers/vehicleMap';
import { DateFormat } from 'utils/timeStampUtil';

class Item extends React.PureComponent {
  render() {
    const { classes, dateAndTime, address } = this.props;
    return (
      <div className="item">
        <div className={classes.dateAndTime}>{DateFormat(dateAndTime)}</div>
        <div className={classes.address}>{address}</div>
      </div>
    );
  }
}
Item.propTypes = {
  classes: PropTypes.object,
  dateAndTime: PropTypes.number,
  address: PropTypes.string,
};

export default withStyles(styles)(Item);
