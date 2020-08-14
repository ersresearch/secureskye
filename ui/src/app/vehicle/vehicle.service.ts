import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { totp, vehicle } from '../shared/model/protoBundle';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as Long from 'long';

@Injectable({
  providedIn: 'root'
})
export class VehicleService implements Resolve<vehicle.admin.IVehicleProto> {

  /**
   * Base endpoint for vehicle route api.
   */
  static readonly ENDPOINT_VEHICLE_ROUTES = '/api/routes';
  /**
   * Base endpoint for vehicle api.
   */
  static readonly ENDPOINT_VEHICLES = '/api/vehicles';

  constructor(private http: HttpClient) { }

  /**
   * [GET] List all currently registered vehicles.
   */
  getListVehicles(): Observable<vehicle.admin.IVehicleListProto> {
    return this.http.get(VehicleService.ENDPOINT_VEHICLES).pipe(
      map((resp: ArrayBuffer) => vehicle.admin.VehicleListProto.decode(new Uint8Array(resp)))
    );
  }

  /**
   * [POST] Create a new vehicle of the provided model.
   * @param modelId Vehicle model ID.
   * @param vehicleName Vehicle name.
   */
  registerVehicle(modelId: string, vehicleName: string): Observable<vehicle.admin.IRegisteredVehicleProto> {
    // An object contain modelId and new vehicle name.
    // because the protoBundle doens't have a new vehicle proto which contain above info
    const newVehicle = {
      modelId: modelId,
      name: vehicleName
    };
    return this.http.post(VehicleService.ENDPOINT_VEHICLES, newVehicle).pipe(
      map((resp: ArrayBuffer) => vehicle.admin.RegisteredVehicleProto.decode(new Uint8Array(resp)))
    );
  }

  /**
   * [POST] Get vehicle info by ID.
   * @param vehicleId Vehicle ID.
   */
  getVehicleById(vehicleId: string): Observable<vehicle.admin.IVehicleProto> {
    return this.http.get(`${VehicleService.ENDPOINT_VEHICLES}/${vehicleId}`).pipe(
      map((resp: ArrayBuffer) => vehicle.admin.VehicleProto.decode(new Uint8Array(resp)))
    );
  }

  /**
   * [PUT] Rename an existing vehicle.
   * @param vehicleId Vehicle ID.
   * @param name Vehicle new name.
   */
  renameVehicle(vehicleId: string, name: string): Observable<any> {
    return this.http.put(`${VehicleService.ENDPOINT_VEHICLES}/${vehicleId}/rename`, null, {
      params: {
        newName: name
      }
    });
  }

  /**
   * [DELETE] Delete an existing vehicle.
   * @param vehicleId Vehicle ID.
   */
  deleteVehicle(vehicleId: string): Observable<any> {
    return this.http.delete(`${VehicleService.ENDPOINT_VEHICLES}/${vehicleId}`);
  }

  /**
   * [GET] List the recent events of a vehicle.
   * @param vehicleId Vehicle ID.
   * @param limit Limit number of message recieved. (default: 10, min: 1, max: 10)
   */
  getEventMessages(vehicleId: string, limit: number = 10) {
    return this.http.get(`${VehicleService.ENDPOINT_VEHICLES}/${vehicleId}/events`, {
      params: {
        limit: limit.toString()
      }
    }).pipe(
      map((resp: ArrayBuffer) => vehicle.message.EventBatchProto.decode(new Uint8Array(resp)))
    );
  }

  /**
   * [PUT] Rename an existing route.
   * @param routeKey key The identifier of the route.
   * @param routeName The new name for the route.
   */
  renameVehicleRoute(routeKey: string, routeName: string): Observable<any> {
    return this.http.put(`${VehicleService.ENDPOINT_VEHICLE_ROUTES}/${routeKey}/rename`, null, {
      params: {
        newName: routeName
      }
    });
  }

  /**
   * [DELETE] Delete an existing route.
   * @param routeKey key The identifier of the route.
   */
  deleteVehicleRoute(routeKey: string): Observable<any> {
    return this.http.delete(`${VehicleService.ENDPOINT_VEHICLE_ROUTES}/${routeKey}`);
  }

  /**
   * [GET] Load route data include all gps data.
   * @param routeKey key The identifier of the route.
   */
  getVehicleRouteData(routeKey: string): Observable<vehicle.message.IFullGpsRouteProto> {
    return this.http.get(`${VehicleService.ENDPOINT_VEHICLE_ROUTES}/${routeKey}`).pipe(
      map((resp: ArrayBuffer) => vehicle.message.FullGpsRouteProto.decode(new Uint8Array(resp)))
    );
  }

