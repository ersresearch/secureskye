import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Params } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParamsResolverService implements Resolve<Params> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Params> {
    return of(route.params);
  }
}
