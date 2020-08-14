/*
 * @Author: DatNT62 
 * @Date: 2018-11-16 13:41:41 
 * @Last Modified by:   DatNT62 
 * @Last Modified time: 2018-11-16 13:41:41 
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Footer from 'components/Footer';
import styles from 'styles/jss/containers/role';
import RoleList from './RoleList/Loadable';
import CreateRole from './CreateRole';
import UpdateRole from './UpdateRole';

class Role extends React.PureComponent {
  render() {
    const { classes, match } = this.props;
    let screen;
    if (match.params.direction === 'create') screen = <CreateRole />;
    else if (match.params.direction === 'update') screen = <UpdateRole />;
    else screen = <RoleList />;
    return (
      <div className={classes.root}>
        <div className={classes.panels}>{screen}</div>
        <Footer />
      </div>
    );
  }
}

Role.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object,
};

export default withStyles(styles)(Role);
