/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 08:56:18 
 * @Last Modified by: DanND1
 * @Last Modified time: 2018-11-14 15:30:29
 */
import { ApiGatewayUrl } from '../constants';

const OBDVehicle = {
  GetAllVehicle: `${ApiGatewayUrl}/api/vehicles`,
  GetVehicle: vehicleId => `${ApiGatewayUrl}/api/vehicles/${vehicleId}`,
  GetModel: `${ApiGatewayUrl}/api/vehicles/models`,
  GetOBDConfigure: `${ApiGatewayUrl}/api/obd2devices/unregister`,
  UpdateVehicle: vehicleId => `${ApiGatewayUrl}/api/vehicles/${vehicleId}`,
  AddOBDConfigure: (deviceId, vehicleId) =>
    `${ApiGatewayUrl}/api/obd2devices/${deviceId}/vehicle/${vehicleId}`,
  UploadImage: vehicleId => `${ApiGatewayUrl}/api/vehicles/${vehicleId}/image`,
  GetOBDById: vehicleId =>
    `${ApiGatewayUrl}/api/vehicles/${vehicleId}/obd2device`,
};

export default OBDVehicle;
