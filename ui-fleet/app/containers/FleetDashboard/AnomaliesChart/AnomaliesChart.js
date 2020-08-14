/*
 * @Author: DatNT62 
 * @Date: 2018-11-13 09:00:34 
 * @Last Modified by: DanND1
 * @Last Modified time: 2018-12-10 15:14:18
 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import { Bar } from 'react-chartjs-2';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import PanelTitle from 'components/PanelTitle';
import styles from 'styles/jss/containers/anomaliesChart';
import messages from './messages';
import optionsForChart from './optionsForChart';
import optionsForFormControl from './optionsForFormControl';

class AnomaliesChart extends React.PureComponent {
  handleChangeDuration = e => {
    this.props.onChangeDuration(e.target.value);
  };

  componentDidUpdate(prevProps) {
    const { anomaliesChart, onGetAnomalies } = this.props;
    if (prevProps.anomaliesChart.duration !== anomaliesChart.duration) {
      onGetAnomalies(anomaliesChart.duration);
    }
  }

  componentDidMount() {
    const {
      anomaliesChart,
      handleJoinNoticationRoom,
      onGetAnomalies,
    } = this.props;
    setTimeout(() => {
      handleJoinNoticationRoom();
    }, 3000);
    onGetAnomalies(anomaliesChart.duration);
  }

  componentWillUnmount() {
    this.props.handleLeaveNotificationRoom();
  }

  render() {
    const { anomaliesChart, classes } = this.props;
    const detectedLabel = messages.detectedLabel.defaultMessage;
    const blockedLabel = messages.blockedLabel.defaultMessage;
    let labelData;
    switch (anomaliesChart.duration) {
      case '1':
      case '2':
      case '3':
      case '4':
        labelData = anomaliesChart.data.map(item =>
          moment(item.timestamp).format('HH:mm'),
        );
        labelData[labelData.length - 1] = 'Now';
        break;
      case '5':
      case '6':
        labelData = anomaliesChart.data.map(item =>
          moment(item.timestamp).format('ddd HH:mm'),
        );
        labelData[labelData.length - 1] = 'Now';
        break;
      case '7':
      case '8':
        labelData = anomaliesChart.data.map(item =>
          moment(item.timestamp).format('MMM Do'),
        );
        labelData[labelData.length - 1] = 'Today';
        break;
      case '9':
        labelData = anomaliesChart.data.map(item =>
          moment(item.timestamp).format('MMM'),
        );
        break;
      default:
        break;
    }
    const detectedData = anomaliesChart.data.map(item => item.detected);
    const blockedData = anomaliesChart.data.map(item => item.blocked);
    const data = {
      labels: labelData,
      datasets: [
        {
          label: detectedLabel,
          data: detectedData,
          backgroundColor: '#009FD9',
          borderColor: '#009FD9',
          borderWidth: 1,
        },
        {
          label: blockedLabel,
          data: blockedData,
          backgroundColor: '#D9187F',
          borderColor: '#D9187F',
          borderWidth: 1,
        },
      ],
    };

    return (
      <React.Fragment>
        <PanelTitle
          title={<FormattedMessage {...messages.anomalies} />}
          subtitle={2}
        />
        <div className={classes.root}>
          <FormControl className={classes.formControl}>
            <NativeSelect
              value={anomaliesChart.duration}
              onChange={this.handleChangeDuration}
              name="duration"
              classes={{
                root: classes.rootSelect,
                select: classes.select,
              }}
            >
              {optionsForFormControl.map(item => (
                <option value={item.id} key={item.id}>
                  {item.value}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
          <div className={`${classes.chart} animaliesChart`}>
            <Bar
              data={data}
              options={optionsForChart}
              width={100}
              height={40}
            />
          </div>
          <div className={classes.backgroundChart} />
          <div className={classes.line} />
        </div>
      </React.Fragment>
    );
  }
}

AnomaliesChart.propTypes = {
  anomaliesChart: PropTypes.object,
  classes: PropTypes.object,
  onChangeDuration: PropTypes.func,
  handleLeaveNotificationRoom: PropTypes.func.isRequired,
  handleJoinNoticationRoom: PropTypes.func.isRequired,
  onGetAnomalies: PropTypes.func.isRequired,
};

export default withStyles(styles)(AnomaliesChart);
