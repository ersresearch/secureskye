/**
 *
 * ColorPicker
 *
 */

import React from 'react';
import { ChromePicker } from 'react-color';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from 'styles/jss/components/colorPicker';

class ColorPicker extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showPicker: false,
    };
  }

  handleClick = e => {
    e.preventDefault();
    this.setState({ showPicker: !this.state.showPicker });
  };

  handleClose = () => {
    this.setState({ showPicker: false });
  };

  handleChange = color => {
    const { onColorChange } = this.props;
    onColorChange(color.hex);
  };

  render() {
    const { classes, className, input } = this.props;
    return (
      <span className={className}>
        <button className={classes.swatch} onClick={this.handleClick}>
          <div
            className={classes.color}
            style={{ backgroundColor: input.value }}
          />
        </button>
        {this.state.showPicker && (
          <div className={classes.popover}>
            <div
              role="presentation"
              className={classes.cover}
              onClick={this.handleClose}
            />
            <ChromePicker
              disabled
              color={input.value}
              onChange={this.handleChange}
            />
          </div>
        )}
      </span>
    );
  }
}

ColorPicker.propTypes = {
  input: PropTypes.object,
  classes: PropTypes.object,
  className: PropTypes.string,
  onColorChange: PropTypes.func,
};

export default withStyles(styles)(ColorPicker);
