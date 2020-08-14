/**
 *
 * Panel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import styles from 'styles/jss/components/panelTitleStyle';

/* eslint-disable react/prefer-stateless-function */
class PanelTitle extends React.PureComponent {
  render() {
    const { classes, subtitle } = this.props;
    let root;
    let title;
    switch (subtitle) {
      case 1:
        root = classes.root1;
        title = classes.title1;
        break;
      case 2:
        root = classes.root2;
        title = classes.title2;
        break;
      case 3:
        root = classes.root3;
        title = classes.title3;
        break;
      case 4:
        root = classes.root4;
        title = classes.title4;
        break;
      default:
        break;
    }
    return <span className={`${title} ${root}`}>{this.props.title}</span>;
  }
}

PanelTitle.propTypes = {
  classes: PropTypes.object,
  subtitle: PropTypes.number,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default withStyles(styles)(PanelTitle);
