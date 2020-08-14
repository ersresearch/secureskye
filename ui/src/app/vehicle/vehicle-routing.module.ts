import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleListComponent } from './list/vehicle-list.component';
import { VehicleDetailComponent } from './detail/vehicle-detail.component';
import { VehicleMonitoringComponent } from './monitoring/vehicle-monitoring.component';
import { VehicleRouteListComponent } from './route/list/vehicle-route-list.component';
import { VehicleRouteDetailComponent } from './route/detail/vehicle-route-detail.component';
import { EmptyParentComponent } from '../shared/layout';
import { VehicleService } from './vehicle.service';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: VehicleListComponent,
    data: {
      authorities: ['vehicle:read', 'vehicle-model:read']
    }
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: VehicleDetailComponent,
    data: {
      breadcrumbs: 'Register',
      authorities: ['vehicle:create', 'vehicle-model:read']
    },
  },
  {
    path: ':vehicleId',
    component: EmptyParentComponent,
    data: {
      breadcrumbs: '{{vehicle.name}}'
    },
    resolve: {
      vehicle: VehicleService
    },
    children: [
      {
        path: '',
        component: VehicleDetailComponent,
        data: {
          authorities: ['vehicle:read', 'vehicle:update', 'vehicle:delete', 'vehicle-model:read']
        }
      },
      {
        path: 'monitoring',
        component: VehicleMonitoringComponent,
        data: {
          breadcrumbs: 'Monitoring',
          authorities: ['vehicle:read', 'event:read']
        }
      },
      {
        path: 'route',
        component: EmptyParentComponent,
        data: {
          breadcrumbs: 'GPS History'
        },
        children: [
          {
            path: '',
            component: VehicleRouteListComponent,
            data: {
              authorities: ['route:read', 'route:create', 'route:update']
            }
          },
          {
            path: ':routeId/detail',
            component: VehicleRouteDetailComponent,
            data: {
              breadcrumbs: 'Route',
              authorities: ['route:read', 'route:update', 'route:delete']
            }
          }
        ]
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule { }
