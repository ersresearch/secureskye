/*
 * @Author: NhuHH 
 * @Date: 2018-11-28 13:21:10 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-06 09:55:15
 */
import { ApiGatewayUrl } from '../constants';

const apiOTManagement = {
  uploadOTA: packageName => `${ApiGatewayUrl}/api/ota?name=${packageName}`,
  releaseOTA: id => `${ApiGatewayUrl}/api/ota/${id}/status`,
  otaList: `${ApiGatewayUrl}/api/ota/metadata`,
  deleteOTA: `${ApiGatewayUrl}/api/ota`,
  ota: otaId => `${ApiGatewayUrl}/api/ota/${otaId}`,
  otaListRelease: `${ApiGatewayUrl}/api/ota?release=true`,
};

export default apiOTManagement;
