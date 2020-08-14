/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';

import languageProviderReducer from 'containers/LanguageProvider/reducer';
import appDecoratorReducer from 'containers/AppDecorator/reducer';
import loginReducer from 'containers/Login/reducer';
import { reducer as toastrReducer } from 'react-redux-toastr';
import vehicleListReducer from 'containers/FleetVehicle/VehicleList/reducer';
import vehicleInfoReducer from 'containers/VehicleInfo/reducer';
import vehicleMenuReducer from 'containers/VehicleMenu/reducer';
import VehicleSoftwareUpdateReducer from 'containers/VehicleSoftwareUpdate/reducer';
import UsertReducer from 'containers/User/reducer';
import VehicleReduce from 'containers/Vehicle/reducer';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  location: null,
});

/**
 * Merge route into the global application state
 */
export function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload,
      });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    form: reduxFormReducer,
    appDecorator: appDecoratorReducer,
    route: routeReducer,
    language: languageProviderReducer,
    login: loginReducer,
    vehicleInfo: vehicleInfoReducer,
    toastr: toastrReducer,
    vehicleMenu: vehicleMenuReducer,
    vehicleSoftwareUpdate: VehicleSoftwareUpdateReducer,
    vehicleList: vehicleListReducer,
    user: UsertReducer,
    vehicle: VehicleReduce,
    ...injectedReducers,
  });
}
