/**
 *
 * InputField
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from 'styles/jss/components/inputDate';
import { breakpoint, textStyle } from 'styles/jss/common';
import { InlineDatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import Date from '@material-ui/icons/DateRange';
import {
  IconButton,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/moment';

const materialTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiInput: {
      input: {
        ...textStyle.text3,
        '&::placeholder': {
          ...textStyle.text3,
          color: '#bebebe',
        },
      },
      root: {
        height: '100%',
      },
      underline: {
        '&:before': {
          content: '',
        },
        '&:after': {
          content: '',
        },
      },
    },
    MuiIconButton: {
      root: {
        height: 48,
        [breakpoint.large]: {
          height: 38,
        },
        [breakpoint.medium]: {
          height: 20,
        },
        [breakpoint.small]: {
          height: 20,
        },
      },
    },
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#D40011',
        height: 100,
        [breakpoint.large]: {
          height: 80,
        },
        [breakpoint.medium]: {
          height: 70,
        },
        [breakpoint.small]: {
          height: 70,
        },
      },
    },
    MuiPickersDay: {
      selected: {
        backgroundColor: '#D40011',
      },
    },
    MuiFormHelperText: {
      root: {
        display: 'none',
      },
    },
  },
});
class InputField extends React.PureComponent {
  render() {
    const {
      input,
      meta,
      classes,
      handleChange,
      className,
      placeholder,
    } = this.props;
    const { touched, error, warning } = meta;
    return (
      <div className={classes.wrapInput}>
        <MuiThemeProvider theme={materialTheme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <InlineDatePicker
              className={className}
              value={input.value ? input.value : null}
              onChange={handleChange}
              placeholder={placeholder}
              format="DD/MM/YYYY"
              InputProps={{
                endAdornment: (
                  <IconButton aria-label="Select locale">
                    <Date />
                  </IconButton>
                ),
              }}
            />
          </MuiPickersUtilsProvider>
          {touched && (
            <div className={classes.error}>
              {error && <span className={classes.textError}>{error}</span>}
              {warning && <span className={classes.textError}>{warning}</span>}
            </div>
          )}
        </MuiThemeProvider>
      </div>
    );
  }
}

InputField.propTypes = {
  classes: PropTypes.object,
  input: PropTypes.object,
  meta: PropTypes.object,
  handleChange: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

export default withStyles(styles)(InputField);
