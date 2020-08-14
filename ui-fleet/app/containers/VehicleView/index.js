import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { withRouter } from 'react-router-dom';
import { makeSelectVehicleView } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getVehicleStatus } from './actions';
import VehicleView from './VehicleView';
import makeSelectVehicleInfo from '../VehicleInfo/selectors';

const mapStateToProps = createStructuredSelector({
  vehicleview: makeSelectVehicleView(),
  vehicleInfo: makeSelectVehicleInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    getVehicleStatus: modelId => dispatch(getVehicleStatus(modelId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'vehicleView', reducer });
const withSaga = injectSaga({ key: 'vehicleView', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withRouter,
)(VehicleView);
