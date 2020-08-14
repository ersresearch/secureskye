/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 08:54:57 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-05 11:05:18
 */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import makeSelectSoftwareManagement from 'containers/VehicleSoftwareUpdate/SoftwareManagement/selectors';

import { makeSelectSoftwareUpdateDetail } from '../selectors';
import {
  getData,
  getLicenseUpdate,
  resetData,
  getDataSodtwareVersion,
} from '../actions';
import ECUSoftwareUpdate from './ECUSoftwareUpdate';
import { joinNotificationRoom } from './socketAction';

/* eslint-disable react/prefer-stateless-function */
const mapStateToProps = createStructuredSelector({
  handleUpdateLicense: makeSelectSoftwareUpdateDetail(),
  SWUpdate: makeSelectSoftwareManagement(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetData: ecuID => dispatch(getData(ecuID)),
    handleJoinSoftwareVersionRoom: id => dispatch(joinNotificationRoom(id)),
    getHandleUpdate: (id, ecuId) => dispatch(getLicenseUpdate(id, ecuId)),
    resetData: () => dispatch(resetData()),
    getDataSodtwareVersion: () => dispatch(getDataSodtwareVersion()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(ECUSoftwareUpdate);
