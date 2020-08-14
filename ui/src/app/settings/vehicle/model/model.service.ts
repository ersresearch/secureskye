import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { vehicle } from '../../../shared/model';
import { Observable, of } from 'rxjs';
import { VehicleService } from '../../../vehicle/vehicle.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModelService implements Resolve<vehicle.admin.IVehicleModelProto> {

  /**
     * Base endpoint for vehicle model api.
     */
  static readonly ENDPOINT_VEHICLES_MODELS = `${VehicleService.ENDPOINT_VEHICLES}/models`;

  constructor(private http: HttpClient) { }

  /**
   * [GET] List all existing vehicle models.
   */
  getListVehicleModels(): Observable<vehicle.admin.IVehicleModelListProto> {
    return this.http.get(ModelService.ENDPOINT_VEHICLES_MODELS).pipe(
      map((resp: ArrayBuffer) => vehicle.admin.VehicleModelListProto.decode(new Uint8Array(resp)))
    );
  }

  /**
   * [GET] Get model info.
   * @param vehicleModelId Vehicle Model ID
   */
  getVehicleModel(vehicleModelId: string): Observable<vehicle.admin.IVehicleModelProto> {
    return this.http.get(`${ModelService.ENDPOINT_VEHICLES_MODELS}/${vehicleModelId}`).pipe(
      map((resp: ArrayBuffer) => vehicle.admin.VehicleModelProto.decode(new Uint8Array(resp)))
    );
  }

  /**
   * [PUT] Update an existing vehicle.
   * @param vehicleModelId Vehicle Model ID.
   * @param updateInfo Vehicle Model new name.
   */
  updateVehicleModel(vehicleModelId: string, updateInfo: vehicle.admin.IVehicleModelProto): Observable<vehicle.admin.IVehicleModelProto> {
    return this.http.put(`${ModelService.ENDPOINT_VEHICLES_MODELS}/${vehicleModelId}`, updateInfo);
  }

  /**
   * [DELETE] Delete an existing vehicle model.
   * @param vehicleId Vehicle Model ID.
   */
  deleteVehicleModel(vehicleModelId: string): Observable<any> {
    return this.http.delete(`${ModelService.ENDPOINT_VEHICLES_MODELS}/${vehicleModelId}`);
  }

  /**
   * [POST] Create a new vehicle model.
   * @param newVehicleModel Vehicle name.
   */
  registerVehicleModel(newVehicleModel: vehicle.admin.IVehicleModelProto): Observable<vehicle.admin.IVehicleModelProto> {
    return this.http.post(ModelService.ENDPOINT_VEHICLES_MODELS, newVehicleModel).pipe(
      map((resp: ArrayBuffer) => vehicle.admin.VehicleModelProto.decode(new Uint8Array(resp)))
    );
  }

  /**
   * Breadcrumb resolver
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<vehicle.admin.IVehicleModelProto> {
    if (route.params['modelId']) {
      return this.getVehicleModel(route.params['modelId']);
    } else {
      return of(vehicle.admin.VehicleModelProto.create());
    }
  }
}
