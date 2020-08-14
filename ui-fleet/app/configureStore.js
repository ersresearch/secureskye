/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import authFlowSaga from 'containers/Login/saga';
import vehicleSoftwareUpdate from 'containers/VehicleSoftwareUpdate/saga';
import vehicleInfo from 'containers/VehicleInfo/saga';
import vehicleAlerts from 'containers/VehicleAlert/saga';
import UserManagement from 'containers/User/saga';
import VehicleManagement from 'containers/Vehicle/saga';
import RoleManagement from 'containers/Role/saga';
import createReducer from './reducers';
import socketioMiddleware from './middlewares/socketioMiddleware';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(
  initialState = {},
  history,
  socketClient,
) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
    socketioMiddleware(socketClient),
  ];

  const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle, indent */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // TODO Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
          // Prevent recomputing reducers for `replaceReducer`
          shouldHotReload: false,
        })
      : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers),
  );

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry
  sagaMiddleware.run(vehicleSoftwareUpdate);
  sagaMiddleware.run(vehicleInfo);
  sagaMiddleware.run(vehicleAlerts);
  sagaMiddleware.run(authFlowSaga);
  sagaMiddleware.run(UserManagement);
  sagaMiddleware.run(VehicleManagement);
  sagaMiddleware.run(RoleManagement);

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
