/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:13:01 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-19 13:26:12
 */
import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import { compose } from 'redux';
import styles from 'styles/jss/containers/vehicleForm';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { FormattedMessage } from 'react-intl';
import CardHeader from 'components/CardHeader';
import ColorPicker from 'components/ColorPicker';
import SearchBox from 'components/SearchBox';
import validate from 'components/validationForm';
import { UrlPath } from 'commons/constants';
import Loading from 'components/CircularProgress';
import _isEmpty from 'lodash/isEmpty';
import CheckBox from 'components/CheckBox';
import InputField from 'components/InputField';
import qs from 'qs';
import messages from './../../messages';

let file = {};
export class FormInfo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { fuel: false, odo: false };
  }
  componentDidMount() {
    const { location } = this.props;
    const ID = qs.parse(location.search)['?id'] || '';
    if (ID === 'register') {
      this.handleInitialize();
    } else {
      this.props.onGetVehicleById(ID);
    }
  }
  componentDidUpdate(prevProps) {
    const { VehicleManagement, location } = this.props;
    const ID = qs.parse(location.search)['?id'] || '';
    if (
      ID !== 'register' &&
      prevProps.VehicleManagement.rowInfo !== VehicleManagement.rowInfo
    ) {
      this.handleInitializeUpdate();
    }
  }
  componentWillUnmount() {
    this.handleResetData();
    this.setState({
      fuel: false,
      odo: false,
    });
  }

  handleInitialize = () => {
    const { VehicleManagement } = this.props;
    const data = VehicleManagement.initData[0];
    this.props.initialize(data);
  };
  handleInitializeUpdate = () => {
    const { VehicleManagement } = this.props;
    const initData = VehicleManagement.rowInfo;
    this.props.initialize(initData);
  };
  goToVehicleList = () => {
    this.props.history.replace({
      pathname: `${UrlPath}/vehicle-list`,
    });
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
    const { onResetData, reset, location } = this.props;
    const ID = qs.parse(location.search)['?id'] || '';
    reset();
    if (ID === 'register') {
      onResetData();
    }
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
  changeStatusFuel = (value, status) => {
    this.setState({
      fuel: status,
    });
  };
  changeStatusOdo = (value, status) => {
    this.setState({
      odo: status,
    });
  };
  render() {
    const {
      classes,
      handleSubmit,
      submitting,
      pristine,
      VehicleManagement,
      location,
    } = this.props;
    const ID = qs.parse(location.search)['?id'] || '';
    const { fuel, odo } = this.state;
    return (
      <form onSubmit={handleSubmit} className={classes.wrapperFormInfo}>
        <div className={classes.formContainer}>
          {ID !== 'register' ? (
            <CardHeader
              title={<FormattedMessage {...messages.titleUpdate} />}
            />
          ) : (
            <CardHeader
              title={<FormattedMessage {...messages.titleCreate} />}
            />
          )}
          <CardContent className={classes.cardContent}>
            {VehicleManagement.isLoading && this.displayLoading()}
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
                variant="secondary"
                onClick={() => this.goToVehicleList()}
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
                          checked={fuel}
                          handleChange={this.changeStatusFuel}
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
                          checked={odo}
                          handleChange={this.changeStatusOdo}
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
                  {this.displayOBD(VehicleManagement.dataOBD)}
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
FormInfo.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object.isRequired,
  VehicleManagement: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  change: PropTypes.func,
  onChangeStatusFuel: PropTypes.func.isRequired,
  onChangeStatusOdo: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  onChangeImage: PropTypes.func.isRequired,
  onResetData: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  onGetVehicleById: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default compose(
  withStyles(styles),
  reduxForm({
    form: 'addVehicle',
    validate,
  }),
)(FormInfo);
