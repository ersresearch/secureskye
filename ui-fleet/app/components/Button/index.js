/**
 *
 * Button
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import _isUndefined from 'lodash/isUndefined';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import styles from 'styles/jss/components/button';

/* eslint-disable react/prefer-stateless-function */
class ButtonComponent extends React.PureComponent {
  render() {
    const { classes, onClick, className, variant, type, disabled } = this.props;
    let root;
    let style;
    if (!_isUndefined(className)) {
      root = `${classes.button} ${className}`;
    } else {
      root = classes.button;
    }
    switch (variant) {
      case 'primary':
        style = classes.primary;
        break;
      case 'secondary':
        style = classes.secondary;
        break;
      default:
        break;
    }
    return (
      <Button
        type={type}
        disabled={disabled}
        classes={{ label: classes.labelButton }}
        className={`${root} ${style}`}
        onClick={onClick}
      >
        {this.props.children}
      </Button>
    );
  }
}

ButtonComponent.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
  classes: PropTypes.object,
  onClick: PropTypes.func,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  variant: PropTypes.string,
  disabled: PropTypes.bool,
};

export default withStyles(styles)(ButtonComponent);
