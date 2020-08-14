/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 08:55:38 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-12 11:11:01
 */
import { ApiGatewayUrl, ApiNoderedUrl } from '../constants';

const apiECUSoftwareUpdate = {
  ECUSoftwareUpdate: `${ApiNoderedUrl}/api/ecusoftwareupdate`,
  ECUUpdate: `${ApiNoderedUrl}/api/ecuupdate/1/:`,
  ECUTableList: `${ApiNoderedUrl}/api/eculist`,
  ECUList: vehicleId => `${ApiGatewayUrl}/api/vehicles/${vehicleId}/ecus`,
  SWUpdateDetail: ecuId =>
    `${ApiGatewayUrl}/api/vehicles/ecus/${ecuId}/software`,
  softwareVersion: softwareId =>
    `${ApiGatewayUrl}/api/software/${softwareId}/publish`,
  downloadImage: url => `${ApiGatewayUrl}${url}`,
  upgradeSoftware: (otaId, vehicleId) =>
    `${ApiGatewayUrl}/api/software/${otaId}/vehicles/${vehicleId}/publish`,
  software: `${ApiGatewayUrl}/api/software`,
};

export default apiECUSoftwareUpdate;
