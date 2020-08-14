import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { Line } from 'react-chartjs-2';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

import CardHeader from 'components/CardHeader';
import {
  withStyles,
  Tabs,
  Tab,
  Card,
  CardContent,
  FormControl,
  NativeSelect,
  Typography,
} from '@material-ui/core';

import styles from 'styles/jss/containers/timeDataGraph';
import messages from './messages';
import optionArray from './optionsFormControl';

class TimeDataGraph extends PureComponent {
  componentWillMount() {
    this.props.joinNotificationRoom();
  }
  componentWillUnmount() {
    this.props.leaveNotificationRoom();
  }
  componentDidUpdate(prevProps) {
    const { timedatagraph } = this.props;
    if (
      prevProps.timedatagraph.tabIndex !== timedatagraph.tabIndex ||
      prevProps.timedatagraph.duration !== timedatagraph.duration
    ) {
      if (timedatagraph.tabIndex === 0 && timedatagraph.duration === '0') {
        this.handleGetDataSpeed();
      } else if (
        timedatagraph.tabIndex === 1 &&
        timedatagraph.duration === '0'
      ) {
        this.handleGetDataRpm();
      } else if (
        timedatagraph.tabIndex === 0 &&
        timedatagraph.duration === '1'
      ) {
        this.handleGetDataSpeedFilter();
      } else if (
        timedatagraph.tabIndex === 1 &&
        timedatagraph.duration === '1'
      ) {
        this.handleGetDataRpmFilter();
      }
    }
  }
  componentDidMount() {
    const { timedatagraph } = this.props;
    if (timedatagraph.tabIndex === 0 && timedatagraph.duration === '0') {
      this.handleGetDataSpeed();
    } else if (timedatagraph.tabIndex === 1 && timedatagraph.duration === '0') {
      this.handleGetDataRpm();
    } else if (timedatagraph.tabIndex === 0 && timedatagraph.duration === '1') {
      this.handleGetDataSpeedFilter();
    } else if (timedatagraph.tabIndex === 1 && timedatagraph.duration === '1') {
      this.handleGetDataRpmFilter();
    }
  }
  handleGetDataSpeed = () => {
    const { location } = this.props;
    const vehicleId = qs.parse(location.search)['?id'] || '';
    const timeSeriesOption = '';
    const date = new Date();
    const timestamp = date.getTime() * 1000000 - 7000000000;
    this.props.onGetDataSpeedFilter(vehicleId, timestamp, timeSeriesOption);
  };
  handleGetDataRpm = () => {
    const { location } = this.props;
    const vehicleId = qs.parse(location.search)['?id'] || '';
    const timeSeriesOption = '';
    const date = new Date();
    const timestamp = date.getTime() * 1000000 - 7000000000;
    this.props.onGetDataRpmFilter(vehicleId, timestamp, timeSeriesOption);
  };
  handleGetDataSpeedFilter = () => {
    const { location } = this.props;
    const vehicleId = qs.parse(location.search)['?id'] || '';
    const timeSeriesOption = '2100000000000';
    const date = new Date();
    const timestamp = date.getTime() * 1000000 - 2100000000000;
    this.props.onGetDataSpeedFilter(vehicleId, timestamp, timeSeriesOption);
  };
  handleGetDataRpmFilter = () => {
    const { location } = this.props;
    const vehicleId = qs.parse(location.search)['?id'] || '';
    const timeSeriesOption = '2100000000000';
    const date = new Date();
    const timestamp = date.getTime() * 1000000 - 2100000000000;
    this.props.onGetDataRpmFilter(vehicleId, timestamp, timeSeriesOption);
  };
  handleChangeTab = (event, value) => {
    const { handleChangeTab } = this.props;
    handleChangeTab(value);
  };
  handleChangeDuration = () => event => {
    const { handleChangeDuration } = this.props;
    handleChangeDuration(event.target.value);
  };
  render() {
    const { timedatagraph, classes, vehicleView } = this.props;
    const listData = timedatagraph.data;
    for (let i = 0; i < listData.length; i += 1) {
      listData[i].value = listData[i].value || 0;
    }
    const Result = vehicleView.status;
    const checkSpeedGraph = Result.SPEED_GRAPH;
    const checkRPMGraph = Result.RPM_GRAPH;
    const checkBrankingGraph = Result.BRAKING_GRAPH;
    const checkMPGGraph = Result.MPG_GRAPH;
    const check =
      !checkSpeedGraph &&
      !checkRPMGraph &&
      !checkBrankingGraph &&
      !checkMPGGraph;
    const returnUI = (checkStatus, label) => {
      if (checkStatus) {
        return (
          <Tab
            className={classes.tab}
            classes={{
              selected: classes.tabSelected,
              label: classes.tabLabel,
              labelContainer: classes.tabLabelContainer,
            }}
            label={label}
          />
        );
      }
      return null;
    };
    const index = timedatagraph.tabIndex;
    let labelData;
    switch (timedatagraph.duration) {
      case '0':
      case '1':
        labelData = listData.map(item =>
          moment.unix(item.timestamp / 1000000000).format('H:mm:ss'),
        );
        labelData[labelData.length - 1] = 'Now';
        break;
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        labelData = listData.map(item =>
          moment.unix(item.timestamp / 1000000000).format('ddd HH:mm'),
        );
        labelData[labelData.length - 1] = 'Now';
        break;
      default:
        break;
    }
    let dataInTime;
    switch (index) {
      case 0:
        dataInTime = listData.map(item => item.value);
        break;
      case 1:
        dataInTime = listData.map(item => item.value);
        break;
      case 2:
        dataInTime = listData.map(item => item.value);
        break;
      case 3:
        dataInTime = listData.map(item => item.value);
        break;
      default:
        dataInTime = [];
        break;
    }
    let unit;
    switch (index) {
      case 0:
        unit = messages.speedUnit.defaultMessage;
        break;
      case 1:
        unit = messages.rpmUnit.defaultMessage;
        break;
      case 2:
        unit = messages.brakingUnit.defaultMessage;
        break;
      case 3:
        unit = messages.mpgUnit.defaultMessage;
        break;
      default:
        unit = '';
        break;
    }
    const data = {
      labels: labelData,
      datasets: [
        {
          lineTension: '0',
          pointBackgroundColor: '#BB2053',
          fill: 'false',
          data: dataInTime,
          borderColor: ['#BB2053'],
          borderWidth: 3,
        },
      ],
    };
    const options = {
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: unit,
            },
            ticks: {
              maxTicksLimit: 5,
              beginAtZero: true,
              suggestedMax: 50,
            },
          },
        ],
      },
    };

    if (check) {
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
      <Card className={classes.container}>
        <CardHeader type="time" title={messages.title.defaultMessage} />
        <CardContent className={classes.cardContent}>
          <div className={classes.filter}>
            <Tabs value={index} onChange={this.handleChangeTab}>
              {returnUI(checkSpeedGraph, messages.speed.defaultMessage)}
              {returnUI(checkRPMGraph, messages.rpm.defaultMessage)}
              {returnUI(checkBrankingGraph, messages.braking.defaultMessage)}
              {returnUI(checkMPGGraph, messages.mpg.defaultMessage)}
            </Tabs>
            <FormControl className={classes.formControl}>
              <NativeSelect
                value={timedatagraph.duration}
                onChange={this.handleChangeDuration()}
                name="duration"
              >
                {optionArray.map(item => (
                  <option value={item.id} key={item.id}>
                    {item.value}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          </div>
          <Typography className={`${classes.typography} timeChartDetail`}>
            <Line data={data} options={options} height={100} />
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

TimeDataGraph.propTypes = {
  vehicleView: PropTypes.object,
  vehicleInfo: PropTypes.object,
  timedatagraph: PropTypes.object,
  classes: PropTypes.object,
  handleChangeTab: PropTypes.func,
  joinNotificationRoom: PropTypes.func,
  leaveNotificationRoom: PropTypes.func,
  handleChangeDuration: PropTypes.func,
  getDataSpeed: PropTypes.func,
  getDataRpm: PropTypes.func,
  location: PropTypes.object.isRequired,
  onGetDataSpeedFilter: PropTypes.func.isRequired,
  onGetDataRpmFilter: PropTypes.func.isRequired,
};

export default withStyles(styles)(TimeDataGraph);
