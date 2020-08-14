import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import _upperFirst from 'lodash/upperFirst';
import _lowerCase from 'lodash/lowerCase';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { DateFromNow } from 'utils/timeStampUtil';
import { UrlPath } from 'commons/constants';
import Table from 'components/Table';
import Tooltips from 'components/Tooltips';
import AlertIcon from 'components/AlertIcon';
import PanelTitle from 'components/PanelTitle';
import WifiIcon from 'assets/images/ic_wifi.png';
import DisconnectedIcon from 'assets/images/ic_disconnected.png';
import styles from 'styles/jss/containers/vehicleList';
import messages from '../messages';
import { NA, Disconnected } from '../constants';

export class TableVehicle extends React.PureComponent {
  displayIpAddress = connection => {
    const { classes } = this.props;
    const { connected, ipAddress, disconnectedTimestamp } = connection;
    if (connected) {
      return <span className={classes.text}>{ipAddress || 'N/A'}</span>;
    }
    return disconnectedTimestamp ? (
      <span className={classes.textDisconnected}>
        {`${Disconnected} for ${DateFromNow(disconnectedTimestamp)}`}
      </span>
    ) : (
      <span className={classes.textDisconnected}>{Disconnected}</span>
    );
  };

  displayConnection = connection => {
    const { classes } = this.props;
    return connection.connected ? (
      <img className={classes.connectionIcon} src={WifiIcon} alt="connected" />
    ) : (
      <img
        className={classes.connectionIcon}
        src={DisconnectedIcon}
        alt="disconnected"
      />
    );
  };

  displayAlerts = alertCount => {
    const { classes } = this.props;
    const { danger, warning } = alertCount;
    if (danger || warning) {
      return danger ? (
        <Tooltips type="ALERT" content={alertCount}>
          <AlertIcon
            type="CRITICAL"
            className={classes.alertIcon}
            size="large"
          />
          <span className={classes.alertCount}>
            {danger + warning || danger}
          </span>
        </Tooltips>
      ) : (
        <Tooltips type="ALERT" content={alertCount}>
          <AlertIcon
            type="WARNING"
            className={classes.alertIcon}
            size="large"
          />
          <span className={classes.alertCount}>{warning}</span>
        </Tooltips>
      );
    }
    return null;
  };

  displayHeader = title => (
    <PanelTitle
      title={<FormattedMessage {...messages[title]} />}
      subtitle={4}
    />
  );

  redirectToVehicleView = id => {
    this.props.history.replace({
      pathname: `${UrlPath}/vehicle-view`,
      search: `?id=${id}`,
    });
  };

  displayDetailButton = vehicleId => {
    const { selectedRow, classes } = this.props;
    return (
      vehicleId === selectedRow && (
        <Button
          className={classes.detailButton}
          onClick={() => this.redirectToVehicleView(vehicleId)}
        >
          <FormattedMessage {...messages.forDetail} />
        </Button>
      )
    );
  };

  render() {
    const { classes, data, selectedRow, onChangeSelectRow } = this.props;
    const columns = [
      {
        id: 'name',
        Header: this.displayHeader('name'),
        accessor: row => <span className={classes.text}>{row.name || NA}</span>,
      },
      {
        id: 'status',
        Header: this.displayHeader('status'),
        accessor: row => (
          <span className={classes.text}>
            {_upperFirst(_lowerCase(row.connection.status)) || NA}
          </span>
        ),
      },
      {
        id: 'ip',
        Header: this.displayHeader('ip'),
        accessor: row => this.displayIpAddress(row.connection),
      },
      {
        id: 'connection',
        Header: this.displayHeader('connection'),
        accessor: row => this.displayConnection(row.connection),
        style: { paddingLeft: '20px' },
      },
      {
        id: 'alert',
        Header: this.displayHeader('alert'),
        accessor: row => this.displayAlerts(row.alertCount),
        style: { paddingLeft: '20px' },
      },
      {
        id: 'detail',
        accessor: row => this.displayDetailButton(row.id),
        style: { textAlign: 'center' },
      },
    ];
    return (
      <Table
        data={data || []}
        columns={columns}
        selectedRow={selectedRow}
        handleChangeColumn={onChangeSelectRow}
      />
    );
  }
}

TableVehicle.propTypes = {
  data: PropTypes.array.isRequired,
  selectedRow: PropTypes.string.isRequired,
  onChangeSelectRow: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  withRouter,
)(TableVehicle);
