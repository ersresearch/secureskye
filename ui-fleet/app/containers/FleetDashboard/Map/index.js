/*
 * @Author: DatNT62 
 * @Date: 2018-11-13 08:59:19 
 * @Last Modified by:   DatNT62 
 * @Last Modified time: 2018-11-13 08:59:19 
 */
/**
 *
 * Map
 *
 */

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAlertDashboard from '../AlertDashboard/selectors';
import makeSelectMap from './selectors';
import reducer from './reducer';
import saga from './saga';
import Map from './Map';
import { getAllMarkers } from './actions';

const mapStateToProps = createStructuredSelector({
  mapObject: makeSelectMap(),
  alertDashboard: makeSelectAlertDashboard(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleGetAllMarkers: () => dispatch(getAllMarkers()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'map', reducer });
const withSaga = injectSaga({ key: 'map', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Map);