  /**
   * [GET] List all routes for a specific vehicle.
   * @param vehicleId Vehicle ID.
   */
  getVehicleRoutes(vehicleId: string): Observable<vehicle.message.IGpsRouteListProto> {
    return this.http.get(`${VehicleService.ENDPOINT_VEHICLES}/${vehicleId}/routes`).pipe(
      map((resp: ArrayBuffer) => vehicle.message.GpsRouteListProto.decode(new Uint8Array(resp)))
    );
  }

  /**
   * [POST] Create new route and start tracking
   * @param vehicleId Vehicle ID.
   * @param limit time limit
   * @param routeName Route name.
   */
  createVehicleRoute(vehicleId: string, routeName: string = '', limit: number = 3600): Observable<string> {
    return this.http.post(`${VehicleService.ENDPOINT_VEHICLES}/${vehicleId}/routes`, null, {
      params: {
        limit: limit.toString(),
        name: routeName
      }
    }).pipe(
      map((resp: ArrayBuffer) => {
        const js = String.fromCharCode.apply(null, new Uint8Array(resp));
        return JSON.parse(js);
      })
    );
  }

  /**
   * [PUT] Finish the tracking of a GPS route. If the tracking started with [createVehicleRoute] already exceeded
   * its limit, nothing will happen.
   * @param routeKey The identifier of the route to finish.
   */
  finishVehicleRoute(routeKey: string): Observable<vehicle.message.IGpsRouteProto> {
    return this.http.put(`${VehicleService.ENDPOINT_VEHICLE_ROUTES}/${routeKey}/finish`, null);
  }

  /**
   * [GET] List all routes for a specific vehicle.
   * @param vehicleId Vehicle ID.
   * @param since The timestamp since when items should be retrieved.
   */
  getVehicleMessages(vehicleId: string, since: Long): Observable<vehicle.message.IMessageBatchProto> {
    let params = {};
    if (since.gt(0)) {
      params = {
        since: since.toString()
      };
    }
    return this.http.get(`${VehicleService.ENDPOINT_VEHICLES}/${vehicleId}/messages`, {
      params: params
    }).pipe(
      map((resp: ArrayBuffer) => vehicle.message.MessageBatchProto.decode(new Uint8Array(resp)))
    );
  }

  /**
   * [POST] Register for 2fa
   */
  register2FactorAuthentication(vehicleId: string, modelId: string): Observable<totp.IOauthTotpProto> {
    return this.http.post(`${VehicleService.ENDPOINT_VEHICLES}/${vehicleId}/2fa`, null, {
      params: {
        oauthGroup: modelId
      }
    }).pipe(
      map((resp: ArrayBuffer) => totp.OauthTotpProto.decode(new Uint8Array(resp)))
    );
  }

  /**
   * [GET] Get 2fa info
   */
  request2FactorAuthenticationStatus(vehicleId: string): Observable<totp.IOauthTotpProto> {
    return this.http.get(`${VehicleService.ENDPOINT_VEHICLES}/${vehicleId}/2fa`).pipe(
      map((resp: ArrayBuffer) => totp.OauthTotpProto.decode(new Uint8Array(resp)))
    );
  }

  /**
   * [PUT] Conrifm 2fa
   * @param otp otp for verification
   */
  confirm2FactorAuthentication(vehicleId: string, otp: string): Observable<any> {
    return this.http.put(`${VehicleService.ENDPOINT_VEHICLES}/${vehicleId}/2fa`, null, {
      params: {
        otp: otp
      }
    });
  }

  /**
   * [DELETE] Unregister for 2fa
   */
  unregister2FactorAuthentication(vehicleId: string, otp: string): Observable<any> {
    return this.http.delete(`${VehicleService.ENDPOINT_VEHICLES}/${vehicleId}/2fa`, {
      params: {
        otp: otp
      }
    });
  }

  /**
   * [DELETE] Reset 2fa
   */
  reset2FactorAuthentication(vehicleId: string, scratchCode: string): Observable<any> {
    return this.http.delete(`${VehicleService.ENDPOINT_VEHICLES}/${vehicleId}/2fa`, {
      params: {
        scratchCode: scratchCode
      }
    });
  }

  /**
   * Breadcrumb resolver
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<vehicle.admin.IVehicleProto> {
    if (route.params['vehicleId']) {
      return this.getVehicleById(route.params['vehicleId']);
    } else {
      return of(vehicle.admin.VehicleProto.create());
    }
  }
}
