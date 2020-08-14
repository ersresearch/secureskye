/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 10:02:03 
 * @Last Modified by: LoiDT2
 * @Last Modified time: 2018-11-29 11:29:40
 */
import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { withStyles } from '@material-ui/core';
import styles from 'styles/jss/containers/vehicleForm';
import AppDecorator from 'containers/AppDecorator';
import Footer from 'components/Footer/index';
import VehicleInfoManagement from './VehicleInfoManagement/Loadable';

import AddForm from './AddForm/Loadable';
import UpdateForm from './UpdateForm/Loadable';

export class vehicleForm extends React.PureComponent {
  componentDidMount() {
    this.props.getAllModel();
    this.props.getOBDConfigure();
  }
  render() {
    const { classes, location } = this.props;
    const ID = qs.parse(location.search)['?id'] || '';
    return (
      <AppDecorator>
        <div className={classes.root}>
          <VehicleInfoManagement />
          <div className={classes.container}>
            <div className={classes.panels}>
              {ID === 'register' ? <AddForm /> : <UpdateForm />}
            </div>
            <Footer />
          </div>
        </div>
      </AppDecorator>
    );
  }
}

vehicleForm.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  getAllModel: PropTypes.func.isRequired,
  getOBDConfigure: PropTypes.func.isRequired,
};

export default withStyles(styles)(vehicleForm);
