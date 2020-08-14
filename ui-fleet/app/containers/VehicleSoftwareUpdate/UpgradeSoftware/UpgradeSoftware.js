/*
 * @Author: NhuHH 
 * @Date: 2018-11-28 07:56:27 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-19 15:06:44
 */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { withStyles, Card } from '@material-ui/core';
import styles from 'styles/jss/containers/upgradeSoftware';
import { DateFormatSoftware } from 'utils/timeStampUtil';
import PanelTitle from 'components/PanelTitle';
import Button from 'components/Button';
import CardHeaderComponent from 'components/CardHeader';
import Table from 'components/Table';
import messages from './messages';

export class UpgradeSoftware extends React.PureComponent {
  componentDidMount() {
    this.props.getDataUpgradeSoftware();
  }
  handleSelectSoftware = (type, info) => {
    this.props.handleSelectRowId(info.id);
  };
  handleView = otaId => {
    this.props.getDataOTAPackage(otaId);
    this.props.changeStatusModal(true);
  };
  render() {
    const { classes, software } = this.props;
    const columns = [
      {
        id: 'name',
        Header: (
          <PanelTitle
            title={<FormattedMessage {...messages.name} />}
            subtitle={4}
          />
        ),
        accessor: row => <span className={classes.text}>{row.name}</span>,
      },
      {
        id: 'category',
        Header: (
          <PanelTitle
            title={<FormattedMessage {...messages.category} />}
            subtitle={4}
          />
        ),
        accessor: row => <span className={classes.text}>{row.category}</span>,
      },
      {
        id: 'family',
        Header: (
          <PanelTitle
            title={<FormattedMessage {...messages.family} />}
            subtitle={4}
          />
        ),
        accessor: row => <span className={classes.text}>{row.family}</span>,
      },
      {
        id: 'date',
        Header: (
          <PanelTitle
            title={<FormattedMessage {...messages.date} />}
            subtitle={4}
          />
        ),
        accessor: row => (
          <span className={classes.text}>{DateFormatSoftware(row.date)}</span>
        ),
      },
      {
        id: 'action',
        Header: (
          <PanelTitle
            title={<FormattedMessage {...messages.action} />}
            subtitle={4}
          />
        ),
        accessor: row =>
          software.selectedRow === row.id ? (
            <Button
              className={classes.buttonView}
              variant="primary"
              onClick={() => this.handleView(row.id)}
            >
              {<FormattedMessage {...messages.buttonView} />}
            </Button>
          ) : null,
      },
    ];
    return (
      <div className={classes.root}>
        <Card className={classes.container}>
          <CardHeaderComponent
            type=""
            title={<FormattedMessage {...messages.title} />}
          />
          <Table
            data={software.data ? software.data : []}
            columns={columns}
            handleChangeColumn={this.handleSelectSoftware}
            selectedRow={software.selectedRow}
          />
        </Card>
      </div>
    );
  }
}

UpgradeSoftware.propTypes = {
  classes: PropTypes.object.isRequired,
  software: PropTypes.object.isRequired,
  handleSelectRowId: PropTypes.func.isRequired,
  getDataUpgradeSoftware: PropTypes.func.isRequired,
  getDataOTAPackage: PropTypes.func.isRequired,
  changeStatusModal: PropTypes.func.isRequired,
};

export default withStyles(styles)(UpgradeSoftware);
