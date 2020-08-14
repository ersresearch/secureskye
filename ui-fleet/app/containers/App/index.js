/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import FleetDashboard from 'containers/FleetDashboard/Loadable';
import FleetVehicle from 'containers/FleetVehicle/Loadable';
import VehicleView from 'containers/VehicleView/Loadable';
import VehicleSecurity from 'containers/VehicleSecurity/Loadable';
import VehicleAlert from 'containers/VehicleAlert/Loadable';
import MenuBar from 'containers/MenuBar/Loadable';
import Login from 'containers/Login/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import SoftwareUpdateDetail from 'containers/SoftwareUpdateDetail/Loadable';
import VehicleSoftwareUpdate from 'containers/VehicleSoftwareUpdate/Loadable';
import User from 'containers/User/Loadable';
import Vehicle from 'containers/Vehicle/Loadable';
import UserForm from 'containers/User/UserForm/Loadable';
import VehicleForm from 'containers/Vehicle/VehicleForm/Loadable';
import Role from 'containers/Role/Loadable';
import OTA from 'containers/OTA/Loadable';

import ReduxToastr from 'react-redux-toastr';
import { UrlPath } from 'commons/constants';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from 'styles/appTheme';
import { userIsAuthenticated, userIsNotAuthenticated } from 'auth';

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <MenuBar />
      <Switch>
        <Route
          exact
          path={`${UrlPath}`}
          component={userIsNotAuthenticated(Login)}
        />
        <Route
          exact
          path={`${UrlPath}/fleet-dashboard`}
          component={userIsAuthenticated(FleetDashboard)}
        />
        <Route
          exact
          path={`${UrlPath}/fleet-vehicle`}
          component={userIsAuthenticated(FleetVehicle)}
        />
        <Route
          exact
          path={`${UrlPath}/vehicle-view`}
          component={userIsAuthenticated(VehicleView)}
        />
        <Route
          exact
          path={`${UrlPath}/vehicle-security`}
          component={userIsAuthenticated(VehicleSecurity)}
        />
        <Route
          exact
          path={`${UrlPath}/ecu-software-update-detail`}
          component={userIsAuthenticated(SoftwareUpdateDetail)}
        />
        <Route
          exact
          path={`${UrlPath}/vehicle-alert`}
          component={userIsAuthenticated(VehicleAlert)}
        />
        <Route
          exact
          path={`${UrlPath}/vehicle-software-update`}
          component={userIsAuthenticated(VehicleSoftwareUpdate)}
        />
        <Route
          exact
          path={`${UrlPath}/user-list`}
          component={userIsAuthenticated(User)}
        />
        <Route
          exact
          path={`${UrlPath}/user`}
          component={userIsAuthenticated(UserForm)}
        />
        <Route
          exact
          path={`${UrlPath}/vehicle-list`}
          component={userIsAuthenticated(Vehicle)}
        />
        <Route
          exact
          path={`${UrlPath}/vehicle`}
          component={userIsAuthenticated(VehicleForm)}
        />
        <Route
          exact
          path={`${UrlPath}/role/:direction(create|update)?`}
          component={userIsAuthenticated(Role)}
        />
        <Route
          exact
          path={`${UrlPath}/ota/:direction(create|update|view)?`}
          component={userIsAuthenticated(OTA)}
        />
        <Route component={NotFoundPage} />
      </Switch>
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
      />
    </MuiThemeProvider>
  );
}
