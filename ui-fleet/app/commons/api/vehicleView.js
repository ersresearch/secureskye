/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 08:52:52 
 * @Last Modified by: LoiDT2
 * @Last Modified time: 2018-11-16 13:28:41
 */
import { ApiGatewayUrl } from '../constants';

const apiVehicleView = {
  status: vehicleId =>
    `${ApiGatewayUrl}/api/vehicles/${vehicleId}/display-settings`,
  markers: vehicleId =>
    `${ApiGatewayUrl}/api/vehicles/${vehicleId}/ecus/alerts`,
  placeName: (long, lat) =>
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${long}%2C${lat}.json?access_token=pk.eyJ1IjoiZGF0bnQxOTk3IiwiYSI6ImNqanpnc3V4bWF3bWEza3AxZ2djYjhjejgifQ.7GgJ7WOka4SC1-1BECZnQA`,
  timeDataGraphSpeed: `${ApiGatewayUrl}/api/vehicles`,
  theLatestPoint: vehicleId =>
    `${ApiGatewayUrl}/api/vehicles/${vehicleId}/events/obd2`,
  timeDataGraphSpeedFilter: (vehicleId, minTimestamp, timeSeriesOption) =>
    `${ApiGatewayUrl}/api/vehicles/${vehicleId}/events/speed?minTimestamp=${minTimestamp}&timeSeriesOption=${timeSeriesOption}`,
  timeDataGraphRpmFilter: (vehicleId, minTimestamp, timeSeriesOption) =>
    `${ApiGatewayUrl}/api/vehicles/${vehicleId}/events/rpm?minTimestamp=${minTimestamp}&timeSeriesOption=${timeSeriesOption}`,
  componentAlerts: vehicleId =>
    `${ApiGatewayUrl}/api/vehicles/${vehicleId}/component-alerts`,
  componentStatus: vehicleId =>
    `${ApiGatewayUrl}/api/vehicles/${vehicleId}/component-status`,
};

export default apiVehicleView;
