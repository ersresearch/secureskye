/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 08:52:56 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-01 14:14:23
 */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import injectReducer from 'utils/injectReducer';
import { makeSelectUpgradeSoftware } from './selectors';
import reducer from './reducer';
import UpgradeSoftware from './UpgradeSoftware';
import {
  getDataUpgradeSoftware,
  handleSelectRowId,
  getDataOTAPackage,
  changeStatusModal,
} from '../action';

const mapStateToProps = createStructuredSelector({
  software: makeSelectUpgradeSoftware(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getDataUpgradeSoftware: () => dispatch(getDataUpgradeSoftware()),
    handleSelectRowId: id => dispatch(handleSelectRowId(id)),
    getDataOTAPackage: otaId => dispatch(getDataOTAPackage(otaId)),
    changeStatusModal: status => dispatch(changeStatusModal(status)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'upgradeSoftware', reducer });

export default compose(
  withReducer,
  withConnect,
  withRouter,
)(UpgradeSoftware);
