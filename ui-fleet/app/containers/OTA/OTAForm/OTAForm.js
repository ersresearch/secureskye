import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { parseQuery } from 'utils/actionUtils';
import styles from 'styles/jss/containers/otaForm';
import FormInfo from './Form/Loadable';

export class OTAForm extends React.PureComponent {
  handleOnSubmit = value => {
    const { match, location, otaForm } = this.props;
    const { direction } = match.params;
    const { id } = parseQuery(location.search);
    const formData = new FormData();
    if (direction === 'create') {
      formData.append('file', otaForm.otaFile);
      this.props.onUploadOTAFile(value.name, formData);
    } else if (direction === 'update' && id) {
      this.props.onUpdateOTAName(id, { name: value.name });
    } else if (direction === 'view' && id) {
      this.props.onReleaseOTA(id, { status: 1 });
    }
  };
  render() {
    return <FormInfo onSubmit={this.handleOnSubmit} />;
  }
}

OTAForm.propTypes = {
  otaForm: PropTypes.object,
  match: PropTypes.object,
  location: PropTypes.object,
  onUploadOTAFile: PropTypes.func,
  onUpdateOTAName: PropTypes.func,
  onReleaseOTA: PropTypes.func,
};

export default withStyles(styles)(OTAForm);
