/*
 * @Author: LoiDT2 
 * @Date: 2018-11-14 16:41:39 
 * @Last Modified by: DanND1
 * @Last Modified time: 2018-12-10 15:17:52
 */
/**
 *
 * AlertIcon
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Checkbox } from '@material-ui/core';
import styles from 'styles/jss/components/checkBox';
class CheckBoxComponent extends React.PureComponent {
  handleChange = value => event => {
    this.props.handleChange(value, event.target.checked);
  };
  render() {
    const { classes, checked, value } = this.props;
    return (
      <Checkbox
        value={value}
        checked={checked}
        onChange={this.handleChange(value)}
        classes={{
          root: classes.checkboxRoot,
          checked: classes.checked,
        }}
      />
    );
  }
}
CheckBoxComponent.propTypes = {
  value: PropTypes.string,
  classes: PropTypes.object,
  checked: PropTypes.bool,
  handleChange: PropTypes.func,
};

export default withStyles(styles)(CheckBoxComponent);
