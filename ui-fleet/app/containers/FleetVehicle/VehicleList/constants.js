/*
 *
 * VehicleList constants
 *
 */
const PREFIX = 'VEHICLE_LIST_';

export const NA = 'N/A';
export const Disconnected = 'Disconnected';
export const filterVehicle = ['DEFAULT', 'HAS_ALERT', 'AVAILABLE_UPDATE'];

export const actionTypes = {
  CHANGE_SEARCH_VEHICLE: `${PREFIX}CHANGE_SEARCH_VEHICLE`,
  CHANGE_FILTER_VEHICLE: `${PREFIX}CHANGE_FILTER_VEHICLE`,
};
