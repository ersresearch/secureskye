import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import _isUndefined from 'lodash/isUndefined';
import _isEqual from 'lodash/isEqual';
import _isEmpty from 'lodash/isEmpty';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import styles from 'styles/jss/containers/roleForm';
import Button from 'components/Button';
import validate from 'components/validationForm';
import InputField from 'components/InputField';
import messages from 'containers/Role/messages';
import { UrlPath } from 'commons/constants';
import { parseQuery } from 'utils/actionUtils';
import Loading from 'components/CircularProgress';
import UserList from './UserList';
import AuthorityConfiguration from './AuthorityConfiguration';

export class RoleForm extends React.PureComponent {
  gotoRoleList = () => {
    this.props.history.replace(`${UrlPath}/role`);
  };

  componentDidMount() {
    const { location } = this.props;
    const { id } = parseQuery(location.search);
    if (!_isUndefined(id)) {
      this.props.getRoleByID(id);
    }
  }
  handleResetData = () => {
    const { reset, role, onResetInitData, pristine } = this.props;
    if (!pristine) {
      reset();
    }
    onResetInitData(role.roleDetail);
  };
  handleChange = row => event => {
    const temp = this.props.role.listUserChecked;
    if (event.target.checked !== undefined) {
      if (event.target.checked === true) {
        temp.push(row.original.id);
      } else {
        const index = temp.findIndex(element => element === row.id);
        temp.splice(index, 1);
      }
    }
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
  componentDidUpdate(prevProps) {
    const { role } = this.props;
    if (
      !_isEmpty(role.roleDetail) &&
      !_isEqual(prevProps.role.roleDetail, role.roleDetail)
    ) {
      this.props.initialize(role.roleDetail);
    }
  }

  componentWillUnmount() {
    this.props.onResetRoleDetail();
  }

  render() {
    const { classes, handleSubmit, pristine, submitting, role } = this.props;
    const { usersList, authoritiesList, roleDetail } = role;
    let check = true;
    if (
      !_isEqual(usersList, roleDetail.users || []) ||
      !_isEqual(authoritiesList, roleDetail.authorities || []) ||
      !pristine
    ) {
      check = false;
    }
    return (
      <form className={classes.formContainer} onSubmit={handleSubmit}>
        {role.isLoading && this.displayLoading()}
        <div className={classes.wrapperBtn}>
          <Button disabled={submitting} type="submit" variant="primary">
            <FormattedMessage {...messages.save} />
          </Button>
          <Button
            disabled={check}
            onClick={() => this.handleResetData()}
            variant="secondary"
          >
            <FormattedMessage {...messages.reset} />
          </Button>
          <Button onClick={() => this.gotoRoleList()} variant="secondary">
            <FormattedMessage {...messages.cancel} />
          </Button>
        </div>
        <Divider />
        <div className={`${classes.wrapperContent} ${classes.detail}`}>
          <div className={classes.wrapperInput}>
            <span className={classes.textTitle}>
              <FormattedMessage {...messages.name} />{' '}
              <span className={classes.textImportant}>*</span>:
            </span>
            <div className={classes.inputField}>
              <Field component={InputField} name="name" label="Name" />
            </div>
          </div>
          <div className={classes.wrapperInput}>
            <span className={classes.textTitle}>
              <FormattedMessage {...messages.description} />{' '}
              <span className={classes.textImportant}>*</span>:
            </span>
            <div className={classes.inputField}>
              <Field
                component={InputField}
                name="description"
                label="Description"
              />
            </div>
          </div>
        </div>
        <Divider />
        <UserList />
        <Divider />
        <AuthorityConfiguration />
      </form>
    );
  }
}

RoleForm.propTypes = {
  getRoleByID: PropTypes.func,
  location: PropTypes.object,
  data: PropTypes.object,
  role: PropTypes.object,
  history: PropTypes.object,
  classes: PropTypes.object,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onUpdateUserCheckedList: PropTypes.func,
  initialize: PropTypes.func.isRequired,
  onResetInitData: PropTypes.func,
  onResetRoleDetail: PropTypes.func,
};

export default compose(
  reduxForm({
    form: 'role',
    validate,
  }),
  withStyles(styles),
)(RoleForm);
