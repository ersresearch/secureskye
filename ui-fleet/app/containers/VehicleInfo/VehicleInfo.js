import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core';
import styles from 'styles/jss/containers/vehicleInfo';
import IconFile from 'assets/images/icon_file.png';
import messages from './messages';

export class VehicleInfo extends React.PureComponent {
  componentDidMount() {
    const { location, onGetVehicleInfo, vehicleInfo } = this.props;
    if (Object.keys(vehicleInfo.data).length === 0) {
      const vehicleId = qs.parse(location.search)['?id'] || '';
      if (vehicleId) {
        onGetVehicleInfo(vehicleId);
      }
    }
  }
  displayVehicleInfo = (data, key) => {
    const { classes } = this.props;
    return (
      <div key={key} className={classes.info}>
        <div className={classes.colLeft}>
          <span className={classes.textLeft}>
            <FormattedMessage {...messages[key]} />:
          </span>
        </div>
        <div className={classes.colRight}>
          {key === 'color' ? (
            <div className={classes.wrapColor}>
              {data.lastIndexOf('#') === 0 ? (
                <div
                  style={{ backgroundColor: data }}
                  className={classes.colorInfo}
                />
              ) : null}
            </div>
          ) : (
            <span className={classes.textRight}>{data || 'N/A'}</span>
          )}
        </div>
      </div>
    );
  };
  render() {
    const { classes, vehicleInfo } = this.props;
    return (
      <React.Fragment>
        {vehicleInfo.data.imageUrl ? (
          <img src={vehicleInfo.image} alt="car" className={classes.imgCar} />
        ) : (
          <div className={classes.notChooseImg}>
            <img className={classes.iconFile} alt="car" src={IconFile} />
            <span className={classes.txtImage}>
              <FormattedMessage {...messages.notChooseImg} />
            </span>
          </div>
        )}
        {Object.keys(vehicleInfo.dataDisplay).map(key =>
          this.displayVehicleInfo(vehicleInfo.dataDisplay[key], key),
        )}
      </React.Fragment>
    );
  }
}

VehicleInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  vehicleInfo: PropTypes.object.isRequired,
  onGetVehicleInfo: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default withStyles(styles)(VehicleInfo);
