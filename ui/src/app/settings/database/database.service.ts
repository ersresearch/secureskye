import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  /**
    * Import endpoint
    */
  static readonly ENDPOINT_IMPORT = '/api/ie/imports';
  /**
   * Export direct endpoint
   */
  static readonly ENDPOINT_EXPORT_DIRECT = '/api/ie/exports/direct';

  constructor(private http: HttpClient) { }

  /**
   * Export all data.
   */
  public exportDirect(exportingFormat = 'json', exportingPassword): Observable<HttpResponse<Blob>> {
    return this.http.get(DatabaseService.ENDPOINT_EXPORT_DIRECT, {
      observe: 'response',
      responseType: 'blob',
      params: {
        format: exportingFormat,
        password: exportingPassword
      }
    });
  }
}
