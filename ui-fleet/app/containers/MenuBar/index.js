/**
 *
 * Header index
 *
 */

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withTheme } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import injectReducer from 'utils/injectReducer';
import makeSelectLogin from 'containers/Login/selectors';
import { logout } from 'containers/Login/actions';

import { makeSelectMenuBar, makeSelectRoute } from './selectors';
import reducer from './reducer';

import { changeTabHeader, changeTabMenu } from './actions';

import MenuBar from './MenuBar';
import makeSelectVehicleInfo from '../VehicleInfo/selectors';

const mapStateToProps = createStructuredSelector({
  menuBar: makeSelectMenuBar(),
  route: makeSelectRoute(),
  login: makeSelectLogin(),
  vehicleInfo: makeSelectVehicleInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleChangeTabInHeader: tabIndex => dispatch(changeTabHeader(tabIndex)),
    handleChangeTab: tabIndex => dispatch(changeTabMenu(tabIndex)),
    handleLogOut: () => dispatch(logout()),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'menuBar', reducer });

export default compose(
  withTheme(),
  withRouter,
  withReducer,
  withConnect,
)(MenuBar);
