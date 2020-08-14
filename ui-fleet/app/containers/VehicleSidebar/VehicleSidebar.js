/**
 *
 * VehicleSidebar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import { parseQuery } from 'utils/actionUtils';
import styles from 'styles/jss/containers/vehicleSidebarInfor';
import VehicleInfo from '../VehicleInfo/Loadable';
import VehicleMenu from '../VehicleMenu/Loadable';
import messages from './messages';

export class VehicleSidebar extends React.PureComponent {
  componentDidMount() {
    const { location } = this.props;
    const { id } = parseQuery(location.search);
    if (id) {
      this.props.getDataEcu(id);
    }
  }
  handleChange = (event, value) => {
    this.props.changeTabIndex(value);
  };
  render() {
    const { classes, vehicleSidebar } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent className={classes.tabHeader}>
          <Tabs
            classes={{
              indicator: classes.tabIndicator,
              root: classes.rootHeader,
              flexContainer: classes.flexContainer,
            }}
            value={vehicleSidebar.tabIndex}
            onChange={this.handleChange}
          >
            <Tab
              classes={{
                root: classes.tabRoot,
                label: classes.tabLabel,
                selected: classes.tabSelected,
              }}
              label={<FormattedMessage {...messages.titleVehicleInfo} />}
            />
            <Tab
              classes={{
                root: classes.tabRoot,
                label: classes.tabLabel,
                selected: classes.tabSelected,
              }}
              label={<FormattedMessage {...messages.titleVehicleECU} />}
            />
          </Tabs>
        </CardContent>
        <Divider className={classes.divider} />
        {vehicleSidebar.tabIndex === 0 && (
          <CardContent className={classes.tabContent}>
            <VehicleInfo />
          </CardContent>
        )}
        {vehicleSidebar.tabIndex === 1 && <VehicleMenu />}
      </Card>
    );
  }
}

VehicleSidebar.propTypes = {
  vehicleSidebar: PropTypes.object.isRequired,
  changeTabIndex: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  getDataEcu: PropTypes.func.isRequired,
};

export default withStyles(styles)(VehicleSidebar);
