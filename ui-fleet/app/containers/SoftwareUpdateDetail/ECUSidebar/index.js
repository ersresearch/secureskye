/**
 *
 * ECU Sidebar
 *
 */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import makeSelectSoftwareManagement from 'containers/VehicleSoftwareUpdate/SoftwareManagement/selectors';
import { makeSelectSoftwareUpdateDetail } from '../selectors';
import ECUSidebar from './ECUSidebar';

const mapStateToProps = createStructuredSelector({
  ECUSoftwareUpdate: makeSelectSoftwareUpdateDetail(),
  SWUpdate: makeSelectSoftwareManagement(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ECUSidebar);
