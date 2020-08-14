/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:12:35 
 * @Last Modified by: LoiDT2
 * @Last Modified time: 2018-11-15 16:28:21
 */
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { UrlPath } from 'commons/constants';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import styles from 'styles/jss/containers/vehicleForm';
import FormInfo from '../Form/Loadable';

export class AddForm extends React.PureComponent {
  onClickButton() {
    this.props.history.replace({
      pathname: `${UrlPath}/vehicle-list`,
    });
  }
  handleOnSubmit = value => {
    const valueSubmit = {
      OBDConfig: value.OBDConfig.value,
      fuelStatus: value.fuelStatus,
      odoStatus: value.odoStatus,
      color: value.color,
      modelId: value.model.value,
      name: value.name,
      vin: value.vin,
    };
    this.props.onAddVehicle(valueSubmit);
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.wrapperVehicle}>
        <FormInfo onSubmit={this.handleOnSubmit} />
      </Card>
    );
  }
}

AddForm.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onAddVehicle: PropTypes.func,
};

export default compose(withStyles(styles))(AddForm);
