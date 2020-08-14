/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 08:53:20 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 08:53:20 
 */
import { ApiNoderedUrl } from '../constants';

const vehicleUpdateApi = {
  allVehicleLicense: `${ApiNoderedUrl}/api/getAllVehicleLicense`,
  vehicleStatusUpdate: `${ApiNoderedUrl}/api/updateLicense/1/:`,
  vehicleLicenseUpdate: `${ApiNoderedUrl}/api/allVehicleUpdate`,
};

export default vehicleUpdateApi;
