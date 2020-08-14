import React from 'react';
import _ from 'lodash';
import qs from 'qs';
import PropTypes from 'prop-types';
import AlertDialog from 'components/AlertDialog/Loadable';
import { UrlPath } from 'commons/constants';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export class Alert extends React.PureComponent {
  handleChooseCar = () => {
    this.props.changeAlertStatus(false);
    this.props.history.replace(`${UrlPath}/fleet-vehicle`);
  };
  componentDidMount() {
    const { vehicleInfo, location } = this.props;
    if (
      qs.parse(location.search)['?id'] &&
      qs.parse(location.search)['?id'] !== 'undefined'
    ) {
      this.props.changeAlertStatus(false);
    } else if (!_.isEmpty(vehicleInfo.data)) {
      this.props.changeAlertStatus(false);
    } else {
      this.props.changeAlertStatus(true);
    }
  }
  render() {
    const { alert } = this.props;
    if (!alert.alertDialogStatus) {
      return this.props.children;
    }
    return (
      <AlertDialog
        check={alert.alertDialogStatus}
        type="selectVehicle"
        title={<FormattedMessage {...messages.alertDialogTitle} />}
        description={<FormattedMessage {...messages.alertDialogDescription} />}
        handleChooseCar={this.handleChooseCar}
      />
    );
  }
}

Alert.propTypes = {
  changeAlertStatus: PropTypes.func,
  history: PropTypes.object,
  alert: PropTypes.object,
  vehicleInfo: PropTypes.object,
  children: PropTypes.object,
  location: PropTypes.object,
};

export default Alert;
