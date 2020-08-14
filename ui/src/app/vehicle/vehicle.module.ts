import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VehicleDetailComponent } from './detail/vehicle-detail.component';
import { VehicleListComponent } from './list/vehicle-list.component';
import { VehicleMonitoringComponent } from './monitoring/vehicle-monitoring.component';
import { VehicleRouteDetailComponent } from './route/detail/vehicle-route-detail.component';
import { VehicleRouteListComponent } from './route/list/vehicle-route-list.component';
import { VehicleRoutingModule } from './vehicle-routing.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, ProgressbarModule } from 'ngx-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { ChartModule } from 'angular-highcharts';
import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { AgmCoreModule } from '@agm/core';
import { ChartsModule } from 'ng2-charts';
import { Ng2OdometerModule } from 'ng2-odometer';
import { GaugeModule } from 'angular-gauge';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    VehicleRoutingModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    Ng2OdometerModule.forRoot(),
    GaugeModule.forRoot(),
    ProgressbarModule.forRoot(),
    NgSelectModule,
    ChartsModule,
    ChartModule,
    AmChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDhGl9bC46hIJqEgL4TeCOqbYEBMLm12sM'
    })
  ],
  declarations: [
    VehicleListComponent,
    VehicleDetailComponent,
    VehicleMonitoringComponent,
    VehicleRouteListComponent,
    VehicleRouteDetailComponent
  ]
})
export class VehicleModule { }
