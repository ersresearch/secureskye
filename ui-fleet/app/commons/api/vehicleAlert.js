/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 08:51:31 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 08:51:31 
 */
import { ApiGatewayUrl } from '../constants';

const vehicleAlert = {
  vehicleAlertComponent: vehicleId =>
    `${ApiGatewayUrl}/api/vehicles/${vehicleId}/ecus/alerts`,
  vehicleAlertNormalFilter: vehicleId =>
    `${ApiGatewayUrl}/api/vehicles/${vehicleId}/ecus?filterGateway=true&filterType=NORMAL `,
  vehicleAlertFilterEcu: ecuId =>
    `${ApiGatewayUrl}/api/vehicles/ecus/${ecuId}/alerts`,
  vehicleAlertEcu: vehicleId =>
    `${ApiGatewayUrl}/api/vehicles/${vehicleId}/ecus?filterGateway=true`,
  vehicleAlertFilter: (vehicleId, type) =>
    `${ApiGatewayUrl}/api/vehicles/${vehicleId}/ecus/alerts?filterType=${type}`,
  ignoreAlert: alertId =>
    `${ApiGatewayUrl}/api/vehicles/ecus/alerts/${alertId}`,
};
export default vehicleAlert;
