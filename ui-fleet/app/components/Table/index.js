/* eslint-disable no-underscore-dangle */
/* eslint-disable no-const-assign */
/* eslint-disable no-return-assign */
/* eslint-disable react/no-did-update-set-state */
/**
 *
 * Table
 *
 */

import React from 'react';
import ReactTable from 'react-table';
import _isUndefined from 'lodash/isUndefined';
import PropTypes from 'prop-types';
import { withStyles, Checkbox } from '@material-ui/core';

const noDataFound = 'No data found';
const styles = () => ({
  checkboxRoot: {
    color: 'gray',
    '&$checked': {
      color: '#21a600',
    },
  },
  checked: {},
});
class Table extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { selected: {}, selectAll: 0 };
    this.toggleRow = this.toggleRow.bind(this);
  }
  handleSelectColumn = (colId, rowInfo) => {
    const { handleChangeColumn } = this.props;
    if (!_isUndefined(handleChangeColumn)) {
      handleChangeColumn(colId, rowInfo);
    }
  };
  componentDidUpdate() {
    const { data, statusCheck, checkboxTable } = this.props;
    if (checkboxTable) {
      if (statusCheck.length === data.length && statusCheck.length !== 0) {
        this.setState({
          selectAll: 1,
        });
      } else {
        this.setState({
          selectAll: 0,
        });
      }
    }
  }
  toggleRow = (id, idCheckbox) => event => {
    const newSelected = Object.assign({}, this.state.selected);
    newSelected[idCheckbox] = !this.state.selected[idCheckbox];
    this.setState({
      selected: newSelected,
      selectAll: 0,
    });
    const { data, statusCheck } = this.props;
    if (event.target.checked !== undefined) {
      if (event.target.checked === true) {
        statusCheck.push(id);
      } else {
        const index = statusCheck.findIndex(element => element === id);
        statusCheck.splice(index, 1);
      }
      if (statusCheck.length === data.length) {
        this.setState({
          selectAll: 1,
        });
      } else if (statusCheck.length === 0) {
        this.setState({
          selectAll: 0,
        });
      }
      this.props.handleStatusCheck(statusCheck);
    }
  };
  toggleSelectAll() {
    const newSelected = {};
    const newStatusCheck = [];
    const dataUser = this.props.data;
    if (dataUser !== []) {
      if (this.state.selectAll === 0) {
        dataUser.forEach(x => {
          newSelected[x._id] = true;
          newStatusCheck.push(x.id);
        });
      }
    }
    this.props.handleStatusCheck(newStatusCheck);
    this.setState({
      selected: newSelected,
      selectAll: this.state.selectAll === 0 ? 1 : 0,
    });
  }

  noDataComponent = () => {
    const { showNoData } = this.props;
    if (_isUndefined(showNoData) || showNoData) {
      return <div className="rt-noData">{noDataFound}</div>;
    }
    return null;
  };
  render() {
    const { data, columns, selectedRow, classes } = this.props;
    const columnCheckbox = [
      {
        id: 'checkbox',
        Header: () => (
          <Checkbox
            classes={{
              root: classes.checkboxRoot,
              checked: classes.checked,
            }}
            checked={this.state.selectAll === 1}
            onChange={() => this.toggleSelectAll()}
          />
        ),
        Cell: ({ original, row }) => (
          <Checkbox
            key={original._id}
            classes={{
              root: classes.checkboxRoot,
              checked: classes.checked,
            }}
            checked={this.state.selected[original._id] === true}
            onChange={this.toggleRow(original.id, original._id, row)}
          />
        ),
        sortable: false,
        filterable: false,
        width: 103,
      },
    ];
    let customColumns = columns;
    if (this.props.checkboxTable) {
      customColumns = columnCheckbox.concat(columns);
    }
    return (
      <ReactTable
        data={data}
        columns={customColumns}
        NoDataComponent={this.noDataComponent}
        showPagination={false}
        pageSize={data ? data.length : 0}
        sortable={false}
        getTrProps={(state, rowInfo) => ({
          className:
            !_isUndefined(selectedRow) &&
            rowInfo.original.id === selectedRow &&
            'selectedRow',
        })}
        getTdProps={(state, rowInfo, column) => ({
          onClick: () => {
            this.handleSelectColumn(column.id, rowInfo.original);
          },
        })}
        style={{ height: '100%' }}
      />
    );
  }
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  selectedRow: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  handleChangeColumn: PropTypes.func,
  classes: PropTypes.object.isRequired,
  checkboxTable: PropTypes.bool,
  handleStatusCheck: PropTypes.func,
  showNoData: PropTypes.bool,
  statusCheck: PropTypes.array,
};

export default withStyles(styles)(Table);
