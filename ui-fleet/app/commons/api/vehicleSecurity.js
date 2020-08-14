import { ApiGatewayUrl } from '../constants';

const apiVehicleSecurity = {
  securityStatus: vehicleId =>
    `${ApiGatewayUrl}/api/vehicles/${vehicleId}/security-status`,
};

export default apiVehicleSecurity;
