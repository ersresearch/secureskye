import _isUndefined from 'lodash/isUndefined';
import { ApiGatewayUrl } from '../constants';

const vehicles = {
  vehicles: params => {
    if (!_isUndefined(params)) {
      return `${ApiGatewayUrl}/api/vehicles?search=${params}`;
    }
    return `${ApiGatewayUrl}/api/vehicles`;
  },
  vehicleById: vehicleId => `${ApiGatewayUrl}/api/vehicles/${vehicleId}`,
  vehicleImage: vehicleId => `${ApiGatewayUrl}/api/vehicles/${vehicleId}/image`,
  obd2DeviceVehicle: (deviceId, vehicleId) =>
    `${ApiGatewayUrl}/api/obd2devices/${deviceId}/vehicle/${vehicleId}`,
  odb2Devices: vehicleId =>
    `${ApiGatewayUrl}/api/vehicles/${vehicleId}/obd2device`,
  model: `${ApiGatewayUrl}/api/vehicles/models`,
  odb2Unregister: `${ApiGatewayUrl}/api/obd2devices/unregister`,
};

export default vehicles;
