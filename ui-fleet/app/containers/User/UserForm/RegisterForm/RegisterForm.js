/*
 * @Author: NhuHH 
 * @Date: 2018-11-14 11:37:29 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-18 11:19:21
 */
import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { reduxForm, Field } from 'redux-form/immutable';
import { UrlPath } from 'commons/constants';
import { withStyles } from '@material-ui/core';
import styles from 'styles/jss/containers/userForm';
import PanelTitle from 'components/PanelTitle';
import { FormattedMessage } from 'react-intl';
import SearchBox from 'components/SearchBox';
import DateField from 'components/InputDate';
import Button from 'components/Button';
import _isEqual from 'lodash/isEqual';
import Loading from 'components/CircularProgress';
import Chance from 'chance';
import AdditionalInformation from '../AdditionalInformation/index';
import RoleInformation from '../RoleInformation/index';
import AttachFile from '../AttachFile/Loadable';
import validate from './validate';
import messages from '../messages';

const chance = new Chance();
class Form extends React.PureComponent {
  componentDidMount() {
    const { location } = this.props;
    const userId = qs.parse(location.search)['?id'] || '';
    if (userId !== 'register') {
      this.props.getUserInformationById(userId);
    }
  }
  componentDidUpdate(prevProps) {
    const { user, location } = this.props;
    const userId = qs.parse(location.search)['?id'] || '';
    if (prevProps.user.UserInfo !== user.UserInfo && userId !== 'register') {
      this.handleInitialize(userId);
    }
  }
  componentWillUnmount() {
    this.props.reset();
    this.props.resetDataAdd();
    this.props.resetDataAttachFile();
    this.props.resetDataRole();
    this.props.getUserInfo([]);
  }
  handleInitialize(userId) {
    const { initialize, user } = this.props;
    let initData = {};
    if (userId !== 'register') {
      initData = user.UserInfo;
    }
    initialize(initData);
  }
  isNumber = event => {
    const isNumeric = /^\d+$/.test(event.target.value);
    if (isNumeric || event.target.value === '') {
      this.props.change('phoneNumber', event.target.value);
    }
  };
  renderField = ({
    input,
    type,
    label,
    placeholder,
    meta: { touched, error, warning },
  }) => {
    const { classes } = this.props;
    return (
      <div className={classes.textField}>
        <div className={classes.fieldName}>
          {label}
          <span className={classes.textfieldName}> *</span>:
        </div>
        <div className={classes.fieldInput}>
          <input
            {...input}
            type={type}
            className={`${classes.input} ${classes.text}`}
            placeholder={placeholder}
          />
          <div className={classes.fieldError}>
            {touched &&
              ((error && <span className={classes.textError}>{error}</span>) ||
                (warning && <span className={classes.text}>{warning}</span>))}
          </div>
        </div>
      </div>
    );
  };
  renderDate = ({
    input,
    type,
    label,
    placeholder,
    meta: { touched, error, warning },
  }) => {
    const { classes } = this.props;
    return (
      <div className={classes.textField}>
        <div className={classes.fieldName}>
          {label}
          <span className={classes.textfieldName}> *</span>:
        </div>
        <div className={classes.fieldInput}>
          <input
            {...input}
            type={type}
            className={`${classes.inputDate} ${classes.text}`}
            placeholder={placeholder}
          />
          <div className={classes.fieldError}>
            {touched &&
              ((error && <span className={classes.textError}>{error}</span>) ||
                (warning && <span className={classes.text}>{warning}</span>))}
          </div>
        </div>
      </div>
    );
  };
  renderInput = ({
    input,
    type,
    placeholder,
    meta: { touched, error, warning },
  }) => {
    const { classes } = this.props;
    return (
      <div className={classes.textField}>
        <div className={classes.fieldInput}>
          <input
            {...input}
            type={type}
            onChange={e => this.isNumber(e)}
            className={`${classes.inputPhone} ${classes.text}`}
            placeholder={placeholder}
          />
          <div className={classes.fieldError}>
            {touched &&
              ((error && <span className={classes.textError}>{error}</span>) ||
                (warning && <span className={classes.text}>{warning}</span>))}
          </div>
        </div>
      </div>
    );
  };
  resetData() {
    const {
      reset,
      resetDataAdd,
      resetDataRole,
      resetDataAttachFile,
      pristine,
      user,
    } = this.props;
    const roles = [];
    const additionals = [];
    if (!pristine) {
      reset();
    }
    if (!_.isEmpty(user.UserInfo.additional)) {
      user.UserInfo.additional.forEach(item => {
        const _id = chance.guid();
        additionals.push({
          _id,
          id: _id,
          value: item.value,
          key: item.key,
        });
      });
    }
    if (!_.isEmpty(user.UserInfo.dataRole)) {
      user.UserInfo.dataRole.forEach(item => {
        const _id = chance.guid();
        roles.push({
          _id,
          id: _id,
          value: item.value,
          label: item.label,
        });
      });
    }
    resetDataAdd(additionals);
    resetDataAttachFile(user.UserInfo.dataImage);
    resetDataRole(roles);
  }
  goToUserList() {
    this.props.history.replace({
      pathname: `${UrlPath}/user-list`,
    });
  }
  handleChangeGender = value => {
    this.props.change('gender', value);
  };
  handleChangeNationality = value => {
    this.props.change('nationality', value);
  };
  handleChangePhoneNumber = value => {
    this.props.change('area_code', value);
  };
  handleDateChange = date => {
    this.props.change('birthday', date);
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
  render() {
    const {
      handleSubmit,
      classes,
      pristine,
      submitting,
      user,
      addInfor,
      role,
      attach,
    } = this.props;
    let check = true;
    if (
      !_isEqual(addInfor.dataAddInformation, user.UserInfo.additional || []) ||
      !_isEqual(role.dataUserRole, user.UserInfo.dataRole || []) ||
      !_isEqual(attach.dataImage, user.UserInfo.dataImage || []) ||
      !pristine
    ) {
      check = false;
    }
    return (
      <form onSubmit={handleSubmit} className={classes.form}>
        {user.isLoading && this.displayLoading()}
        <div className={classes.buttonHeader}>
          <Button variant="primary" type="submit" disabled={submitting}>
            <FormattedMessage {...messages.buttonRegister} />
          </Button>
          <Button
            variant="secondary"
            type="button"
            disabled={check}
            onClick={() => this.resetData()}
          >
            <FormattedMessage {...messages.buttonClear} />
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => this.goToUserList()}
          >
            <FormattedMessage {...messages.buttonCancel} />
          </Button>
        </div>
        <div className={classes.formContent}>
          <div className={classes.itemForm}>
            <div className={classes.personal}>
              <PanelTitle
                title={<FormattedMessage {...messages.personal} />}
                subtitle={2}
              />
              <div className={classes.itemFormContent}>
                <div className={classes.contentLeft}>
                  <Field
                    name="name"
                    type="text"
                    component={this.renderField}
                    label={<FormattedMessage {...messages.username} />}
                    placeholder="Username"
                  />
                  <Field
                    name="firstName"
                    type="text"
                    component={this.renderField}
                    label={<FormattedMessage {...messages.firstName} />}
                    placeholder="First Name"
                  />
                  <div className={classes.textField}>
                    <div className={classes.fieldName}>
                      <FormattedMessage {...messages.gender} />
                      <span className={classes.textfieldName}> *</span>:
                    </div>
                    <div className={classes.fieldInput}>
                      <Field
                        className={`${classes.inputGender} ${classes.text}`}
                        name="gender"
                        component={SearchBox}
                        placeholder="Type or Select Value"
                        options={user.gender}
                        onChangeSelect={this.handleChangeGender}
                      />
                    </div>
                  </div>
                  <div className={classes.textField}>
                    <div className={classes.fieldName}>
                      <FormattedMessage {...messages.phoneNumber} />
                      <span className={classes.textfieldName}> *</span>:
                    </div>
                    <div className={classes.areaCode}>
                      <div className={classes.areaCodeSelect}>
                        <Field
                          className={`${classes.txtareaCode} ${classes.text}`}
                          name="area_code"
                          onChangeSelect={this.handleChangePhoneNumber}
                          component={SearchBox}
                          placeholder="Select"
                          options={user.areaCode}
                        />
                      </div>
                      <Field
                        name="phoneNumber"
                        type="text"
                        component={this.renderInput}
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>
                  <Field
                    name="address"
                    type="text"
                    component={this.renderField}
                    label={<FormattedMessage {...messages.address} />}
                    placeholder="Address"
                  />
                </div>
                <div className={classes.contentRight}>
                  <Field
                    name="email"
                    type="email"
                    component={this.renderField}
                    label={<FormattedMessage {...messages.email} />}
                    placeholder="Email"
                  />
                  <Field
                    name="lastName"
                    type="text"
                    component={this.renderField}
                    label={<FormattedMessage {...messages.lastName} />}
                    placeholder="Last Name"
                  />
                  <div className={classes.textField}>
                    <div className={classes.fieldName}>
                      <FormattedMessage {...messages.birthday} />
                      <span className={classes.textfieldName}> *</span>:
                    </div>
                    <div className={classes.fieldInput}>
                      <Field
                        className={`${classes.inputGender} ${classes.text}`}
                        name="birthday"
                        component={DateField}
                        handleChange={this.handleDateChange}
                        placeholder="Select Date"
                      />
                    </div>
                  </div>
                  <div className={classes.textField}>
                    <div className={classes.fieldName}>
                      <FormattedMessage {...messages.nationality} />
                      <span className={classes.textfieldName}> *</span>:
                    </div>
                    <div className={classes.fieldInput}>
                      <Field
                        className={`${classes.inputGender} ${classes.text}`}
                        name="nationality"
                        component={SearchBox}
                        placeholder="Nationality"
                        options={user.nationality}
                        onChangeSelect={this.handleChangeNationality}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.borderForm}>
              <AdditionalInformation />
            </div>
            <div className={classes.borderForm}>
              <AttachFile />
            </div>
            <div className={classes.borderForm}>
              <RoleInformation />
            </div>
          </div>
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  reset: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  initialize: PropTypes.func.isRequired,
  change: PropTypes.func,
  submitting: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  pristine: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  getUserInformationById: PropTypes.func.isRequired,
  resetDataAttachFile: PropTypes.func.isRequired,
  resetDataAdd: PropTypes.func.isRequired,
  resetDataRole: PropTypes.func.isRequired,
  addInfor: PropTypes.object.isRequired,
  role: PropTypes.object.isRequired,
  attach: PropTypes.object.isRequired,
  getUserInfo: PropTypes.func.isRequired,
};

const RegisterForm = reduxForm({
  form: 'registerForm',
  validate,
})(Form);

export default withStyles(styles)(RegisterForm);
