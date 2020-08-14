/**
 *
 * UpdateOta
 *
 */

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { readOTAFile, resetOTADetail, getOTADetail } from '../actions';
import Form from './Form';
import makeSelectOTAForm from '../selectors';

const mapStateToProps = createStructuredSelector({
  otaForm: makeSelectOTAForm(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetOTADetail: id => dispatch(getOTADetail(id)),
    onReadOTAFile: (file, data) => dispatch(readOTAFile(file, data)),
    onResetOTADetail: () => dispatch(resetOTADetail()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(Form);
