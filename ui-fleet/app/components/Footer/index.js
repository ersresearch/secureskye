/* eslint-disable jsx-a11y/anchor-has-content */
/**
 *
 * Footer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styles from 'styles/jss/components/footer';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

class Footer extends React.PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <span className={classes.detail}>
          ©&nbsp;2017 - 2018&nbsp;{' '}
          <a className={classes.info} href="http://www.trillium.co.jp/">
            Trillium Incorporated, Trilliumcyber LLC
          </a>. All Right Reserved.
        </span>
      </Paper>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Footer);
