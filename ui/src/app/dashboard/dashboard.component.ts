import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  /**
   * Member count
   */
  userCount: number;

  /**
   * Vehicle model count
   */
  vehicleModelCount: number;

  /**
   * Vehicle count
   */
  vehicleCount: number;

  /**
   * OTA package count
   */
  imageArchiveCount: number;

  /**
   * Empty dashboard.
   */
  empty: boolean;

  constructor(
    public router: Router,
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    const self = this;

    self.empty = true;

    // Get user statistic data
    self.dashboardService.getUserStastistics().subscribe((u) => {
      self.userCount = u.memberCount ? u.memberCount.toNumber() : 0;
      self.empty = false;
    });

    // Get vehicle statistic data
    self.dashboardService.getVehicleStatistics().subscribe((v) => {
      self.vehicleModelCount = v.modelCount ? v.modelCount.toNumber() : 0;
      self.vehicleCount = v.vehicleCount ? v.vehicleCount.toNumber() : 0;
      self.empty = false;
    });

    // Get image archive statistics data
    self.dashboardService.getImageArchiveStatistics().subscribe((i) => {
      self.imageArchiveCount = i.imageArchiveCount ? i.imageArchiveCount.toNumber() : 0;
      self.empty = false;
    });
  }
}
