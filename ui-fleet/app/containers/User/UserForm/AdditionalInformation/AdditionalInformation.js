/*
 * @Author: NhuHH 
 * @Date: 2018-11-15 11:30:20 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-19 15:00:41
 */
import React from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import { FormattedMessage } from 'react-intl';
import Button from 'components/Button';
import { withStyles } from '@material-ui/core';
import styles from 'styles/jss/containers/additionalInformation';
import PanelTitle from 'components/PanelTitle';
import Table from 'components/Table';
import { ShowNotify } from 'utils/actionUtils';
import Chance from 'chance';
import messages from '../messages';

const chance = new Chance();
export class AdditionalInformation extends React.Component {
  componentWillUnmount() {
    this.props.getDeleteList([]);
    this.props.addKey('');
    this.props.addValue('');
  }
  handleDelete = () => {
    const { dataAddInformation, data } = this.props.additionalInformation;
    if (!_isEmpty(data)) {
      const removed = dataAddInformation.filter(
        obj => data.indexOf(obj.id) === -1,
      );
      this.props.getNewAdditionalInformation(removed);
      this.props.getDeleteList([]);
    } else {
      ShowNotify('warning', 'Please select Additional Information to delete');
    }
  };
  handleChange = event => {
    if (event.target.name === 'key') {
      this.props.addKey(event.target.value);
    } else {
      this.props.addValue(event.target.value);
    }
    this.props.displayError('');
  };
  setAddInformation = () => {
    const { additionalInformation } = this.props;
    if (additionalInformation.add.key === '') {
      this.props.displayError('Please enter key');
    } else if (additionalInformation.add.key !== '') {
      this.props.displayError('');
      /* eslint-disable no-underscore-dangle */
      const _id = chance.guid();
      const add = {
        _id,
        id: _id,
        ...additionalInformation.add,
      };
      this.props.getAdditionalInformation(add);
      document.getElementById('key').value = '';
      document.getElementById('value').value = '';
      this.props.addKey('');
      this.props.addValue('');
    }
  };
  render() {
    const { classes, additionalInformation } = this.props;
    const dataFormat = [];
    if (!_isEmpty(additionalInformation.dataAddInformation)) {
      additionalInformation.dataAddInformation.map((item, index) => {
        const element = {
          index,
          ...item,
        };
        return dataFormat.push(element);
      });
    }
    const columns = [
      {
        id: 'id',
        Header: <PanelTitle title="#" subtitle={4} />,
        accessor: row => <span className={classes.text}>{row.index + 1}</span>,
        width: 80,
      },
      {
        id: 'key',
        Header: (
          <PanelTitle
            title={<FormattedMessage {...messages.key} />}
            subtitle={4}
          />
        ),
        accessor: row => <span className={classes.text}>{row.key}</span>,
        Footer: (
          <div
            className={additionalInformation.error ? classes.cellInput : null}
          >
            <input
              id="key"
              name="key"
              type="input"
              placeholder="Key"
              className={`${classes.input} ${classes.text}`}
              onChange={e => this.handleChange(e)}
            />
            <div className={classes.cellError}>
              <span className={classes.textError}>
                {additionalInformation.error}
              </span>
            </div>
          </div>
        ),
      },
      {
        id: 'value',
        Header: (
          <PanelTitle
            title={<FormattedMessage {...messages.value} />}
            subtitle={4}
          />
        ),
        accessor: row => <span className={classes.text}>{row.value}</span>,
        Footer: (
          <input
            id="value"
            name="value"
            type="input"
            placeholder="Value"
            className={`${classes.input} ${classes.text}`}
            onChange={e => this.handleChange(e)}
          />
        ),
      },
    ];
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <div className={classes.titleHeader}>
            <PanelTitle
              title={<FormattedMessage {...messages.addInformation} />}
              subtitle={2}
            />
          </div>
          <div className={classes.buttonItem}>
            <Button
              variant="primary"
              type="button"
              className={`${classes.button} ${classes.buttonRegister}`}
              onClick={() => this.setAddInformation()}
            >
              <FormattedMessage {...messages.buttonAdd} />
            </Button>
            <Button
              variant="primary"
              type="button"
              className={`${classes.button} ${
                _isEmpty(additionalInformation.dataAddInformation)
                  ? classes.buttonDeleteDisable
                  : classes.buttonDelete
              }`}
              onClick={() => this.handleDelete()}
            >
              <FormattedMessage {...messages.buttonDelete} />
            </Button>
          </div>
        </div>
        <div
          className={`${classes.itemFormContent} ${
            additionalInformation.dataAddInformation.length > 4
              ? classes.TableAdditional
              : classes.checkboxtable
          }`}
        >
          <Table
            data={dataFormat}
            columns={columns}
            showNoData={false}
            statusCheck={additionalInformation.data}
            handleStatusCheck={this.props.getDeleteList}
            checkboxTable
          />
        </div>
      </div>
    );
  }
}

AdditionalInformation.propTypes = {
  classes: PropTypes.object.isRequired,
  additionalInformation: PropTypes.object.isRequired,
  addKey: PropTypes.func.isRequired,
  addValue: PropTypes.func.isRequired,
  getAdditionalInformation: PropTypes.func.isRequired,
  getDeleteList: PropTypes.func.isRequired,
  displayError: PropTypes.func.isRequired,
  getNewAdditionalInformation: PropTypes.func.isRequired,
};

export default withStyles(styles)(AdditionalInformation);
