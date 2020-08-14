/*
 * @Author: NhuHH 
 * @Date: 2018-11-28 07:54:39 
 * @Last Modified by: DanND1
 * @Last Modified time: 2018-12-14 13:13:24
 */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectOTAPackage from './selectors';
import {
  handleStatusCheckList,
  displayDeleteDialog,
  handleDeleteOTA,
  getOTA,
  handleSelectRowId,
} from './actions';
import saga from './saga';
import reducer from './reducer';
import OTAPackage from './OTAPackage';

const mapStateToProps = createStructuredSelector({
  otaPackage: makeSelectOTAPackage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getOTA: () => dispatch(getOTA()),
    handleStatusCheckList: list => dispatch(handleStatusCheckList(list)),
    displayDeleteDialog: status => dispatch(displayDeleteDialog(status)),
    handleDeleteOTA: list => dispatch(handleDeleteOTA(list)),
    handleSelectRowId: id => dispatch(handleSelectRowId(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'otaPackage', reducer });
const withSaga = injectSaga({ key: 'otaPackage', saga });

export default compose(
  withSaga,
  withReducer,
  withRouter,
  withConnect,
)(OTAPackage);
