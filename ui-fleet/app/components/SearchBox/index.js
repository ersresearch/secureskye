/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 08:55:18 
 * @Last Modified by: DanND1
 * @Last Modified time: 2018-12-10 15:21:35
 */
/**
 *
 * SearchBox
 *
 */

import React from 'react';
import Select from 'react-select';
import _isUndefined from 'lodash/isUndefined';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from 'styles/jss/components/searchBox';
import { breakpoint } from 'styles/jss/common';
const customStyles = {
  placeholder: provided => ({
    ...provided,
    cursor: 'start',
    color: '#e2dfdf',
    fontSize: '21px',
    fontWeight: 100,
    [breakpoint.large]: {
      fontSize: '18px',
    },
    [breakpoint.medium]: {
      fontSize: '14px',
    },
    [breakpoint.small]: {
      fontSize: '14px',
    },
  }),
  control: () => ({
    display: 'flex',
    height: '44px',
    fontWeight: 600,
    [breakpoint.large]: {
      height: '39px',
    },
    [breakpoint.medium]: {
      height: '29px',
    },
    [breakpoint.small]: {
      height: '29px',
    },
  }),
  menuList: () => ({
    maxHeight: '200px',
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
class SearchBox extends React.PureComponent {
  handleChange = selectedOption => {
    this.props.onChangeSelect(selectedOption);
  };
  render() {
    const {
      classes,
      className,
      options,
      input,
      meta,
      placeholder,
    } = this.props;
    if (!_isUndefined(meta) || !_isUndefined(input)) {
      const { touched, error, warning } = meta;
      return (
        <React.Fragment>
          <Select
            styles={customStyles}
            className={className}
            value={input.value}
            onChange={this.handleChange}
            options={options}
            placeholder={placeholder}
          />
          {touched &&
            ((error && <span className={classes.textError}>{error}</span>) ||
              (warning && <span className={classes.text}>{warning}</span>))}
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Select
          styles={customStyles}
          className={className}
          onChange={this.handleChange}
          options={options}
          placeholder={placeholder}
        />
      </React.Fragment>
    );
  }
}

SearchBox.propTypes = {
  className: PropTypes.string,
  input: PropTypes.object,
  options: PropTypes.array,
  onChangeSelect: PropTypes.func,
  meta: PropTypes.object,
  classes: PropTypes.object,
  placeholder: PropTypes.string,
};

export default withStyles(styles)(SearchBox);
