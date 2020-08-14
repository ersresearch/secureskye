/**
 *
 * MenuTabs
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { UrlPath } from 'commons/constants';

import { FormattedMessage } from 'react-intl';
import styles from 'styles/jss/containers/menuTabs';
import { Button } from '@material-ui/core';
import iconBack from 'assets/images/ic_back.png';
import messages from './messages';

class MenuTabs extends React.PureComponent {
  handleChange = (event, value) => {
    const { handleChangeTab } = this.props;
    handleChangeTab(value);
  };
  displayButtonBack(index) {
    const { classes, vehicleId } = this.props;
    if (this.props.pathname === `${UrlPath}/ecu-software-update-detail`) {
      return (
        <div className={classes.rootBack}>
          <Button
            className={classes.buttonBack}
            onClick={() =>
              this.props.history.replace({
                pathname: `${UrlPath}/vehicle-software-update`,
                search: `?id=${vehicleId}`,
              })
            }
          >
            <img src={iconBack} className={classes.backIncon} alt="Back icon" />
            {<FormattedMessage {...messages.buttonBack} />}
          </Button>
        </div>
      );
    }
    if (index === 1) {
      return (
        <div className={classes.rootBack}>
          <Button
            className={classes.buttonBack}
            onClick={() =>
              this.props.history.replace(`${UrlPath}/fleet-vehicle`)
            }
          >
            <img src={iconBack} className={classes.backIncon} alt="Back icon" />
            {<FormattedMessage {...messages.fleetVehicle} />}
          </Button>
        </div>
      );
    }
    return null;
  }
  displayMenuTabs() {
    const { classes, tabIndex, tabIndexInHeader, vehicleId } = this.props;
    switch (tabIndexInHeader) {
      case 0:
        return (
          <Tabs
            classes={{
              flexContainer: classes.flexContainer,
              root: classes.tabsRoot,
            }}
            value={tabIndex}
            onChange={this.handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            centered
          >
            <Tab
              label={messages.fleetDashboard.defaultMessage}
              classes={{
                root: classes.tabRoot,
                wrapper: classes.wrapper,
                label: classes.label,
                selected: classes.tabSelected,
                textColorSecondary: classes.textColorSecondary,
              }}
              onClick={() =>
                this.props.history.replace(`${UrlPath}/fleet-dashboard`)
              }
            />
            <Tab
              label={messages.fleetVehicle.defaultMessage}
              classes={{
                root: classes.tabRoot,
                wrapper: classes.wrapper,
                label: classes.label,
                selected: classes.tabSelected,
                textColorSecondary: classes.textColorSecondary,
              }}
              onClick={() =>
                this.props.history.replace(`${UrlPath}/fleet-vehicle`)
              }
            />
          </Tabs>
        );
      case 1:
        return (
          <Tabs
            classes={{
              flexContainer: classes.flexContainer,
              root: classes.tabsRoot,
            }}
            value={tabIndex}
            onChange={this.handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            centered
          >
            <Tab
              label={messages.vehicleView.defaultMessage}
              classes={{
                root: classes.tabRoot,
                wrapper: classes.wrapper,
                label: classes.label,
                selected: classes.tabSelected,
                textColorSecondary: classes.textColorSecondary,
              }}
              onClick={() =>
                this.props.history.replace({
                  pathname: `${UrlPath}/vehicle-view`,
                  search: `?id=${vehicleId}`,
                })
              }
            />
            <Tab
              label={messages.vehicleAlert.defaultMessage}
              classes={{
                root: classes.tabRoot,
                wrapper: classes.wrapper,
                label: classes.label,
                selected: classes.tabSelected,
                textColorSecondary: classes.textColorSecondary,
              }}
              onClick={() =>
                this.props.history.replace({
                  pathname: `${UrlPath}/vehicle-alert`,
                  search: `?id=${vehicleId}`,
                })
              }
            />
            <Tab
              label={messages.vehicleSWUpdate.defaultMessage}
              classes={{
                root: classes.tabRoot,
                wrapper: classes.wrapper,
                label: classes.label,
                selected: classes.tabSelected,
                textColorSecondary: classes.textColorSecondary,
              }}
              onClick={() =>
                this.props.history.replace({
                  pathname: `${UrlPath}/vehicle-software-update`,
                  search: `?id=${vehicleId}`,
                })
              }
            />
            <Tab
              label={messages.vehicleSecurity.defaultMessage}
              classes={{
                root: classes.tabRoot,
                wrapper: classes.wrapper,
                label: classes.label,
                selected: classes.tabSelected,
                textColorSecondary: classes.textColorSecondary,
              }}
              onClick={() =>
                this.props.history.replace({
                  pathname: `${UrlPath}/vehicle-security`,
                  search: `?id=${vehicleId}`,
                })
              }
            />
          </Tabs>
        );
      case 2:
        return (
          <Tabs
            classes={{
              flexContainer: classes.flexContainer,
              root: classes.tabsRoot,
            }}
            value={tabIndex}
            onChange={this.handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            centered
          >
            <Tab
              label={messages.vehicle.defaultMessage}
              classes={{
                root: classes.tabRoot,
                wrapper: classes.wrapper,
                label: classes.label,
                selected: classes.tabSelected,
                textColorSecondary: classes.textColorSecondary,
              }}
              onClick={() =>
                this.props.history.replace(`${UrlPath}/vehicle-list`)
              }
            />
            <Tab
              label={messages.user.defaultMessage}
              classes={{
                root: classes.tabRoot,
                wrapper: classes.wrapper,
                label: classes.label,
                selected: classes.tabSelected,
                textColorSecondary: classes.textColorSecondary,
              }}
              onClick={() => this.props.history.replace(`${UrlPath}/user-list`)}
            />
            <Tab
              label={messages.role.defaultMessage}
              classes={{
                root: classes.tabRoot,
                wrapper: classes.wrapper,
                label: classes.label,
                selected: classes.tabSelected,
                textColorSecondary: classes.textColorSecondary,
              }}
              onClick={() => this.props.history.replace(`${UrlPath}/role`)}
            />
            <Tab
              label={messages.ota.defaultMessage}
              classes={{
                root: classes.tabRoot,
                wrapper: classes.wrapper,
                label: classes.label,
                selected: classes.tabSelected,
                textColorSecondary: classes.textColorSecondary,
              }}
              onClick={() => this.props.history.replace(`${UrlPath}/ota`)}
            />
          </Tabs>
        );
      default:
    }
    return null;
  }
  render() {
    const { classes, tabIndexInHeader } = this.props;
    return (
      <Paper className={classes.root}>
        {this.displayButtonBack(tabIndexInHeader)}
        {this.displayMenuTabs()}
      </Paper>
    );
  }
}

MenuTabs.propTypes = {
  tabIndexInHeader: PropTypes.number,
  tabIndex: PropTypes.number,
  classes: PropTypes.object,
  history: PropTypes.object,
  handleChangeTab: PropTypes.func,
  pathname: PropTypes.string,
  vehicleId: PropTypes.string,
};

export default compose(
  withRouter,
  withStyles(styles),
)(MenuTabs);
