/*
 * @Author: DatNT62 
 * @Date: 2018-11-16 10:27:49 
 * @Last Modified by: DanND1
 * @Last Modified time: 2018-11-22 10:22:37
 */
import { ApiGatewayUrl } from '../constants';

const role = {
  roleByID: id => `${ApiGatewayUrl}/api/users/roles/${id}`,
  authorities: `${ApiGatewayUrl}/api/users/authorities`,
  roles: `${ApiGatewayUrl}/api/users/roles`,
};

export default role;
