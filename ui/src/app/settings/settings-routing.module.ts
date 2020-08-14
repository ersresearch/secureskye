import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user/list/user-list.component';
import { UserDetailComponent } from './user/detail/user-detail.component';
import { EmptyParentComponent } from '../shared/layout';
import { UserService } from './user/user.service';
import { TwoFactorAuthenticationComponent } from './user/detail/2fa/two-factor-authentication.component';
import { PasswordChangeComponent } from './user/detail/password/password-change.component';
import { RoleListComponent } from './role/list/role-list.component';
import { RoleDetailComponent } from './role/detail/role-detail.component';
import { RoleService } from './role/role.service';
import { VehicleModelListComponent } from './vehicle/model/list/vehicle-model-list.component';
import { VehicleModelDetailComponent } from './vehicle/model/detail/vehicle-model-detail.component';
import { ModelService } from './vehicle/model/model.service';
import { VehicleGatewayListComponent } from './vehicle/gateway/list/vehicle-gateway-list.component';
import { VehicleGatewayEditComponent } from './vehicle/gateway/edit/vehicle-gateway-edit.component';
import { ParamsResolverService } from '../shared/service';
import { DatabaseExportComponent } from './database/export/database-export.component';
import { DatabaseImportComponent } from './database/import/database-import.component';
import { VehicleGatewayDetailComponent } from './vehicle/gateway/detail/vehicle-gateway-detail.component';
import { VehicleEcuListComponent } from './vehicle/gateway/ecu/list/vehicle-ecu-list.component';
import { VehicleEcuDetailComponent } from './vehicle/gateway/ecu/detail/vehicle-ecu-detail.component';
import { VehicleEcuEditComponent } from './vehicle/gateway/ecu/edit/vehicle-ecu-edit.component';

const routes: Routes = [
  {
    path: 'profile',
    data: {
      breadcrumbs: 'Profile'
    },
    component: EmptyParentComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        data: {
          profileMode: true
        },
        component: UserDetailComponent
      },
      {
        path: '2fa',
        data: {
          breadcrumbs: '2-Factor Authentication'
        },
        component: TwoFactorAuthenticationComponent
      },
      {
        path: 'password',
        data: {
          breadcrumbs: 'Password'
        },
        component: PasswordChangeComponent
      }
    ]
  },
  {
    path: 'user',
    data: {
      breadcrumbs: 'User'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        pathMatch: 'full',
        component: UserListComponent,
        data: {
          authorities: ['user:read']
        }
      },
      {
        path: 'role',
        data: {
          breadcrumbs: 'Role'
        },
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: RoleListComponent,
            data: {
              authorities: ['role:read']
            }
          },
          {
            path: 'add',
            pathMatch: 'full',
            data: {
              breadcrumbs: 'Add',
              authorities: ['role:create']
            },
            component: RoleDetailComponent
          },
          {
            path: ':roleId',
            component: RoleDetailComponent,
            data: {
              breadcrumbs: '{{role.name}}',
              authorities: ['role:read', 'role:update', 'role:delete']
            },
            resolve: {
              role: RoleService
            }
          }
        ]
      },
      {
        path: 'register',
        data: {
          breadcrumbs: 'Register',
          authorities: ['user:create', 'role:read']
        },
        component: UserDetailComponent
      },
      {
        path: ':userId',
        component: UserDetailComponent,
        data: {
          breadcrumbs: '{{user.displayName}}',
          authorities: ['user:read', 'user:update', 'user:delete', 'role:read']
        },
        resolve: {
          user: UserService
        }
      }
    ]
  },
  {
    path: 'vehicle',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/vehicle'
      },
      {
        path: 'model',
        data: {
          breadcrumbs: 'Vehicle Model'
        },
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: VehicleModelListComponent,
            data: {
              authorities: ['vehicle-model:read']
            }
          },
          {
            path: 'add',
            pathMatch: 'full',
            data: {
              breadcrumbs: 'Add',
              authorities: ['vehicle-model:create']
            },
            component: VehicleModelDetailComponent
          },
          {
            path: ':modelId',
            component: VehicleModelDetailComponent,
            data: {
              breadcrumbs: '{{model.name}}',
              authorities: [
                'vehicle-model:read', 'vehicle-model:update', 'vehicle-model:delete',
                '2fa:create', '2fa:read', '2fa:update', '2fa:delete'
              ]
            },
            resolve: {
              model: ModelService
            }
          }
        ]
      },
      {
        path: 'gateway',
        data: {
          breadcrumbs: 'Vehicle Gateway'
        },
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: VehicleGatewayListComponent,
            data: {
              authorities: ['vehicle-registry:read']
            }
          },
          {
            path: 'register',
            pathMatch: 'full',
            data: {
              breadcrumbs: 'Register',
              authorities: ['vehicle-registry:create']
            },
            component: VehicleGatewayEditComponent
          },
          {
            path: ':gatewayId',
            component: EmptyParentComponent,
            data: {
              breadcrumbs: '{{params.gatewayId}}'
            },
            resolve: {
              params: ParamsResolverService
            },
            children: [
              {
                path: '',
                pathMatch: 'full',
                component: VehicleGatewayDetailComponent,
                data: {
                  authorities: ['vehicle-registry:read']
                }
              },
              {
                path: 'edit',
                pathMatch: 'full',
                data: {
                  breadcrumbs: 'Edit',
                  authorities: ['vehicle-registry:read', 'vehicle-registry:update', 'vehicle-registry:delete']
                },
                component: VehicleGatewayEditComponent
              },
              {
                path: 'ecu',
                data: {
                  breadcrumbs: 'ECU'
                },
                component: EmptyParentComponent,
                children: [
                  {
                    path: '',
                    pathMatch: 'full',
                    component: VehicleEcuListComponent,
                    data: {
                      authorities: ['vehicle-registry:read']
                    }
                  },
                  {
                    path: 'register',
                    pathMatch: 'full',
                    data: {
                      breadcrumbs: 'Register',
                      authorities: ['vehicle-registry:create']
                    },
                    component: VehicleEcuEditComponent
                  },
                  {
                    path: ':ecuId',
                    data: {
                      breadcrumbs: '{{params.ecuId}}'
                    },
                    resolve: {
                      params: ParamsResolverService
                    },
                    children: [
                      {
                        path: '',
                        pathMatch: 'full',
                        component: VehicleEcuDetailComponent,
                        data: {
                          authorities: ['vehicle-registry:read']
                        }
                      },
                      {
                        path: 'edit',
                        pathMatch: 'full',
                        data: {
                          breadcrumbs: 'Edit',
                          authorities: ['vehicle-registry:read', 'vehicle-registry:update', 'vehicle-registry:delete']
                        },
                        component: VehicleEcuEditComponent
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: 'database',
    children: [
      {
        path: 'import',
        pathMatch: 'full',
        data: {
          breadcrumbs: 'Database Import',
          authorities: ['ie:create']
        },
        component: DatabaseImportComponent
      },
      {
        path: 'export',
        pathMatch: 'full',
        data: {
          breadcrumbs: 'Database Export',
          authorities: ['ie:read']
        },
        component: DatabaseExportComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
