import { Component, OnInit } from '@angular/core';
import { user } from '../../../shared/model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalDialogService } from '../../../shared/service';
import { combineLatest, from } from 'rxjs';
import { RoleService } from '../role.service';
import { mergeMap, map, groupBy, toArray, reduce, skip, pairwise, filter, tap, distinct, pluck } from 'rxjs/operators';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss']
})
export class RoleDetailComponent implements OnInit {

  /**
   * Role ID.
   */
  roleId: string;
  /**
   * Role info model.
   */
  role: user.admin.IRoleProto;
  /**
   * Role form.
   */
  roleForm: FormGroup;
  /**
   * Authority list.
   */
  authoritiesList: user.admin.IAuthorityProto[];
  /**
   * AUthority map.
   */
  authoritiesMap: {
    [param: string]: user.admin.IAuthorityProto
  } = {};
  /**
   * Distinct module set.
   */
  moduleList = [];
  /**
   * Distinct scope set.
   */
  scopeList = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public roleService: RoleService,
    private fb: FormBuilder,
    private globalDialogService: GlobalDialogService
  ) { }

  ngOnInit() {
    const self = this;

    combineLatest(
      self.roleService.getListUserAuthorities(),
      self.route.params
    ).subscribe(([authList, params]) => {
      // Available authorities list
      self.authoritiesList = authList.data;
      const auths = from(authList.data).pipe(
        tap(auth => {
          self.authoritiesMap[auth.authority] = auth;
        }),
        map(auth => {
          const obj = { module: undefined, scope: undefined, moduleDescription: auth.description };
          from(auth.authority.split(':')).pipe(pairwise()).subscribe(([module, scope]) => {
            obj.module = module;
            obj.scope = scope;
          });
          return obj;
        })
      );
      auths.pipe(
        filter(auth => auth.module !== undefined &&
          auth.moduleDescription !== undefined && auth.moduleDescription !== null && auth.moduleDescription !== ''),
        distinct(auth => auth.module),
        map((auth) => ({ name: auth.module, description: auth.moduleDescription })),
        toArray(),
      ).subscribe(modules => self.moduleList = modules.sort((a, b) => a.name.localeCompare(b.name)));
      auths.pipe(
        filter(auth => auth.scope !== undefined),
        distinct(auth => auth.scope),
        pluck('scope'),
        toArray()
      ).subscribe((scopes: string[]) => self.scopeList = scopes.sort((a, b) => {
        const aLevel = self.scopeLevel(a);
        const bLevel = self.scopeLevel(b);
        if (aLevel > bLevel) {
          return 1;
        } else if (aLevel < bLevel) {
          return -1;
        } else {
          return 0;
        }
      }));

      // Role ID
      self.roleId = params.roleId;

      if (self.roleId) {
        // view / edit / delete
        self.roleService.getRole(self.roleId).subscribe((roleProto) => {
          self.role = roleProto;
          const form = self.fb.group({
            name: [self.role.name, [Validators.required]],
            authorities: [self.role.authorities.map(a => a.id)]
          });
          Object.keys(self.authoritiesMap).forEach((auth) => {
            const authId = self.authoritiesMap[auth].id;
            form.addControl(auth, self.fb.control(self.role.authorities.findIndex((roleAuth) => roleAuth.id === authId) >= 0));
          });
          self.roleForm = form;
        });
      } else {
        // add
        const form = self.fb.group({
          name: ['', [Validators.required]],
          authorities: [[]]
        });
        Object.keys(self.authoritiesMap).forEach((auth) => {
          form.addControl(auth, self.fb.control(false));
        });
        self.roleForm = form;
      }
    });
  }

  /**
   * Form field validation classes.
   * @param field field name.
   */
  fieldValidationClass(field: string) {
    return {
      'is-invalid': this.roleForm.get(field).invalid &&
        (this.roleForm.get(field).dirty || this.roleForm.get(field).touched),
      'is-valid': this.roleForm.get(field).valid && this.roleForm.get(field).dirty
    };
  }

  /**
   * Form field validation error check.
   * @param field fild name.
   * @param error error type.
   */
  fieldValidationError(field: string, error: string) {
    return this.roleForm.get(field).errors && this.roleForm.get(field).errors[error];
  }

  /**
   * Add new role
   */
  addRole() {
    const self = this;

    if (self.roleForm.invalid) {
      Object.keys(self.roleForm.controls).forEach(field => self.roleForm.get(field).markAsTouched({ onlySelf: true }));
      return;
    }

    // update
    self.getFormValue().pipe(
      mergeMap((roleProto) => self.roleService.addRole(roleProto))
    ).subscribe(() => {
      self.returnRoleList();
    }, (err) => {
      self.globalDialogService.error(err);
    });
  }

  /**
   * Update role
   */
  updateRole() {
    const self = this;

    if (self.roleForm.invalid) {
      Object.keys(self.roleForm.controls).forEach(field => self.roleForm.get(field).markAsTouched({ onlySelf: true }));
      return;
    }

    // update
    self.getFormValue().pipe(
      mergeMap((roleProto) => self.roleService.updateRole(self.roleId, roleProto))
    ).subscribe(() => {
      self.returnRoleList();
    }, (err) => {
      self.globalDialogService.error(err);
    });
  }

  /**
   * Delete role
   */
  deleteRole() {
    const self = this;

    // Ask for confirmation.
    self.globalDialogService.delete(`role ${self.role.name}`).subscribe((agreed) => {
      if (agreed) {
        // Agreed to remove
        self.roleService.deleteRole(self.roleId).subscribe(() => {
          self.returnRoleList();
        }, (err) => {
          self.globalDialogService.error(err);
        });
      }
    });
  }

  /**
   * Collect form values into proto
   */
  private getFormValue() {
    return from(Object.keys(this.roleForm.controls)).pipe(
      filter((controlName) => /^.+:.+$/.test(controlName)),
      filter((controlName) => this.roleForm.get(controlName).value),
      map((auth) => this.authoritiesMap[auth]),
      toArray(),
      map((authorities) => user.admin.RoleProto.create({
        name: this.roleForm.get('name').value,
        authorities: authorities
      }))
    );
  }

  /**
   * Navigate back to vehicle model list
   */
  private returnRoleList(): Promise<boolean> {
    return this.router.navigate(['..'], { relativeTo: this.route, replaceUrl: true });
  }

  /**
   * Scope level for sorting.
   * @param scope scope
   */
  private scopeLevel(scope: string) {
    switch (scope) {
      case 'read':
        return 1;
      case 'create':
        return 2;
      case 'update':
        return 3;
      case 'delete':
        return 4;
      default:
        return 5;
    }
  }
}
