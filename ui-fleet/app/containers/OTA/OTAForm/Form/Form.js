import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import JSZip from 'jszip';
import yaml from 'js-yaml';
import _isEqual from 'lodash/isEqual';
import _isEmpty from 'lodash/isEmpty';
import _isUndefined from 'lodash/isUndefined';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core';
import { reduxForm, Field } from 'redux-form/immutable/';
import { UrlPath } from 'commons/constants';
import PanelTitle from 'components/PanelTitle';
import Button from 'components/Button';
import validate from 'components/validationForm';
import { ShowNotify, parseQuery } from 'utils/actionUtils';
import styles from 'styles/jss/containers/otaForm';
import Loading from 'components/CircularProgress';
import InputField from 'components/InputField';
import messages from '../../messages';

const Published = 'Released';
export class Form extends React.PureComponent {
  componentDidMount() {
    const { location } = this.props;
    const { id } = parseQuery(location.search);
    if (!_isUndefined(id)) {
      this.props.onGetOTADetail(id);
    }
  }

  initData = otaDetail => {
    const { match, change } = this.props;
    const { direction } = match.params;
    const data = { ...otaDetail };
    data.ecus = yaml.dump(data.ecus);
    if (direction === 'create') {
      change('file', data.file);
      change('category', data.category);
      change('family', data.family);
      change('ecus', data.ecus);
    } else {
      this.props.initialize(data);
    }
  };

  componentDidUpdate(prevProps) {
    const { otaDetail } = this.props.otaForm;
    if (
      !_isEqual(otaDetail, prevProps.otaForm.otaDetail) &&
      !_isEmpty(otaDetail)
    ) {
      this.initData(otaDetail);
    }
  }

  componentWillUnmount() {
    this.props.onResetOTADetail();
  }

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

  handleReadOTAFile = file => {
    const { onReadOTAFile } = this.props;
    if (
      file.type === 'application/x-zip-compressed' ||
      file.type === 'application/x-gzip'
    ) {
      if (file.size <= 10490658) {
        JSZip.loadAsync(file).then(zip => {
          const metadata = zip.file('metadata.yaml');
          if (metadata) {
            metadata
              .async('string')
              .then(content => {
                const data = yaml.load(content);
                data.file = file.name;
                onReadOTAFile(file, data);
              })
              .catch(error => {
                ShowNotify('warning', error);
              });
          } else {
            ShowNotify('warning', `Can't not found metadata.yaml file`);
            this.resetData();
          }
        });
      } else {
        ShowNotify('warning', 'File maxsize is 10Mb');
        this.resetData();
      }
    } else {
      ShowNotify('warning', 'Please choose type of file is ZIP');
      this.resetData();
    }
  };

