/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:13:01 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-11-16 18:55:59
 */
import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Loading from 'components/CircularProgress';
import { compose } from 'redux';
import styles from 'styles/jss/containers/vehicleForm';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import Button from 'components/Button';
import { FormattedMessage } from 'react-intl';
import ColorPicker from 'components/ColorPicker';
import SearchBox from 'components/SearchBox';
import CardHeader from 'components/CardHeader';
import validate from 'components/validationForm';
import { UrlPath } from 'commons/constants';
import qs from 'qs';
import CheckBox from 'components/CheckBox';
import InputField from 'components/InputField';
import messages from './../../../messages';
let file = {};
export class UpdateVehicle extends React.PureComponent {
  componentDidMount() {
    const { location } = this.props;
    const vehicleId = qs.parse(location.search)['?id'] || '';
    this.props.onGetVehicleById(vehicleId);
  }
  componentDidUpdate(prevProps) {
    const { VehicleManagement } = this.props;
    if (prevProps.VehicleManagement.rowInfo !== VehicleManagement.rowInfo) {
      this.handleInitializeUpdate();
    }
  }
  goToVehicleList = () => {
    this.props.history.replace({
      pathname: `${UrlPath}/vehicle-list`,
    });
  };
  handleInitializeUpdate = () => {
    const { VehicleManagement } = this.props;
    const initData = VehicleManagement.rowInfo;
    this.props.initialize(initData);
  };
  handleImageChange(e) {
    const { onChangeImage } = this.props;
    e.preventDefault();
    const reader = new FileReader();
    [file] = e.target.files;
    reader.onloadend = () => {
      onChangeImage(file, reader.result);
    };
    reader.readAsDataURL(file);
  }
  handleResetData = () => {
    const { reset } = this.props;
    reset();
  };
  handleColorChange = color => {
    this.props.change('color', color);
  };
  handleChangeModel = value => {
    this.props.change('model', value);
  };
  handleChangeOBD = value => {
    this.props.change('OBDConfig', value);
  };
  renderFieldInput = ({
    input,
    label,
    type,
    disabled,
    meta: { touched, error, warning },
  }) => {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <input
          {...input}
          type={type}
          placeholder={label}
          className={classes.txtInput}
          disabled={disabled}
        />
        {touched &&
          ((error && <span className={classes.textError}>{error}</span>) ||
            (warning && <span className={classes.text}>{warning}</span>))}
      </React.Fragment>
    );
  };
  displayLoading = () => {
    const { classes } = this.props;
    return (
      <div className={classes.overlay}>
        <div className={classes.iconLoading}>
          <Loading />
        </div>
      </div>
    );
  };
  displayOBD = data => {
    const { classes } = this.props;
    if (!_isEmpty(data)) {
      return (
        <div className={classes.txtSelect}>
          <Field
            onChangeSelect={this.handleChangeOBD}
            component={SearchBox}
            name="OBDConfig"
            placeholder="Type or Select Value"
            options={data}
          />
        </div>
      );
    }
    return (
      <div className={classes.txtSelect}>
        <Field
          onChangeSelect={this.handleChangeOBD}
          component={SearchBox}
          name="OBDConfig"
          placeholder="OBD device not available"
          options={data}
        />
      </div>
    );
  };
  render() {
    const {
      classes,
      handleSubmit,
      pristine,
      submitting,
      VehicleManagement,
    } = this.props;
    return (
      <form onSubmit={handleSubmit} className={classes.wrapperFormInfo}>
        <div className={classes.formContainer}>
          <CardHeader title={<FormattedMessage {...messages.titleUpdate} />} />
          <CardContent className={classes.cardContent}>
            {VehicleManagement.isLoading ? this.displayLoading() : ''}
            <div className={classes.wrapperBtn}>
              <Button disabled={submitting} type="submit" variant="primary">
                <FormattedMessage {...messages.buttonSave} />
              </Button>
              <Button
                disabled={pristine || submitting}
                onClick={() => this.handleResetData()}
                variant="secondary"
              >
                <FormattedMessage {...messages.buttonReset} />
              </Button>
              <Button
                onClick={() => this.goToVehicleList()}
                variant="secondary"
              >
                <FormattedMessage {...messages.buttonCancle} />
              </Button>
            </div>
            <div className={classes.wrapperForm}>
              <div className={classes.wrapperLeft}>
                <div className={classes.txtInfo}>
                  <div className={classes.txtTitle}>
                    <FormattedMessage {...messages.name} />
                    <span className={classes.textfieldName}> *</span>
                    <span>:</span>
                  </div>
                  <div className={classes.txtInput}>
                    <Field component={InputField} name="name" label="Name" />
                  </div>
                </div>
                <div className={classes.txtInfo}>
                  <div className={classes.txtTitle}>
                    <FormattedMessage {...messages.color} />
                    <span className={classes.textfieldName}> *</span>
                    <span>:</span>
                  </div>
                  <div className={classes.wrapperColor}>
                    <Field
                      className={classes.txtColor}
                      onColorChange={this.handleColorChange}
                      component={ColorPicker}
                      name="color"
                    />
                  </div>
                </div>
                <div className={classes.txtInfo}>
                  <div className={classes.paramTilte}>
                    <FormattedMessage {...messages.paramSetting} />
                    <span className={classes.textfieldName}> *</span>
                    <span>:</span>
                  </div>
                  <div className={classes.wrapperToggle}>
                    <div className={classes.txtFuel}>
                      <FormattedMessage {...messages.txtFuel} />
                      <div className={classes.fuelCheckBox}>
                        <Field
                          checked={VehicleManagement.statusFuel}
                          handleChange={() => this.props.onChangeStatusFuel()}
                          name="fuelStatus"
                          component={CheckBox}
                          type="checkbox"
                        />
                      </div>
                    </div>
                    <div className={classes.txtOdo}>
                      <FormattedMessage {...messages.txtOdo} />
                      <div className={classes.fuelCheckBox}>
                        <Field
                          checked={VehicleManagement.statusOdo}
                          handleChange={() => this.props.onChangeStatusOdo()}
                          name="odoStatus"
                          component={CheckBox}
                          type="checkbox"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={classes.txtInfo}>
                  <div className={classes.txtTitle}>
                    <FormattedMessage {...messages.OBDConfig} />
                    <span>:</span>
                  </div>
                  {this.displayOBD(VehicleManagement.dataOBDById)}
                </div>
              </div>
              <div className={classes.wrapperRight}>
                <div className={classes.txtInfo}>
                  <div className={classes.txtTitle}>
                    <FormattedMessage {...messages.vin} />
                    <span className={classes.textfieldName}> *</span>
                    <span>:</span>
                  </div>
                  <div className={classes.txtInput}>
                    <Field component={InputField} name="vin" label="VIN" />
                  </div>
                </div>
                <div className={classes.txtInfo}>
                  <div className={classes.txtTitle}>
                    <FormattedMessage {...messages.model} />
                    <span className={classes.textfieldName}> *</span>
                    <span>:</span>
                  </div>
                  <div className={classes.txtSelect}>
                    <Field
                      onChangeSelect={this.handleChangeModel}
                      component={SearchBox}
                      name="model"
                      placeholder="Type or Select Value"
                      options={VehicleManagement.dataModel}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </form>
    );
  }
}

UpdateVehicle.propTypes = {
  classes: PropTypes.object,
  change: PropTypes.func,
  history: PropTypes.object.isRequired,
  VehicleManagement: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onChangeStatusFuel: PropTypes.func.isRequired,
  onChangeStatusOdo: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  onChangeImage: PropTypes.func.isRequired,
  onResetData: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  vehicleInfo: PropTypes.object.isRequired,
  onGetVehicleInfo: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  onGetVehicleById: PropTypes.func.isRequired,
};

export default compose(
  withStyles(styles),
  reduxForm({
    form: 'addVehicle',
    validate,
  }),
)(UpdateVehicle);
