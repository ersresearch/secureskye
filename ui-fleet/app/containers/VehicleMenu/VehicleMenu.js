/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:19:18 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-18 13:26:52
 */
/**
 *
 * VehicleMenu
 *
 */

import React from 'react';
import qs from 'qs';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
// import { UrlPath } from 'commons/constants';
import messages from './messages';

export class VehicleMenu extends React.PureComponent {
  componentDidMount() {
    const { location, vehicleInfo } = this.props;
    if (Object.keys(vehicleInfo.data).length === 0) {
      const vehicleId = qs.parse(location.search)['?id'] || '';
      if (vehicleId) {
        this.props.onGetVehicleInfo(vehicleId);
      }
    }
  }
  handleStatusLevel1 = item => {
    if (item.securityStatus === 'WARNING') {
      return (
        <label htmlFor={item.id} className="alert_node">
          <button
            className="button_lv1"
            onClick={() => this.getDataSoftwareUpdate(item.id)}
          >
            <span key={item.id}>
              {item.displayName || <FormattedMessage {...messages.empty} />}
            </span>
          </button>
        </label>
      );
    } else if (item.securityStatus === 'CRITICAL') {
      return (
        <label htmlFor={item.id} className="critical_node">
          <button
            className="button_lv1"
            onClick={() => this.getDataSoftwareUpdate(item.id)}
          >
            <span key={item.id}>
              {item.displayName || <FormattedMessage {...messages.empty} />}
            </span>
          </button>
        </label>
      );
    } else if (item.securityStatus === 'INFORMATION') {
      return (
        <label htmlFor={item.id} className="info_node">
          <button
            className="button_lv1"
            onClick={() => this.getDataSoftwareUpdate(item.id)}
          >
            <span key={item.id}>
              {item.displayName || <FormattedMessage {...messages.empty} />}
            </span>
          </button>
        </label>
      );
    }
    return (
      <label htmlFor={item.id} className="tree_lv2">
        <button
          className="button_lv1"
          onClick={() => this.getDataSoftwareUpdate(item.id)}
        >
          <span key={item.id}>
            {item.displayName || <FormattedMessage {...messages.empty} />}
          </span>
        </button>
      </label>
    );
  };
  handleStatusLevel2 = item => {
    if (item.securityStatus === 'WARNING') {
      return (
        <label htmlFor={item.id} className="alert_node">
          <button
            className="button"
            onClick={() => this.getDataSoftwareUpdate(item.id)}
          >
            <span key={item.id}>
              {item.displayName || <FormattedMessage {...messages.empty} />}
            </span>
          </button>
        </label>
      );
    } else if (item.securityStatus === 'CRITICAL') {
      return (
        <label htmlFor={item.id} className="critical_node">
          <button
            className="button"
            onClick={() => this.getDataSoftwareUpdate(item.id)}
          >
            <span key={item.id}>
              {item.displayName || <FormattedMessage {...messages.empty} />}
            </span>
          </button>
        </label>
      );
    } else if (item.securityStatus === 'INFORMATION') {
      return (
        <label htmlFor={item.id} className="info_node">
          <button
            className="button"
            onClick={() => this.getDataSoftwareUpdate(item.id)}
          >
            <span key={item.id}>
              {item.displayName || <FormattedMessage {...messages.empty} />}
            </span>
          </button>
        </label>
      );
    }
    return (
      <label htmlFor={item.id}>
        <button
          className="button"
          onClick={() => this.getDataSoftwareUpdate(item.id)}
        >
          <span key={item.id}>
            {item.displayName || <FormattedMessage {...messages.empty} />}
          </span>
        </button>
      </label>
    );
  };
  getDataSoftwareUpdate = () => {};
  // getDataSoftwareUpdate(ecuId) {
  //   const { menuBar } = this.props;
  //   if (menuBar.tabIndexInHeader === 1 && menuBar.tabIndex === 2) {
  //     this.props.history.replace({
  //       pathname: `${UrlPath}/ecu-software-update-detail`,
  //       search: `?id=${ecuId}`,
  //     });
  //   } else if (menuBar.tabIndexInHeader === 1 && menuBar.tabIndex === 1) {
  //     this.props.onGetEcuId(ecuId);
  //     this.props.onGetVehicleAlertsFilterEcu(ecuId);
  //     this.props.onGetClickButton('');
  //     this.props.onGetAlertInfor('');
  //   }
  // }
  createMenu = data =>
    data.map(item => (
      <li key={item.id}>
        <input type="checkbox" id={item.id} />
        <label htmlFor={item.id} className="tree_label_lv1">
          {this.handleStatusLevel1(item)}
        </label>
        {!_.isUndefined(item.children) ? (
          <ul>
            {item.children.map(children => (
              <li key={children.id}>
                <span className="tree_label">
                  {this.handleStatusLevel2(children)}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </li>
    ));
  render() {
    const { vehicleMenu } = this.props;
    const { data } = vehicleMenu;
    return (
      <div className="root">
        {data.length > 0 ? (
          <ul className="tree">
            <li>
              <input type="checkbox" id="c1" />
              <label className="tree_label_root" htmlFor="c1">
                ROOT
              </label>
              <ul>{this.createMenu(data)}</ul>
            </li>
          </ul>
        ) : (
          <div className="txtCheckData">
            <FormattedMessage {...messages.messageMenuTree} />
          </div>
        )}
      </div>
    );
  }
}

VehicleMenu.propTypes = {
  vehicleMenu: PropTypes.object,
  menuBar: PropTypes.object,
  vehicleInfo: PropTypes.object,
  location: PropTypes.object,
  onGetVehicleInfo: PropTypes.func,
  goToSoftwareUpdateDetail: PropTypes.func.isRequired,
  onGetEcuId: PropTypes.func.isRequired,
  onGetVehicleAlertsFilterEcu: PropTypes.func.isRequired,
  onGetClickButton: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  onGetAlertInfor: PropTypes.func.isRequired,
};

export default VehicleMenu;
