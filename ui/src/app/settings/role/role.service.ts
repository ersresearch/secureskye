import { Injectable } from '@angular/core';
import { user, UpdateCredential, notification, totp } from '../../shared/model';
import { map } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user/user.service';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService implements Resolve<user.admin.IRoleProto> {

  /**
   * Endpoint to get authorities of user
   */
  static readonly ENDPOINT_rolesApi = UserService.ENDPOINT_USER + '/roles';
  /**
   * Endpoint to get authorities of user
   */
  static readonly ENDPOINT_authorityApi = UserService.ENDPOINT_USER + '/authorities';

  constructor(private http: HttpClient) { }

  /**
   * [GET] Get all authorities.
   */
  getAllRoles(): Observable<user.admin.IRoleSetProto> {
    return this.http.get(RoleService.ENDPOINT_rolesApi)
      .pipe(map((resp: ArrayBuffer) => user.admin.RoleSetProto.decode(new Uint8Array(resp))));
  }

  /**
   * [GET] Get role info by ID
   * @param roleId ID of role
   */
  getRole(roleId: String): Observable<user.admin.IRoleProto> {
    return this.http.get(`${RoleService.ENDPOINT_rolesApi}/${roleId}`)
      .pipe(map((resp: ArrayBuffer) => user.admin.RoleProto.decode(new Uint8Array(resp))));
  }

  /**
   * [POST] Add new role
   * @param role role info
   */
  addRole(role: user.admin.IRoleProto): Observable<user.admin.IRoleProto> {
    return this.http.post(RoleService.ENDPOINT_rolesApi, role)
      .pipe(map((resp: ArrayBuffer) => user.admin.RoleProto.decode(new Uint8Array(resp))));
  }

  /**
   * [PATCH] Update role
   * @param roleId role ID
   * @param role role info
   */
  updateRole(roleId: string, role: user.admin.IRoleProto): Observable<user.admin.IRoleProto> {
    return this.http.patch(`${RoleService.ENDPOINT_rolesApi}/${roleId}`, role)
      .pipe(map((resp: ArrayBuffer) => user.admin.RoleProto.decode(new Uint8Array(resp))));
  }

  /**
   * [PATCH] Delete role
   * @param roleId role ID
   */
  deleteRole(roleId: string): Observable<any> {
    return this.http.delete(`${RoleService.ENDPOINT_rolesApi}/${roleId}`);
  }

  /**
   * Colorize authority by name.
   * @param authority authority
   */
  colorAuthority(authority: user.admin.IAuthorityProto) {
    if (authority.authority.endsWith(':read')) {
      return 'primary';
    } else if (authority.authority.endsWith(':create')) {
      return 'success';
    } else if (authority.authority.endsWith(':update')) {
      return 'warning';
    } else if (authority.authority.endsWith(':delete')) {
      return 'danger';
    } else {
      return 'secondary';
    }
  }

  /**
   * [GET] List all existing user models.
   */
  getListUserAuthorities(): Observable<user.admin.IAuthorityListProto> {
    return this.http.get(RoleService.ENDPOINT_authorityApi)
      .pipe(map((resp: ArrayBuffer) => user.admin.AuthorityListProto.decode(new Uint8Array(resp))));
  }

  /**
   * Breadcrumb resolver
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<user.admin.IRoleProto> {
    if (route.params['roleId']) {
      return this.getRole(route.params['roleId']);
    } else {
      return of(user.admin.CredentialProto.create());
    }
  }
}
