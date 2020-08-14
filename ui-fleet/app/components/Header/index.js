/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { UrlPath } from 'commons/constants';
import styles from 'styles/jss/containers/header';
import Logo from 'assets/images/header_logo.png';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import messages from './messages';

class Header extends React.PureComponent {
  handleChange = (event, value) => {
    const { handleChangeTabInHeader } = this.props;
    handleChangeTabInHeader(value);
  };

  render() {
    const { classes, tabIndexInHeader, displayName, vehicleId } = this.props;
    return (
      <AppBar className={classes.root} position="static">
        <Toolbar className={classes.AppBar}>
          <Button
            onClick={() =>
              this.props.history.replace(`${UrlPath}/fleet-dashboard`)
            }
            className={classes.logo}
          >
            <img alt="logo" src={Logo} />
          </Button>
          <Tabs
            className={classes.tabs}
            value={tabIndexInHeader}
            onChange={this.handleChange}
            indicatorColor="secondary"
            classes={{
              indicator: classes.tabsIndicator,
              flexContainer: classes.flexContainer,
            }}
            centered
          >
            <Tab
              className={classes.tab}
              label={messages.fleet.defaultMessage}
              classes={{
                root: classes.tabRoot,
                selected: classes.tabSelected,
                label: classes.label,
              }}
              onClick={() =>
                this.props.history.replace(`${UrlPath}/fleet-dashboard`)
              }
            />
            <Tab
              className={classes.tab}
              label={messages.vehicle.defaultMessage}
              classes={{
                root: classes.tabRoot,
                selected: classes.tabSelected,
                label: classes.label,
              }}
              onClick={() =>
                this.props.history.replace({
                  pathname: `${UrlPath}/vehicle-view`,
                  search: `?id=${vehicleId}`,
                })
              }
            />
            <Tab
              className={classes.tab}
              label={messages.data.defaultMessage}
              classes={{
                root: classes.tabRoot,
                selected: classes.tabSelected,
                label: classes.label,
              }}
              onClick={() =>
                this.props.history.replace(`${UrlPath}/vehicle-list`)
              }
            />
          </Tabs>
          <div className={classes.userGroup}>
            <Button className={classes.buttonUser}>
              <SettingsIcon className={classes.iconUser} />
              <FormattedMessage {...messages.administration} />
            </Button>
            <div className={classes.dropdown}>
              <Button className={`${classes.buttonUser} ${classes.tooltip}`}>
                <PersonIcon className={classes.iconUser} />
                {displayName || ''}
              </Button>
              <div className={classes.dropdownContent}>
                <Button
                  className={classes.dropdownItem}
                  onClick={() => this.props.handleLogOut()}
                >
                  <FormattedMessage {...messages.logout} />
                </Button>
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  displayName: PropTypes.string,
  tabIndexInHeader: PropTypes.number,
  classes: PropTypes.object,
  history: PropTypes.object,
  handleChangeTabInHeader: PropTypes.func,
  vehicleId: PropTypes.string,
  handleLogOut: PropTypes.func,
};

export default compose(
  withRouter,
  withStyles(styles),
)(Header);
