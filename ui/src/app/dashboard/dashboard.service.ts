import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { user, vehicle, ota } from '../shared/model';
import { UserService } from '../settings/user/user.service';
import { VehicleService } from '../vehicle/vehicle.service';
import { OtaService } from '../ota/ota.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  /**
   * [GET] get user statistics
   */
  getUserStastistics(): Observable<user.admin.IUserStatisticsProto> {
    return this.http.get(`${UserService.ENDPOINT_USER}/statistics`)
      .pipe(map((resp: ArrayBuffer) => user.admin.UserStatisticsProto.decode(new Uint8Array(resp))));
  }

  /**
   * [GET] get vehicle statistics
   */
  getVehicleStatistics(): Observable<vehicle.admin.IVehicleStatisticsProto> {
    return this.http.get(`${VehicleService.ENDPOINT_VEHICLES}/statistics`)
      .pipe(map((resp: ArrayBuffer) => vehicle.admin.VehicleStatisticsProto.decode(new Uint8Array(resp))));
  }

  /**
   * [GET] Get image archive statistics
   */
  getImageArchiveStatistics(): Observable<ota.vehicle.IImageArchiveStatisticsProto> {
    return this.http.get(`${OtaService.ENDPOINT_OTA}/statistics`)
      .pipe(map((resp: ArrayBuffer) => ota.vehicle.ImageArchiveStatisticsProto.decode(new Uint8Array(resp))));
  }
}
