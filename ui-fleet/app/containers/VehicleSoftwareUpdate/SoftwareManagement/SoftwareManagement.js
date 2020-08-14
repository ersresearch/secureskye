import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ReactTable from 'react-table';
import { UrlPath } from 'commons/constants';
import { withStyles, Card, CardContent, Tabs, Tab } from '@material-ui/core';
import CachedIcon from 'assets/images/ic_cached.png';
import CardHeader from 'components/CardHeader';
import PanelTitle from 'components/PanelTitle';
import Tooltips from 'components/Tooltips';
import styles from 'styles/jss/containers/softwareManagement';
import messages from './messages';
import { NA } from '../constants';

export class SoftwareManagement extends React.Component {
  componentDidMount() {
    const { ECUList } = this.props;
    this.props.changeButtonFilter(0);
    this.displayButtonSeeMore('');
    if (ECUList.data !== undefined) {
      this.props.changeDataFilter(ECUList.data, null);
    }
  }
  componentDidUpdate() {
    const { ECUList, SWManagement } = this.props;
    if (SWManagement.buttonID === '') {
      if (
        SWManagement.dataFilter.length === 0 &&
        SWManagement.filter === 0 &&
        ECUList.data.length > 0
      ) {
        return this.displayButtonSeeMore(ECUList.data[0].id);
      }
      if (SWManagement.dataFilter.length > 0) {
        return this.displayButtonSeeMore(SWManagement.dataFilter[0].id);
      }
    }
    return null;
  }
  handleChangeFilterECU = (e, index) => {
    this.props.changeButtonFilter(index);
  };
  displayStyleAlertStatus(type, status) {
    const { classes } = this.props;
    switch (status) {
      case 'WARNING':
        if (type === 'circle') {
          return classes.circleALert;
        }
        return classes.textALert;
      case 'CRITICAL':
        if (type === 'circle') {
          return classes.circleCritical;
        }
        return classes.textCritical;
      case 'NORMAL':
        if (type === 'circle') {
          return classes.circleNormal;
        }
        return classes.textNormal;
      case 'INFORMATION':
        if (type === 'circle') {
          return classes.circleInformation;
        }
        return classes.textInformation;
      default:
    }
    return null;
  }
  displayAlertStatus(type) {
    switch (type) {
      case 'WARNING':
        return <FormattedMessage {...messages.textALert} />;
      case 'CRITICAL':
        return <FormattedMessage {...messages.textCritical} />;
      case 'NORMAL':
        return <FormattedMessage {...messages.textNormal} />;
      case 'INFORMATION':
        return <FormattedMessage {...messages.textInformation} />;
      default:
    }
    return null;
  }
  displayTextColor(number) {
    const { classes } = this.props;
    if (number > 0) {
      return classes.textColor;
    }
    return classes.text;
  }
  onClickButton(ecuID) {
    this.props.history.replace({
      pathname: `${UrlPath}/ecu-software-update-detail`,
      search: `?id=${ecuID}`,
    });
  }
  displayUpdateAvailable(updateCount, data) {
    const { classes } = this.props;
    if (updateCount > 0) {
      return (
        <Tooltips type="UPDATE" content={data}>
          <span className={classes.text}>
            <img
              src={CachedIcon}
              className={classes.CachedIconIcon}
              alt="Cached icon"
            />
            {updateCount}
          </span>
        </Tooltips>
      );
    }
    return null;
  }
  displayDataFilter(data, type, index) {
    this.props.changeDataFilter(data, type);
    this.props.changeButtonFilter(index);
  }
  displayStyleReactTable() {
    const { classes, ECUList } = this.props;
    if (ECUList.data !== undefined) {
      return classes.reactTable;
    }
    return classes.table;
  }
  displayButtonSeeMore(id) {
    this.props.getButtonId(id);
  }
  render() {
    const { classes, SWManagement, ECUList } = this.props;
    let data = SWManagement.dataFilter;
    if (SWManagement.dataFilter.length === 0 && SWManagement.filter === 0) {
      ({ data } = ECUList);
    }
    return (
      <Card className={classes.card}>
        <CardHeader type="" title={<FormattedMessage {...messages.title} />} />
        <CardContent className={classes.cardContent}>
          <div className={classes.filter}>
            <Tabs
              className={classes.tabs}
              value={SWManagement.filter}
              onChange={this.handleChangeFilterECU}
            >
              <Tab
                className={classes.tab}
                label={<FormattedMessage {...messages.allECU} />}
                classes={{
                  selected: classes.tabSelected,
                  label: classes.tabLabel,
                  labelContainer: classes.tabLabelContainer,
                }}
                onClick={() => this.displayDataFilter(ECUList.data, 'all', 0)}
              />
              <Tab
                className={classes.tab}
                label={<FormattedMessage {...messages.alertECU} />}
                classes={{
                  selected: classes.tabSelected,
                  label: classes.tabLabel,
                  labelContainer: classes.tabLabelContainer,
                }}
                onClick={() => this.displayDataFilter(ECUList.data, 'alert', 1)}
              />
              <Tab
                className={classes.tab}
                label={<FormattedMessage {...messages.updateECU} />}
                classes={{
                  selected: classes.tabSelected,
                  label: classes.tabLabel,
                  labelContainer: classes.tabLabelContainer,
                }}
                onClick={() =>
                  this.displayDataFilter(ECUList.data, 'update', 2)
                }
              />
            </Tabs>
            <div className={classes.clear} />
          </div>
          <ReactTable
            data={data || []}
            columns={[
              {
                id: 'id',
                Header: (
                  <PanelTitle
                    title={<FormattedMessage {...messages.id} />}
                    subtitle={4}
                  />
                ),
                accessor: row => (
                  <span className={classes.text}>{row.displayId || NA}</span>
                ),
                minWidth: 130,
                style: { outline: 'none' },
              },
              {
                id: 'alert',
                Header: (
                  <PanelTitle
                    title={<FormattedMessage {...messages.alert} />}
                    subtitle={4}
                  />
                ),
                accessor: row => (
                  <span
                    className={`${
                      classes.textAlertStatus
                    } ${this.displayStyleAlertStatus(
                      null,
                      row.securityStatus,
                    )}`}
                  >
                    <div
                      className={`${
                        classes.circle
                      } ${this.displayStyleAlertStatus(
                        'circle',
                        row.securityStatus,
                      )}`}
                    />
                    {this.displayAlertStatus(row.securityStatus)}
                  </span>
                ),
                minWidth: 130,
              },
              {
                id: 'error',
                Header: (
                  <PanelTitle
                    title={<FormattedMessage {...messages.error} />}
                    subtitle={4}
                  />
                ),
                accessor: row => (
                  <span
                    className={this.displayTextColor(row.errorCode.errorCount)}
                  >
                    {row.errorCode.errorCount !== undefined
                      ? row.errorCode.errorCount
                      : 0}
                  </span>
                ),
                minWidth: 130,
                style: { textAlign: 'center' },
              },
              {
                id: 'rule',
                Header: (
                  <PanelTitle
                    title={<FormattedMessage {...messages.rule} />}
                    subtitle={4}
                  />
                ),
                accessor: row => (
                  <span
                    className={this.displayTextColor(
                      row.errorCode.ruleDbStatus,
                    )}
                  >
                    {row.errorCode.ruleDbStatus !== undefined
                      ? row.errorCode.ruleDbStatus
                      : 0}
                  </span>
                ),
                minWidth: 130,
                style: { textAlign: 'center' },
              },
              {
                id: 'update',
                Header: (
                  <PanelTitle
                    title={<FormattedMessage {...messages.update} />}
                    subtitle={4}
                  />
                ),
                accessor: row =>
                  this.displayUpdateAvailable(
                    row.updateCount,
                    row.softwareInstallation,
                  ),
                minWidth: 150,
              },
              {
                id: 'action',
                Header: (
                  <PanelTitle
                    title={<FormattedMessage {...messages.dateUpdate} />}
                    subtitle={4}
                  />
                ),
                accessor: row => <div key={row.id} />,
                minWidth: 180,
              },
            ]}
            noDataText={<FormattedMessage {...messages.noData} />}
            showPagination={false}
            pageSize={data ? data.length : 0}
            getTrProps={(state, rowInfo) => ({
              onClick: () => {
                this.displayButtonSeeMore(rowInfo.original.id);
              },
              className:
                rowInfo.original.id === SWManagement.buttonID && 'selectedRow',
            })}
          />
        </CardContent>
      </Card>
    );
  }
}

SoftwareManagement.propTypes = {
  classes: PropTypes.object.isRequired,
  SWManagement: PropTypes.object.isRequired,
  ECUList: PropTypes.object.isRequired,
  vehicleMenu: PropTypes.object.isRequired,
  changeButtonFilter: PropTypes.func.isRequired,
  changeDataFilter: PropTypes.func.isRequired,
  getDataChild: PropTypes.func.isRequired,
  getButtonId: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(SoftwareManagement);
