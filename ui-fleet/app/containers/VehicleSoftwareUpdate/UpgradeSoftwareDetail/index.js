/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 08:51:49 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-07 08:48:21
 */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { makeSelectUpgradeSoftware } from '../UpgradeSoftware/selectors';
import UpgradeSoftwareDetail from './UpgradeSoftwareDetail';
import {
  changeStatusModal,
  handleUpgradeOTAPackage,
  downloadImageOTAPackage,
} from '../action';

const mapStateToProps = createStructuredSelector({
  packageDetail: makeSelectUpgradeSoftware(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    changeStatusModal: status => dispatch(changeStatusModal(status)),
    handleUpgradeOTAPackage: (otaId, vehicleId) =>
      dispatch(handleUpgradeOTAPackage(otaId, vehicleId)),
    downloadImageOTAPackage: (url, name) =>
      dispatch(downloadImageOTAPackage(url, name)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(UpgradeSoftwareDetail);
