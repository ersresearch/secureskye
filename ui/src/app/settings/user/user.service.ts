import { Injectable } from '@angular/core';
import { Observer, Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { user, UpdateCredential, notification, totp } from '../../shared/model';
import { map, skip } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService implements Resolve<user.admin.ICredentialProto> {
  /**
   * Endpoint to get user info
   */
  static readonly ENDPOINT_USER = '/api/users';
  /**
   * Endpoint to get list of subscription topics
   */
  static readonly ENDPOINT_SUBSCRIPTION_TOPIC = '/api/notifications/subscriptions/topics';
  /**
   * Endpoint to subscribe list of subscriptions
   */
  static readonly ENDPOINT_SUBSCRIPTION = '/api/notifications/subscriptions';
  /**
   * Endpoint to enable 2fa
   */
  static readonly ENDPOINT_2_FACTOR_AUTHENTICATION = '/uaa/oauth/2fa';

  /**
   * Observer to emit user info changes
   */
  private _onUpdateSessionUser = new BehaviorSubject<void>(undefined);

  /**
   * Observable for user info changes
   */
  get onUpdateSessionUser(): Observable<void> {
    return this._onUpdateSessionUser.pipe(skip(1));
  }

  constructor(
    private http: HttpClient
  ) { }

  /**
   * [GET] List all currently registered users.
   */
  getListUsers(): Observable<user.admin.ICredentialListProto> {
    return this.http.get(UserService.ENDPOINT_USER)
      .pipe(map((resp: ArrayBuffer) => user.admin.CredentialListProto.decode(new Uint8Array(resp))));
  }

  /**
   * [PATCH] Update an existing user.
   * @param userId User ID.
   * @param updateInfo User info need to be updated.
   */
  updateUser(userId: string, updateInfo: UpdateCredential): Observable<user.admin.ICredentialProto> {
    return this.http.patch(`${UserService.ENDPOINT_USER}/${userId}`, updateInfo)
      .pipe(map((resp: ArrayBuffer) => user.admin.CredentialProto.decode(new Uint8Array(resp))));
  }

  /**
   * [DELETE] Delete an existing user.
   * @param userId User ID.
   */
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${UserService.ENDPOINT_USER}/${userId}`);
  }

  /**
   * [POST] Create a new user.
   * @param newUser New user info.
   */
  registerUser(newUser: user.admin.CredentialProto): Observable<user.admin.ICredentialProto> {
    return this.http.post(UserService.ENDPOINT_USER, newUser)
      .pipe(map((resp: ArrayBuffer) => user.admin.CredentialProto.decode(new Uint8Array(resp))));
  }

  /**
   * [GET] Get user info by ID.
   * @param userId User ID.
   */
  getUserById(userId: string): Observable<user.admin.ICredentialProto> {
    return this.http.get(`${UserService.ENDPOINT_USER}/${userId}`)
      .pipe(map((resp: ArrayBuffer) => user.admin.CredentialProto.decode(new Uint8Array(resp))));
  }

  /**
   * [GET] Get user info by username.
   * @param username username.
   */
  getUserByName(username: string): Observable<user.admin.ICredentialListProto> {
    return this.http.get(UserService.ENDPOINT_USER, {
      params: {
        name: username
      }
    }).pipe(map((resp: ArrayBuffer) => user.admin.CredentialListProto.decode(new Uint8Array(resp))));
  }

  /**
   * [GET] Get user avatar by id
   * @param userId User ID.
   */
  getUserAvatar(userId: string): Observable<any> {
    return this.http.get(`${UserService.ENDPOINT_USER}/${userId}/avatar`);
  }

  /**
   * Notify current user info changes
   */
  updateSessionUser() {
    this._onUpdateSessionUser.next(undefined);
  }

  /**
   * [GET] Get subcription topic list
   */
  getSubcriptionTopics(): Observable<notification.ITopicListProto> {
    return this.http.get(UserService.ENDPOINT_SUBSCRIPTION_TOPIC)
      .pipe(map((resp: ArrayBuffer) => notification.TopicListProto.decode(new Uint8Array(resp))));
  }

  /**
   * [GET] Get user's email subcriptions list
   */
  getSubscriptions(channel: string): Observable<notification.ISubscriptionListProto> {
    return this.http.get(`${UserService.ENDPOINT_SUBSCRIPTION}/${channel}`)
      .pipe(map((resp: ArrayBuffer) => notification.SubscriptionListProto.decode(new Uint8Array(resp))));
  }

  /**
   * [POST] Subscribe user to list of topics via a specific channel
   * @param channel channel Type
   * @param topicIds topic IDs
   */
  subscribeTopic(channel: string, topicIds: string[]): Observable<notification.SubscriptionListProto | any[]> {
    if (topicIds.length <= 0) {
      return of([]);
    }
    const topics = notification.TopicListProto.create({
      topics: topicIds.map(id => notification.TopicProto.create({ id: id }))
    });
    return this.http.post(`${UserService.ENDPOINT_SUBSCRIPTION}/${channel}`, null, {
      params: {
        topics: topicIds
      }
    }).pipe(map((resp: ArrayBuffer) => notification.SubscriptionListProto.decode(new Uint8Array(resp))));
  }

  /**
   * [DELETE] Unsubscribe user to list of topics via a specific channel
   * @param channel channel Type
   * @param topicIds topic IDs
   */
  unsubscribeTopic(channel: string, topicIds: string[]): Observable<any> {
    if (topicIds.length <= 0) {
      return of(undefined);
    }
    const topics = notification.TopicListProto.create({
      topics: topicIds.map(id => notification.TopicProto.create({ id: id }))
    });
    return this.http.delete(`${UserService.ENDPOINT_SUBSCRIPTION}/${channel}`, {
      params: {
        topics: topicIds
      }
    });
  }

  /**
   * [POST] Register for 2fa
   */
  register2FactorAuthentication(): Observable<totp.IOauthTotpProto> {
    return this.http.post(UserService.ENDPOINT_2_FACTOR_AUTHENTICATION, null)
      .pipe(map((resp: ArrayBuffer) => totp.OauthTotpProto.decode(new Uint8Array(resp))));
  }

  /**
   * [GET] Get 2fa info
   */
  request2FactorAuthenticationStatus(): Observable<totp.IOauthTotpProto> {
    return this.http.get(UserService.ENDPOINT_2_FACTOR_AUTHENTICATION)
      .pipe(map((resp: ArrayBuffer) => totp.OauthTotpProto.decode(new Uint8Array(resp))));
  }

  /**
   * [PUT] Conrifm 2fa
   * @param otp otp for verification
   */
  confirm2FactorAuthentication(otp: string): Observable<any> {
    return this.http.put(UserService.ENDPOINT_2_FACTOR_AUTHENTICATION, null, {
      params: {
        otp: otp
      }
    });
  }

  /**
   * [DELETE] Register for 2fa
   */
  unregister2FactorAuthentication(otp: string): Observable<any> {
    return this.http.delete(UserService.ENDPOINT_2_FACTOR_AUTHENTICATION, {
      params: {
        otp: otp
      }
    });
  }

  /**
   * [DELETE] Reset 2fa using scratch code.
   */
  reset2FactorAuthentication(scratchCode: string): Observable<any> {
    return this.http.delete(UserService.ENDPOINT_2_FACTOR_AUTHENTICATION, {
      params: { scratchCode: scratchCode }
    });
  }

  /**
   * Breadcrumb resolver
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<user.admin.ICredentialProto> {
    if (route.params['userId']) {
      return this.getUserById(route.params['userId']);
    } else {
      return of(user.admin.CredentialProto.create());
    }
  }

  /**
   * Remove OTP access
   */
  removeOtpAccess(): Observable<any> {
    return this.http.delete(`${UserService.ENDPOINT_2_FACTOR_AUTHENTICATION}/access`);
  }
}
