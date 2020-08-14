/**
 *
 * InputField
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from 'styles/jss/components/inputField';

// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class InputField extends React.PureComponent {
  render() {
    const { input, meta, label, classes, disabled } = this.props;
    const { touched, error, warning } = meta;
    return (
      <div className={classes.wrapInput}>
        <input
          {...input}
          type="text"
          placeholder={label}
          className={classes.txtInput}
          disabled={disabled}
        />
        {touched && (
          <div className={classes.error}>
            {error && <span className={classes.textError}>{error}</span>}
            {warning && <span className={classes.textError}>{warning}</span>}
          </div>
        )}
      </div>
    );
  }
}

InputField.propTypes = {
  classes: PropTypes.object,
  input: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default withStyles(styles)(InputField);
