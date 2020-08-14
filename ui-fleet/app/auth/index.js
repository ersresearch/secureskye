import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import _isEmpty from 'lodash/isEmpty';
import { UrlPath } from 'commons/constants';

const locationHelper = locationHelperBuilder({});

export const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: `${UrlPath}/`,
  authenticatedSelector: state =>
    state.toJS().login.loggedIn || !_isEmpty(state.toJS().login.userDetail),
  wrapperDisplayName: 'UserIsAuthenticated',
});

export const userIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) ||
    `${UrlPath}/fleet-dashboard`,
  allowRedirectBack: false,
  authenticatedSelector: state =>
    !state.toJS().login.loggedIn && _isEmpty(state.toJS().login.userDetail),
  wrapperDisplayName: 'UserIsNotAuthenticated',
});
