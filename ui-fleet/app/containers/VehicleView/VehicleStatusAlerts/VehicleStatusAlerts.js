import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import _startCase from 'lodash/startCase';
import _lowerCase from 'lodash/lowerCase';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import VehicleAlertIcon from 'components/VehicleAlertIcon';
import CardHeader from 'components/CardHeader';
import AlertIcon from 'components/AlertIcon';
import { DateFormat } from 'utils/timeStampUtil';
import { parseQuery } from 'utils/actionUtils';
import styles from 'styles/jss/containers/vehicleStatusAlerts';
import messages from './messages';

export class VehicleStatusAlerts extends React.PureComponent {
  displayListAlert = item => {
    const { classes } = this.props;
    return (
      <ListItem
        key={item.id}
        classes={{
          container: classes.listItemContainer,
          gutters: classes.listItemGutters,
        }}
        divider
      >
        <ListItemIcon className={classes.itemIcon}>
          <AlertIcon type={item.alertType} size="large" />
        </ListItemIcon>
        <ListItemText
          primary={_startCase(
            _lowerCase(`${item.componentType} ${item.alertType}`),
          )}
          secondary={item.detailInfo}
          classes={{
            root: classes.textRoot,
            primary: classes.textPrimary,
            secondary: classes.textSecondary,
          }}
        />
        <ListItemSecondaryAction
          classes={{ root: classes.secondaryActionRoot }}
        >
          <Typography className={classes.textDate}>
            {DateFormat(item.timestamp)}
          </Typography>
        </ListItemSecondaryAction>
      </ListItem>
    );
  };

  displayListStatus = (item, status) => {
    const { classes } = this.props;
    return (
      <Grid key={item.componentName} className={classes.gridItem} item xs={4}>
        <VehicleAlertIcon
          status={item.status}
          name={item.componentName}
          enable={status[item.componentName]}
        />
      </Grid>
    );
  };

  componentDidMount() {
    const {
      handleJoinDeviceDataRoom,
      getComponentStatusAlerts,
      location,
    } = this.props;
    const { id } = parseQuery(location.search);
    // Join room
    setTimeout(() => {
      handleJoinDeviceDataRoom(id);
    }, 3000);
    getComponentStatusAlerts(id);
  }

  componentWillUnmount() {
    const { handleLeaveDeviceDataRoom, location } = this.props;
    const { id } = parseQuery(location.search);
    handleLeaveDeviceDataRoom(id);
  }

  render() {
    const { classes, vehicleStatusAlerts, vehicleView } = this.props;
    let check = false;
    const status = {
      ENGINE: vehicleView.status.MIL_ENGINE,
      TIRE_PRESSURE: vehicleView.status.MIL_TIRE_PRESSURE,
      ENGINE_OIL: vehicleView.status.MIL_ENGINE_OIL,
      BRAKES: vehicleView.status.MIL_BRAKES,
      ENGINE_COOLANT: vehicleView.status.MIL_ENGINE_COOLANT,
      BATTERY: vehicleView.status.MIL_BATTERY,
    };
    Object.entries(status).forEach(([key]) => {
      if (status[key]) check = true;
    });
    if (!check) {
      return (
        <div className="vehicle-status-alerts">
          <div className="overlay-in-vehicle-status-alert">
            <div className="text">
              <FormattedMessage {...messages.notAvailableMessage} />
            </div>
          </div>
        </div>
      );
    }
    return (
      <Card className={classes.card}>
        <CardHeader
          title={<FormattedMessage {...messages.title} />}
          type="warning"
        />
        <CardContent className={classes.cardContent}>
          <Grid className={classes.gridContainer} container>
            {vehicleStatusAlerts.dataStatus &&
              vehicleStatusAlerts.dataStatus.map(item =>
                this.displayListStatus(item, status),
              )}
          </Grid>
          <Divider />
          <List className={classes.list}>
            {vehicleStatusAlerts.dataAlerts.length ? (
              vehicleStatusAlerts.dataAlerts.map(item =>
                this.displayListAlert(item),
              )
            ) : (
              <div className={classes.listNoData}>
                <FormattedMessage {...messages.noDataAlerts} />
              </div>
            )}
          </List>
        </CardContent>
      </Card>
    );
  }
}

VehicleStatusAlerts.propTypes = {
  vehicleView: PropTypes.object,
  vehicleStatusAlerts: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  getComponentStatusAlerts: PropTypes.func.isRequired,
  handleJoinDeviceDataRoom: PropTypes.func.isRequired,
  handleLeaveDeviceDataRoom: PropTypes.func.isRequired,
  vehicleInfo: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withStyles(styles)(VehicleStatusAlerts);
