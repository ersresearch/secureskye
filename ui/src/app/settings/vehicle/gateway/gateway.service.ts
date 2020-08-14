import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { vehicle } from '../../../shared/model';
import { map } from 'rxjs/operators';
import { VehicleService } from '../../../vehicle/vehicle.service';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {
  /**
   * Endpoint to get ECU info
   */
  static readonly ENDPOINT_ECU = `${VehicleService.ENDPOINT_VEHICLES}/ecus`;

  constructor(private http: HttpClient) { }

  /**
   * [GET] List all registered gateway.
   */
  getGatewayList(): Observable<vehicle.registry.IEcuInfoListProto> {
    return this.http.get(GatewayService.ENDPOINT_ECU, {
      'params': {
        'filterGateway': 'true'
      }
    }).pipe(map((resp: ArrayBuffer) => vehicle.registry.EcuInfoListProto.decode(new Uint8Array(resp))));
  }

  /**
   * [PUT] Update an existing user.
   * @param gatewayId gateway ID.
   * @param updatedGatewayInfo gateway info need to be updated.
   */
  updateGatewayInfo(gatewayId: string, updatedGatewayInfo: vehicle.registry.IEcuInfoProto): Observable<any> {
    return this.http.put(`${GatewayService.ENDPOINT_ECU}/${gatewayId}`, updatedGatewayInfo)
      .pipe(map((resp: ArrayBuffer) => vehicle.registry.EcuInfoProto.decode(new Uint8Array(resp))));
  }

  /**
   * [DELETE] Delete an existing gateway.
   * @param gatewayId gateway ID.
   */
  deleteGatewayInfo(gatewayId: string): Observable<any> {
    return this.http.delete(`${GatewayService.ENDPOINT_ECU}/${gatewayId}`);
  }

  /**
   * [POST] Create a new user of the provided model.
   * @param modelId User model ID.
   * @param userName User name.
   */
  registerGateway(newGateway: vehicle.registry.IEcuInfoProto): Observable<vehicle.registry.IEcuInfoProto> {
    return this.http.post(GatewayService.ENDPOINT_ECU, newGateway)
      .pipe(map((resp: ArrayBuffer) => vehicle.registry.EcuInfoProto.decode(new Uint8Array(resp))));
  }

  /**
   * [GET] Get gateway info by ID.
   * @param gatewayId gateway ID.
   */
  getGatewayById(gatewayId: string): Observable<vehicle.registry.IEcuInfoProto> {
    return this.http.get(`${GatewayService.ENDPOINT_ECU}/${gatewayId}`)
      .pipe(map((resp: ArrayBuffer) => vehicle.registry.EcuInfoProto.decode(new Uint8Array(resp))));
  }

  /**
   * [GET] List all gateway of a vehicle.
   * @param vehicleId Vehicle Id.
   */
  getVehicleGatewaysList(vehicleId: string): Observable<vehicle.registry.IEcuInfoListProto> {
    return this.http.get(`${VehicleService.ENDPOINT_VEHICLES}/${vehicleId}/gateways`)
      .pipe(map((resp: ArrayBuffer) => vehicle.registry.EcuInfoListProto.decode(new Uint8Array(resp))));
  }

  /**
   * [GET] Get gateway info of a vehicle by Id.
   * @param vehicleId Vehicle Id.
   * @param gatewayId gateway Id.
   */
  getVehicleGatewayById(vehicleId: string, gatewayId: string)
    : Observable<vehicle.registry.IEcuInfoListProto> {
    return this.http.get(`${VehicleService.ENDPOINT_VEHICLES}/${vehicleId}/gateways/${gatewayId}`)
      .pipe(map((resp: ArrayBuffer) => vehicle.registry.EcuInfoListProto.decode(new Uint8Array(resp))));
  }

  /**
   * [DELETE] Delete an existing ecu.
   * @param ecuId ecu ID.
   */
  deleteEcuInfo(ecuId: string): Observable<any> {
    return this.http.delete(`${GatewayService.ENDPOINT_ECU}/${ecuId}`);
  }

  /**
   * [POST] Create new ecu.
   * @param ecuInfo new ecu info.
   */
  registeEcuInfo(ecuInfo: vehicle.registry.IEcuInfoProto)
    : Observable<vehicle.registry.IEcuInfoProto> {
    return this.http.post(GatewayService.ENDPOINT_ECU, ecuInfo)
      .pipe(map((resp: ArrayBuffer) => vehicle.registry.EcuInfoProto.decode(new Uint8Array(resp))));
  }

  /**
   * [GET] List all registered ecu.
   */
  getEcusList(): Observable<vehicle.registry.IEcuInfoListProto> {
    return this.http.get(GatewayService.ENDPOINT_ECU)
      .pipe(map((resp: ArrayBuffer) => vehicle.registry.EcuInfoListProto.decode(new Uint8Array(resp))));
  }

  /**
   * [PUT] Update Ecu info
   * @param ecuId Ecu Id.
   * @param ecuInfo Ecu update info.
   */
  updateEcuInfo(ecuId: string, ecuInfo: vehicle.registry.IEcuInfoProto)
    : Observable<vehicle.registry.IEcuInfoProto> {
    return this.http.put(`${GatewayService.ENDPOINT_ECU}/${ecuId}`, ecuInfo)
      .pipe(map((resp: ArrayBuffer) => vehicle.registry.EcuInfoProto.decode(new Uint8Array(resp))));
  }

  /**
   * [GET] Get Ecu info by Id.
   * @param ecuId ecu Id.
   */
  getEcuInfoById(ecuId: string): Observable<vehicle.registry.EcuInfoProto> {
    return this.http.get(`${GatewayService.ENDPOINT_ECU}/${ecuId}`)
      .pipe(map((resp: ArrayBuffer) => vehicle.registry.EcuInfoProto.decode(new Uint8Array(resp))));
  }

  /**
   * [GET] List all ecus of a vehicle.
   * @param vehicleId Vehicle Id.
   */
  getVehicleEcusList(vehicleId: string): Observable<vehicle.registry.IEcuInfoListProto> {
    return this.http.get(`${VehicleService.ENDPOINT_VEHICLES}/${vehicleId}/ecus`)
      .pipe(map((resp: ArrayBuffer) => vehicle.registry.EcuInfoListProto.decode(new Uint8Array(resp))));
  }

  /**
   * [GET] Get ecu info of a vehicle by Id.
   * @param vehicleId Vehicle Id.
   * @param ecuId Ecu Id.
   */
  getVehicleEcuInfoById(vehicleId: string, ecuId: string)
    : Observable<vehicle.registry.EcuInfoProto> {
    return this.http.get(`${VehicleService.ENDPOINT_VEHICLES}/${vehicleId}/ecus/${ecuId}`)
      .pipe(map((resp: ArrayBuffer) => vehicle.registry.EcuInfoProto.decode(new Uint8Array(resp))));
  }
}
