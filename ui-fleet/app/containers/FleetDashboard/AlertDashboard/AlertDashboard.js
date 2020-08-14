/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 08:59:44 
 * @Last Modified by: DanND1
 * @Last Modified time: 2018-12-10 15:14:45
 */
/**
 *
 * AlertDashboard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import styles from 'styles/jss/containers/alertsDashboard';
import { dateFormat } from 'commons/constants';
import CardHeader from 'components/CardHeader/Loadable';
import AlertIcon from 'components/AlertIcon/Loadable';
import messages from './messages';

let listData = [];
let showAll = 0;
let currentData = 0;

export class AlertDashboard extends React.PureComponent {
  componentDidMount() {
    const { handleJoinNoticationRoom, getAllAlert } = this.props;
    setTimeout(() => {
      handleJoinNoticationRoom();
    }, 3000);
    getAllAlert();
  }

  componentWillReceiveProps(nextProps) {
    const { alertsDashboard } = this.props;
    if (nextProps.alertsDashboard.data !== alertsDashboard.data) {
      if (alertsDashboard.currentIndex === 1) {
        this.handleNotificationFilter(0);
      } else if (alertsDashboard.currentIndex === 2) {
        this.handleNotificationFilter(1);
      } else if (alertsDashboard.currentIndex === 3) {
        this.handleNotificationFilter(2);
      }
    }
  }

  componentWillUnmount() {
    this.props.handleLeaveNotificationRoom();
  }
  displayIcon = type => {
    if (type === 0) {
      return <AlertIcon type="WARNING" size="large" />;
    } else if (type === 1) {
      return <AlertIcon type="CRITICAL" size="large" />;
    } else if (type === 2) {
      return <AlertIcon type="INFO" size="large" />;
    }
    return null;
  };
  goToVehicleList = () => {
    this.props.goToVehicleList();
  };
  getOnClickButton(id) {
    this.props.getClickButton(this.props.alertsDashboard.onClickButton, id);
    this.handleDataFilter(id);
  }
  handleDataFilter(id) {
    switch (id) {
      case 0:
        this.props.getCriticalFilter();
        this.handleNotificationFilter(1);
        return this.handleChangeButtonAlert(id);
      case 1:
        this.props.getAlertFilter();
        this.handleNotificationFilter(0);
        return this.handleChangeButtonAlert(id);
      case 2:
        this.props.getAlertFilter();
        this.handleNotificationFilter(2);
        return this.handleChangeButtonAlert(id);
      default:
    }
    return null;
  }
  handleNotificationFilter = id => {
    const { alertsDashboard, filterMarker } = this.props;
    const listFilter = [];
    for (let i = 0; i < alertsDashboard.data.length; i += 1) {
      if (alertsDashboard.data[i].type === id) {
        listFilter.push(alertsDashboard.data[i]);
      }
    }
    listData = listFilter;
    filterMarker(listData);
  };
  componentDidUpdate() {
    const { filterMarker } = this.props;
    filterMarker(listData);
    if (this.props.alertsDashboard.onClickButton === 'all') {
      this.handleChangeButtonAlert(false);
    }
  }
  handleChangeButtonAlert(filter) {
    this.props.handleChangeButtonAlert(filter);
  }
  displayContentButton(type) {
    const { classes } = this.props;
    switch (type) {
      case 'critical':
        return (
          <span>
            <AlertIcon
              size="small"
              type="CRITICAL"
              className={classes.btnIcon}
            />
            <span className={classes.titleAlert}>
              <FormattedMessage {...messages.critical} />
            </span>
          </span>
        );
      case 'alert':
        return (
          <span>
            <AlertIcon
              size="small"
              type="WARNING"
              className={classes.btnIcon}
            />
            <span className={classes.titleAlert}>
              <FormattedMessage {...messages.alert} />
            </span>
          </span>
        );
      case 'normal':
        return (
          <span>
            <AlertIcon size="small" type="INFO" className={classes.btnIcon} />
            <span className={classes.titleAlert}>
              <FormattedMessage {...messages.information} />
            </span>
          </span>
        );
      default:
    }
    return null;
  }
  render() {
    const { classes, alertsDashboard } = this.props;
    currentData = alertsDashboard.currentIndex;
    if (currentData === showAll) {
      showAll = 0;
    } else {
      showAll = currentData;
    }
    if (showAll === 0) {
      listData = alertsDashboard.data;
    }
    return (
      <Card className={classes.card}>
        <CardHeader
          title={<FormattedMessage {...messages.title} />}
          type="warning"
        />
        <CardContent className={classes.cardContent}>
          <Grid className={classes.grid} spacing={16} container>
            <div className={classes.allList}>
              <Button
                onClick={() => this.goToVehicleList()}
                className={classes.btnList}
              >
                {messages.btnTitle.defaultMessage} : {listData.length}
              </Button>
            </div>
            <div className={classes.noteAlert}>
              <Tabs
                value={alertsDashboard.filter}
                className={classes.tabs}
                onChange={this.handleChange}
                classes={{
                  root: classes.tabsRoot,
                  indicator: classes.tabsIndicator,
                }}
                fullWidth
                indicatorColor="secondary"
                textColor="secondary"
              >
                <Tab
                  value={1}
                  label={this.displayContentButton('critical')}
                  className={classes.tab}
                  onClick={() => this.getOnClickButton(1)}
                  classes={{
                    labelContainer: classes.labelContainer,
                    label: classes.tabLabel,
                  }}
                />
                <Tab
                  value={0}
                  label={this.displayContentButton('alert')}
                  className={classes.tab}
                  onClick={() => this.getOnClickButton(0)}
                  classes={{
                    labelContainer: classes.labelContainer,
                    label: classes.tabLabel,
                  }}
                />
                <Tab
                  value={2}
                  label={this.displayContentButton('normal')}
                  className={classes.tab}
                  onClick={() => this.getOnClickButton(2)}
                  classes={{
                    labelContainer: `${classes.labelContainer} ${
                      classes.btnNormal
                    }`,
                    label: classes.tabLabel,
                  }}
                />
              </Tabs>
            </div>
          </Grid>
          {listData.length === 0 ? (
            <div className={classes.messageList}>
              <FormattedMessage {...messages.messageListStatus} />
            </div>
          ) : (
            <List className={classes.list}>
              <Divider />
              {listData.map(item => (
                <ListItem
                  onClick={() => this.props.goToVehicleSecurity()}
                  key={item.id}
                  classes={{
                    container: classes.listItemContainer,
                  }}
                  divider
                >
                  <ListItemIcon>{this.displayIcon(item.type)}</ListItemIcon>
                  <ListItemText>
                    <span className={classes.textvehicleId}>
                      {item.vehicleId}
                    </span>
                    <br />
                    <span className={classes.textDescription}>
                      {item.description}
                    </span>
                  </ListItemText>
                  <ListItemSecondaryAction
                    classes={{ root: classes.secondaryActionRoot }}
                  >
                    <Typography className={classes.date}>
                      {moment.unix(item.dateTime).format(dateFormat)}
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    );
  }
}

AlertDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  alertsDashboard: PropTypes.object.isRequired,
  getAllAlert: PropTypes.func.isRequired,
  filterMarker: PropTypes.func.isRequired,
  handleLeaveNotificationRoom: PropTypes.func.isRequired,
  handleJoinNoticationRoom: PropTypes.func.isRequired,
  getAlertFilter: PropTypes.func.isRequired,
  getCriticalFilter: PropTypes.func.isRequired,
  getInformationFilter: PropTypes.func.isRequired,
  goToVehicleList: PropTypes.func.isRequired,
  goToVehicleSecurity: PropTypes.func.isRequired,
  handleChangeButtonAlert: PropTypes.func.isRequired,
  getClickButton: PropTypes.func.isRequired,
};

export default withStyles(styles)(AlertDashboard);
