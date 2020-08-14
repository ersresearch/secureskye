import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import saga from './saga';
import reducer from './reducer';
import OTAForm from './OTAForm';
import makeSelectOTAForm from './selectors';
import { uploadOTAFile, updateOTAName, releaseOTA } from './actions';

const mapStateToProps = createStructuredSelector({
  otaForm: makeSelectOTAForm(),
});

function mapDispatchToProps(dispatch) {
  return {
    onUploadOTAFile: (packageName, data) =>
      dispatch(uploadOTAFile(packageName, data)),
    onUpdateOTAName: (id, name) => dispatch(updateOTAName(id, name)),
    onReleaseOTA: (id, status) => dispatch(releaseOTA(id, status)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'otaForm', reducer });
const withSaga = injectSaga({ key: 'otaForm', saga });

export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(OTAForm);
