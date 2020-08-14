/*
 * @Author: DatNT62 
 * @Date: 2018-11-13 08:49:33 
 * @Last Modified by: LoiDT2
 * @Last Modified time: 2018-12-06 10:05:02
 */

import { ApiGatewayUrl } from '../constants';

const apiOBDUser = {
  RegisterUser: `${ApiGatewayUrl}/api/users?`,
  ListUserRoles: `${ApiGatewayUrl}/api/users/roles?`,
  GetUserByID: userId => `${ApiGatewayUrl}/api/users/${userId}`,
  GetUserByName: username => `${ApiGatewayUrl}/api/users?name=${username}`,
  UpdateUser: userId => `${ApiGatewayUrl}/api/users/${userId}`,
  DeleteUser: userId => `${ApiGatewayUrl}/api/users/?${userId}`,
  Roles: `${ApiGatewayUrl}/api/users/roles?`,
  AddUserAdditionalInformation: userId =>
    `${ApiGatewayUrl}/api/users/${userId}/additional-info`,
  UpdateUserAttachment: userId =>
    `${ApiGatewayUrl}/api/users/${userId}/attachment`,
  Active: (userId, value) =>
    `${ApiGatewayUrl}/api/users/${userId}/active?value=${value}`,
  GetImage: (userId, imageId) =>
    `${ApiGatewayUrl}/api/users/${userId}/attachments/${imageId}`,
  UploadImage: userId => `${ApiGatewayUrl}/api/users/${userId}/attachments`,
};

export default apiOBDUser;
