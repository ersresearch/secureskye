import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BreadcrumbSwitchLink } from '../model';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsSwitchService {

  private _switchLinks = new BehaviorSubject<BreadcrumbSwitchLink[]>([]);

  get switchLinks(): Observable<BreadcrumbSwitchLink[]> {
    return this._switchLinks;
  }

  breadcrumbSwitchLinks(...links: BreadcrumbSwitchLink[]) {
    this._switchLinks.next(links);
  }
}
