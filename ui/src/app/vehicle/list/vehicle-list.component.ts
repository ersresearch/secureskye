import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { vehicle } from '../../shared/model/protoBundle';
import { GlobalDialogService, BreadcrumbsSwitchService } from '../../shared/service';
import { VehicleService } from '../vehicle.service';
import { BreadcrumbSwitchLink } from '../../shared/model';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {

  /**
   * Vehicle list current page number for pagination.
   */
  vehicleListPageNo = 1;
  /**
   * Number of items per page.
   */
  itemsPerPage = 5;
  /**
   * Vechile list.
   */
  items: vehicle.admin.IVehicleListProto;

  constructor(
    private router: Router,
    private vehicleService: VehicleService,
    private globalDialogService: GlobalDialogService,
    private breadcrumbsSwitchService: BreadcrumbsSwitchService
  ) { }

  ngOnInit() {
    this.breadcrumbsSwitchService.breadcrumbSwitchLinks(
      BreadcrumbSwitchLink.create('Vehicle Model', false, 'fa fa-cubes', ['/settings', 'vehicle', 'model'])
    );
    this.loadListVehicles();
  }

  loadListVehicles() {
    const self = this;

    // Request list of vehicles
    self.items = null;
    self.vehicleService.getListVehicles().subscribe((vehicles) => {
      self.vehicleListPageNo = 1;
      self.items = vehicles;
    });
  }
}