  handleChooseFile = e => {
    e.preventDefault();
    const [file] = e.target.files;
    if (!_isUndefined(file)) {
      this.handleReadOTAFile(file);
    }
  };
  goToOTAList = () => {
    this.props.history.replace({
      pathname: `${UrlPath}/ota`,
    });
  };
  resetData = () => {
    const { reset, onResetOTADetail, match } = this.props;
    const { direction } = match.params;
    if (direction === 'create') {
      document.getElementById('file').value = '';
      onResetOTADetail();
    }
    reset();
  };
  renderFieldTextArea = ({
    input,
    label,
    type,
    disabled,
    meta: { touched, error, warning },
  }) => {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <textarea
          {...input}
          type={type}
          placeholder={label}
          className={classes.txtTextArea}
          disabled={disabled}
        />
        {touched &&
          ((error && <span className={classes.textError}>{error}</span>) ||
            (warning && <span className={classes.text}>{warning}</span>))}
      </React.Fragment>
    );
  };
  displayHeaderButton = () => {
    const { match, classes, submitting, pristine } = this.props;
    const { otaDetail } = this.props.otaForm;
    const { direction } = match.params;
    if (direction === 'view') {
      return (
        <div className={classes.buttonHeader}>
          <Button
            variant={otaDetail.status !== Published ? 'primary' : 'secondary'}
            type="submit"
            disabled={otaDetail.status !== Published ? submitting : true}
          >
            {otaDetail.status !== Published ? (
              <FormattedMessage {...messages.btnPublish} />
            ) : (
              <FormattedMessage {...messages.btnPublished} />
            )}
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => this.goToOTAList()}
          >
            <FormattedMessage {...messages.btnCancel} />
          </Button>
        </div>
      );
    }
    return (
      <div className={classes.buttonHeader}>
        <Button variant="primary" type="submit" disabled={submitting}>
          <FormattedMessage {...messages.btnSave} />
        </Button>
        <Button
          variant="secondary"
          type="button"
          disabled={pristine || submitting}
          onClick={() => this.resetData()}
        >
          <FormattedMessage {...messages.btnReset} />
        </Button>
        <Button
          variant="secondary"
          type="button"
          onClick={() => this.goToOTAList()}
        >
          <FormattedMessage {...messages.btnCancel} />
        </Button>
      </div>
    );
  };
  displayUploadFile = () => {
    const { match, classes } = this.props;
    const { direction } = match.params;
    if (direction === 'create') {
      return (
        <div className={classes.wrapperUploadFile}>
          <div className={classes.wrapperInput}>
            <span className={classes.textTitle}>
              <FormattedMessage {...messages.uploadFile} />
              <span className={classes.textImportant}> *</span>:
            </span>
            <div className={classes.inputField}>
              <Field
                component={InputField}
                disabled
                name="file"
                label="Choose a file or drag it here"
              />
            </div>
          </div>
          <div className={classes.updateBtnWrapper}>
            <Button variant="primary" className={classes.btnUploadFile}>
              <FormattedMessage {...messages.btnUpload} />
            </Button>
            <input
              id="file"
              className={classes.chooseImg}
              type="file"
              accept="application/x-zip-compressed, application/x-gzip"
              onChange={e => this.handleChooseFile(e)}
            />
          </div>
        </div>
      );
    }
    return null;
  };
  displayName = () => {
    const { match, classes } = this.props;
    const { direction } = match.params;

    return (
      <div className={classes.wrapperInput}>
        <span className={classes.textTitle}>
          <FormattedMessage {...messages.name} />
          {direction === 'view' ? (
            <span>:</span>
          ) : (
            <span>
              <span className={classes.textImportant}> *</span>:
            </span>
          )}
        </span>
        <div className={classes.inputField}>
          <Field
            disabled={direction === 'view'}
            component={InputField}
            name="name"
            label={direction === 'view' ? null : 'Update patch'}
          />
        </div>
      </div>
    );
  };
  render() {
    const { handleSubmit, classes, otaForm } = this.props;
    return (
      <form onSubmit={handleSubmit} className={classes.formContainer}>
        {otaForm.isLoading && this.displayLoading()}
        {this.displayHeaderButton()}
        <div className={classes.otaForm}>
          <PanelTitle
            title={<FormattedMessage {...messages.title} />}
            subtitle={2}
          />
          <div className={classes.otaInfo}>
            {this.displayUploadFile()}
            {this.displayName()}
            <div className={classes.wrapperInput}>
              <span className={classes.textTitle}>
                <FormattedMessage {...messages.category} />:
              </span>
              <div className={classes.inputField}>
                <Field disabled component={InputField} name="category" />
              </div>
            </div>
            <div className={classes.wrapperInput}>
              <span className={classes.textTitle}>
                <FormattedMessage {...messages.family} />:
              </span>
              <div className={classes.inputField}>
                <Field disabled component={InputField} name="family" />
              </div>
            </div>
            <div className={classes.wrapperInput}>
              <span className={classes.textTitle}>
                <FormattedMessage {...messages.ecus} />:
              </span>
              <div className={classes.inputField}>
                <Field
                  disabled
                  component={this.renderFieldTextArea}
                  name="ecus"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  disabled: PropTypes.bool,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  reset: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  onGetOTADetail: PropTypes.func,
  initialize: PropTypes.func,
  history: PropTypes.object,
  otaForm: PropTypes.object,
  onReadOTAFile: PropTypes.func,
  onResetOTADetail: PropTypes.func,
};

export default compose(
  withStyles(styles),
  reduxForm({
    form: 'ota',
    validate,
  }),
)(Form);
