import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ota } from '../shared/model';
import { map } from 'rxjs/operators';
import { FileSaverService } from '../shared/service';

@Injectable({
  providedIn: 'root'
})
export class OtaService {

  /**
   * OTA Endpoint
   */
  static readonly ENDPOINT_OTA = '/api/ota';

  constructor(
    private http: HttpClient,
    private fileSaverService: FileSaverService
  ) { }

  /**
   * [GET] Get image archive metadata by id
   * @param id metadata id
   */
  getImageArchiveMetadata(id: string): Observable<ota.vehicle.IMetadataProto> {
    return this.http.get(`${OtaService.ENDPOINT_OTA}/metadata/${id}`)
      .pipe(map((resp: ArrayBuffer) => ota.vehicle.MetadataProto.decode(new Uint8Array(resp))));
  }

  /**
   * [GET] List updates image archive metadata by family
   * @param family metadata family
   */
  getUpdatesImageArchiveMetadataByFamily(family: string, version: string = ''): Observable<ota.vehicle.IMetadataListProto> {
    return this.http.get(`${OtaService.ENDPOINT_OTA}/metadata`, {
      params: {
        family: family,
        fromVersion: version
      }
    })
      .pipe(map((resp: ArrayBuffer) => ota.vehicle.MetadataListProto.decode(new Uint8Array(resp))));
  }

  /**
   * [GET] Get image archives list
   */
  getImageArchiveMetadataList(): Observable<ota.vehicle.IMetadataListProto> {
    return this.http.get(`${OtaService.ENDPOINT_OTA}/metadata`)
      .pipe(map((resp: ArrayBuffer) => ota.vehicle.MetadataListProto.decode(new Uint8Array(resp))));
  }

  /**
   * [PUT] Publish ota image archive to clients
   * @param id metadata id
   */
  publishImageArchiveMetadata(id: string): Observable<any> {
    return this.http.put(`${OtaService.ENDPOINT_OTA}/${id}/publish`, null);
  }

  /**
   * Download image
   * @param img Image info
   */
  downloadImg(img: ota.vehicle.IImageProto): Observable<string> {
    const self = this;
    return self.http.get(img.url, {
      observe: 'response',
      responseType: 'blob'
    }).pipe(map((resp: HttpResponse<Blob>) => {
      self.fileSaverService.save(resp.body, img.name);
      return img.name;
    }));
  }

  /**
   * [DELETE] Remove image archive.
   * @param id ota ID
   */
  remove(id: string): Observable<any> {
    return this.http.delete(`${OtaService.ENDPOINT_OTA}/${id}`);
  }
}
