import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthenticationGuard, AuthorizationGuard } from './shared/guard';
import { BreadcrumbsModule } from '@exalif/ngx-breadcrumbs';
import { DefaultLayoutComponent } from './shared/layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
    data: {
      breadcrumbs: 'Login Page'
    }
  },
  {
    path: 'error',
    loadChildren: './error/error.module#ErrorModule'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      breadcrumbs: 'Home'
    },
    canActivate: [AuthenticationGuard],
    canActivateChild: [AuthorizationGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'vehicle',
        data: {
          breadcrumbs: 'Vehicle'
        },
        loadChildren: './vehicle/vehicle.module#VehicleModule'
      },
      {
        path: 'ota',
        data: {
          breadcrumbs: 'OTA'
        },
        loadChildren: './ota/ota.module#OtaModule'
      },
      {
        path: 'ixs',
        data: {
          breadcrumbs: 'IXS'
        },
        loadChildren: './ixs/ixs.module#IxsModule'
      },
      {
        path: 'settings',
        loadChildren: './settings/settings.module#SettingsModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      paramsInheritanceStrategy: 'always'
    }),
    BreadcrumbsModule.forRoot()
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
