/*
 * @Author: NhuHH 
 * @Date: 2018-11-14 11:38:09 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-19 15:01:13
 */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form/immutable';
import _ from 'lodash';
import Select from 'react-select';
import Button from 'components/Button';
import { withStyles } from '@material-ui/core';
import styles from 'styles/jss/containers/additionalInformation';
import { breakpoint, textStyle } from 'styles/jss/common';
import PanelTitle from 'components/PanelTitle';
import Table from 'components/Table';
import { ShowNotify } from 'utils/actionUtils';
import Chance from 'chance';
import messages from '../messages';
const chance = new Chance();
const customStyles = {
  placeholder: provided => ({
    ...provided,
    ...textStyle.text3,
    color: '#e2dfdf',
    fontWeight: 100,
  }),
  control: () => ({
    display: 'flex',
    height: '44px',
    fontSize: '21px',
    fontWeight: 600,
    [breakpoint.large]: {
      height: '39px',
      fontSize: '18px',
    },
    [breakpoint.medium]: {
      height: '29px',
      fontSize: '14px',
    },
    [breakpoint.small]: {
      height: '29px',
      fontSize: '14px',
    },
  }),
  menuList: () => ({
    maxHeight: '150px',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '10px',
      height: '10px',
    },
    '&::-moz-scrollbar': {
      width: '10px',
      height: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#BEBEBE',
      borderRadius: '10px',
    },
    '&::-moz-scrollbar-thumb': {
      backgroundColor: '#BEBEBE',
      borderRadius: '10px',
    },
    [breakpoint.large]: {
      '&::-webkit-scrollbar': {
        width: '9px',
        height: '9px',
      },
      '&::-moz-scrollbar': {
        width: '9px',
        height: '9px',
      },
    },
    [breakpoint.medium]: {
      '&::-webkit-scrollbar': {
        width: '7px',
        height: '7px',
      },
      '&::-moz-scrollbar': {
        width: '7px',
        height: '7px',
      },
    },
    [breakpoint.small]: {
      '&::-webkit-scrollbar': {
        width: '7px',
        height: '7px',
      },
      '&::-moz-scrollbar': {
        width: '7px',
        height: '7px',
      },
    },
  }),
};
export class RoleInformation extends React.Component {
  componentWillUnmount() {
    this.props.onGetRoleSelection({});
    this.props.getDeleteList([]);
  }
  handleChange = value => {
    this.props.onGetRoleSelection(value);
  };
  addRoleInformation = () => {
    const { roleInformation } = this.props;
    const index = _.findIndex(
      roleInformation.dataUserRole,
      item => item.value === roleInformation.selectedOption.value,
    );
    if (index !== -1) {
      ShowNotify('warning', 'Role is existed in the list');
    } else if (_.isEmpty(roleInformation.selectedOption)) {
      ShowNotify('warning', 'Please select a role to add');
    } else {
      // eslint-disable-next-line no-underscore-dangle
      const _id = chance.guid();
      const data = {
        _id,
        id: _id,
        ...roleInformation.selectedOption,
      };
      this.props.getRoleInformation(data);
    }
  };
  renderField = ({ className, options, placeholder, value }) => (
    <React.Fragment>
      <Select
        styles={customStyles}
        className={className}
        value={value}
        onChange={this.handleChange}
        options={options}
        placeholder={placeholder}
      />
    </React.Fragment>
  );
  handleDelete = () => {
    const { data, dataUserRole } = this.props.roleInformation;
    if (!_.isEmpty(data)) {
      const removed = dataUserRole.filter(obj => data.indexOf(obj.id) === -1);
      this.props.getNewRoleInformation(removed);
      this.props.getDeleteList([]);
    } else {
      ShowNotify('warning', 'Please select Role to delete');
    }
  };
  render() {
    const { classes, roleInformation, user } = this.props;
    const dataFormat = [];
    roleInformation.dataUserRole.map((item, index) => {
      const element = {
        index,
        ...item,
      };
      return dataFormat.push(element);
    });
    const columns = [
      {
        id: 'id',
        Header: <PanelTitle title="#" subtitle={4} />,
        accessor: row => <span className={classes.text}>{row.index + 1}</span>,
        width: 80,
      },
      {
        id: 'role',
        Header: (
          <PanelTitle
            title={<FormattedMessage {...messages.roles} />}
            subtitle={4}
          />
        ),
        accessor: row => <span className={classes.text}>{row.label}</span>,
      },
    ];
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <div className={classes.titleHeader}>
            <PanelTitle
              title={<FormattedMessage {...messages.roles} />}
              subtitle={2}
            />
          </div>
          <div className={classes.buttonItemRole}>
            <Field
              name="selectRoles"
              component={this.renderField}
              value={roleInformation.selectedOption}
              onChange={this.handleChange}
              options={user.rolesSearch}
              className={classes.roleSearch}
              placeholder="Type or Select Value"
            />
            <Button
              variant="primary"
              type="button"
              className={classes.button}
              onClick={() => this.addRoleInformation()}
            >
              <FormattedMessage {...messages.buttonAdd} />
            </Button>
            <Button
              variant="primary"
              type="button"
              className={`${classes.button} ${
                _.isEmpty(roleInformation.dataUserRole)
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
            roleInformation.dataUserRole.length > 4
              ? classes.TableComponent
              : classes.checkboxtable
          }`}
        >
          <Table
            data={dataFormat}
            columns={columns}
            showNoData={false}
            statusCheck={roleInformation.data}
            handleStatusCheck={this.props.getDeleteList}
            checkboxTable
          />
        </div>
      </div>
    );
  }
}

RoleInformation.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  roleInformation: PropTypes.object.isRequired,
  onGetRoleSelection: PropTypes.func.isRequired,
  getRoleInformation: PropTypes.func.isRequired,
  getNewRoleInformation: PropTypes.func.isRequired,
  getDeleteList: PropTypes.func,
};

export default withStyles(styles)(RoleInformation);
