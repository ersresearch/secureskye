import { Injectable, Optional, NgZone } from '@angular/core';
import { OAuthService, OAuthStorage, ValidationHandler, AuthConfig, UrlHelperService } from 'angular-oauth2-oidc';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { GlobalDialogService } from '../shared/service';
import { withLatestFrom, mergeMap, map, toArray, filter, first, skip } from 'rxjs/operators';
import { navItems } from '../_nav';
import { UserService } from '../settings/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends OAuthService {

  /**
   * Preserve custom query params
   */
  private savedCustomQueryParams: any;
  /**
   * Block `invalidateSession` while one is on going.
   */
  private invalidating = false;

  private _sessionErrorClosed = new BehaviorSubject<void>(undefined);

  constructor(
    ngZone: NgZone,
    private httpClient: HttpClient,
    private storage: OAuthStorage,
    @Optional() tokenValidationHandler: ValidationHandler,
    @Optional() config: AuthConfig,
    @Optional() urlHelper: UrlHelperService,
    private globalDialogService: GlobalDialogService,
    private router: Router,
  ) { super(ngZone, httpClient, storage, null, config, urlHelper); }

  /**
   * Observable for user info changes
   */
  get sessionErrorClosed(): Observable<void> {
    return this._sessionErrorClosed.pipe(skip(1));
  }

  /**
   * Login with `password` custom grant and 2fa
   * @param userName user name
   * @param password password
   * @param otp one-time password if required
   * @param headers additional headers
   */
  login(userName: string, password: string, otp: string, headers?: HttpHeaders): Promise<any> {
    const self = this;
    // Provide otp parameter
    self.appendCustomQueryParam({ otp: otp });

    // Request OTP access
    if (self.customQueryParams['otp_access']) {
      self.appendCustomQueryParam({
        otp_access_id: self.storage.getItem('otp_access_id')
      });
    }

    // Execute request
    return self.restoreCustomQueryParamAfter(super.fetchTokenUsingPasswordFlow(userName, password, headers).then((accessToken) => {
      // Save OTP access ID
      if (self.customQueryParams['otp_access']) {
        self.storage.setItem('otp_access_id', accessToken['otp_access_id']);
      }
      return super.loadUserProfile();
    }));
  }

  /**
   * Append params to `customQueryParams`
   * @param params additional parameters
   */
  private appendCustomQueryParam(params: any) {
    if (this.savedCustomQueryParams == null) {
      if (this.customQueryParams) {
        this.savedCustomQueryParams = Object.assign({}, this.customQueryParams);
      } else {
        this.customQueryParams = {};
      }
    }
    Object.assign(this.customQueryParams, params);
  }

  /**
   * Revert `customQueryParams` after promise fullfiled.
   * @param promise target promise
   */
  private restoreCustomQueryParamAfter(promise: Promise<any>) {
    const self = this;
    promise.then((accessToken) => {
      self.customQueryParams = self.savedCustomQueryParams;
      self.savedCustomQueryParams = null;
    });
    return promise;
  }

  /**
   * Invalidate user session then return to logout page with error message
   */
  invalidateSession(delay: number = 200) {
    const self = this;

    if (self.invalidating) {
      return;
    }

    self.invalidating = true;
    self.logOut();
    self.router.navigate(['/login'], { queryParams: { returnUrl: self.router.routerState.snapshot.url }, replaceUrl: true }).then(() => {
      self.globalDialogService.error('Session expired. Please log in to continue.', 'Session expired').subscribe(() => {
        self._sessionErrorClosed.pipe(first()).subscribe(() => {
          self.invalidating = false;
        });
        self._sessionErrorClosed.next(undefined);
      });
    });
  }

  /**
   * Remove `otp_access_id` from storage.
   */
  removeOtpAccess() {
    this.storage.removeItem('otp_access_id');
  }

  /**
   * Authorize navigation items (filtering) with user authorities
   */
  authorizeNavItems(userInfo: any): Observable<any[]> {
    return from(navItems).pipe(
      map(navItem => Object.assign(
        {}, navItem, { children: navItem.children ? navItem.children.map(child => ({ ...child })) : undefined }
      )),
      withLatestFrom(
        // flatmap roles.authorities.authority to array
        from(userInfo.roles).pipe(
          mergeMap((role: { authorities?: { authority: string }[] }) => role.authorities || []),
          map((authorities) => authorities.authority),
          toArray())
      ),
      filter(([navItem, userAuthorities]) => {

        // Filter chidlren first
        if (navItem.children) {
          navItem.children = navItem.children.filter((child) => !child.authorities
            || child.authorities.every((childAuthority) => userAuthorities.findIndex((userAuthority) => {
              return userAuthority === childAuthority;
            }) >= 0));
        }

        // Authorities not specified
        if (navItem.authorities === undefined) {
          if (navItem.children === undefined) {
            // Visible if empty children (title, divider, self link)
            return true;
          } else {
            // Visible if any visible children
            return navItem.children.length > 0;
          }
        }

        // Check if authorities requirements meet
        return navItem.authorities.every((authority) => userAuthorities.findIndex((userAuthority) => {
          return userAuthority === authority;
        }) >= 0);
      }),
      map(([navItem, userAuthorities]) => navItem),
      toArray(),
      map((authorizedNavItems) => authorizedNavItems.filter((navItem, index) => {
        if (navItem.title &&
          (index === authorizedNavItems.length - 1 || authorizedNavItems[index + 1].title)) {
          return false;
        }
        return true;
      }))
    );
  }


  /**
   * [DELETE] Reset 2fa using scratch code.
   */
  reset2FactorAuthentication(oauthId: string, scratchCode: string): Observable<any> {
    return this.httpClient.delete(`${UserService.ENDPOINT_USER}/2fa`, {
      headers: { 'No-Auth': 'true' },
      params: { oauthId: oauthId, scratchCode: scratchCode }
    });
  }
}
