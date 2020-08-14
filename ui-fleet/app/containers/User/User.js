/*
 * @Author: NhuHH 
 * @Date: 2018-11-14 11:38:52 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-11-14 16:35:28
 */
import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';
import styles from 'styles/jss/containers/user';
import AppDecorator from 'containers/AppDecorator';
import Footer from 'components/Footer/index';
import UserList from './UserList/Loadable';

export class User extends React.Component {
  componentDidMount() {}
  render() {
    const { classes } = this.props;
    return (
      <AppDecorator>
        <div className={classes.root}>
          <div className={classes.panels}>
            <UserList />
          </div>
          <Footer />
        </div>
      </AppDecorator>
    );
  }
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(User);
