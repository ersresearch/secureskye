/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:13:27 
 * @Last Modified by: DanND1
 * @Last Modified time: 2018-11-27 17:16:48
 */
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { withStyles, Card } from '@material-ui/core';
import styles from 'styles/jss/containers/vehicleForm';
import FormInfo from '../Form/Loadable';

export class UpdateForm extends React.PureComponent {
  handleSubmit = value => {
    const valueSubmit = {
      color: value.color,
      modelId: value.model.value,
      name: value.name,
      vin: value.vin,
    };
    const { file } = this.props.VehicleManagement;

    const vehicleId = qs.parse(this.props.location.search)['?id'] || '';
    this.props.onUpdateVehicle(vehicleId, valueSubmit);

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      this.props.onUploadImage(vehicleId, formData);
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.wrapperVehicle}>
        <FormInfo onSubmit={this.handleSubmit} />
      </Card>
    );
  }
}

UpdateForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onUpdateVehicle: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  VehicleManagement: PropTypes.object.isRequired,
  onUploadImage: PropTypes.func.isRequired,
};

export default compose(
  withRouter,
  withStyles(styles),
)(UpdateForm);
