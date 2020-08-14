/*
 * @Author: DatNT62 
 * @Date: 2018-11-13 08:57:50 
 * @Last Modified by: DanND1
 * @Last Modified time: 2018-12-10 15:03:26
 */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Doughnut } from 'react-chartjs-2';
import { withStyles } from '@material-ui/core/styles';
import styles from 'styles/jss/containers/totalVehicleChart';
import PanelTitle from 'components/PanelTitle';
import messages from './messages';

class TotalVehicleChart extends React.PureComponent {
  componentDidMount() {
    const {
      handleJoinVehicleOnlineStatisticRoom,
      handleGetTotalVehicle,
      totalVehicleChart,
    } = this.props;
    setTimeout(() => {
      handleJoinVehicleOnlineStatisticRoom();
    }, 3000);
    if (totalVehicleChart.total === 0) {
      handleGetTotalVehicle();
    }
  }
  componentWillUnmount() {
    this.props.handleLeaveVehicleOnlineStatisticRoom();
  }
  render() {
    const { totalVehicleChart, classes } = this.props;
    const inputData = {
      datasets: [
        {
          data: [totalVehicleChart.connected, totalVehicleChart.disconnected],
          backgroundColor: ['#15CD00', '#888'],
          borderWidth: [0, 0],
        },
      ],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: ['Connected', 'Disconnected'],
    };
    const options = {
      legend: {
        display: false,
      },
      maintainAspectRatio: true,
      responsive: true,
      cutoutPercentage: 65,
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            let label = data.labels[tooltipItem.index] || '';
            if (label) {
              label += ': ';
            }
            label += data.datasets[0].data[tooltipItem.index]
              .toFixed(0)
              .replace(/\d(?=(\d{3})+$)/g, '$&,');
            return label;
          },
        },
      },
    };
    const total = Number(totalVehicleChart.total)
      .toFixed(0)
      .replace(/\d(?=(\d{3})+$)/g, '$&,');
    const connected = Number(totalVehicleChart.connected)
      .toFixed(0)
      .replace(/\d(?=(\d{3})+$)/g, '$&,');
    const disconnected = Number(totalVehicleChart.disconnected)
      .toFixed(0)
      .replace(/\d(?=(\d{3})+$)/g, '$&,');
    return (
      <div className={classes.root}>
        <PanelTitle
          title={<FormattedMessage {...messages.totalVehicle} />}
          subtitle={2}
        />
        <div className={`${classes.totalChartWrapper}`}>
          <div className={classes.totalChart}>
            <div className={classes.doughnutSummary}>
              <div className={classes.doughnutSummaryTitle}>
                <FormattedMessage {...messages.doughnutSummaryTitle} />
              </div>
              <div className={classes.doughnutSummaryNumber}>{total}</div>
            </div>
            <div className="totalChart">
              <Doughnut
                data={inputData}
                options={options}
                width={255}
                height={255}
              />
            </div>
          </div>
          <div className={classes.totalDetailWrapper}>
            <div className={classes.legend}>
              <div className={classes.connectedLegend}>
                <div className={classes.lengendColor} />
                <div className={classes.legendTitle}>
                  <FormattedMessage {...messages.connected} />
                </div>
              </div>
              <div className={classes.disconnectedLegend}>
                <div className={classes.lengendColor} />
                <div className={classes.legendTitle}>
                  <FormattedMessage {...messages.disconnected} />
                </div>
              </div>
            </div>
            <div className={classes.totalDetail}>
              <div className={`${classes.total} ${classes.wrapTotal}`}>
                <div className={classes.title}>
                  <FormattedMessage {...messages.total} />
                </div>
                <div className={classes.data}>{total}</div>
              </div>
              <div className={`${classes.connected} ${classes.wrapTotal}`}>
                <div className={classes.title}>
                  <FormattedMessage {...messages.connected} />:
                </div>
                <div className={classes.data}>{connected}</div>
              </div>
              <div className={`${classes.disconnected} ${classes.wrapTotal}`}>
                <div className={classes.title}>
                  <FormattedMessage {...messages.disconnected} />:
                </div>
                <div className={classes.data}>{disconnected}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TotalVehicleChart.propTypes = {
  classes: PropTypes.object,
  totalVehicleChart: PropTypes.object,
  handleGetTotalVehicle: PropTypes.func,
  handleJoinVehicleOnlineStatisticRoom: PropTypes.func.isRequired,
  handleLeaveVehicleOnlineStatisticRoom: PropTypes.func.isRequired,
};

export default withStyles(styles)(TotalVehicleChart);
