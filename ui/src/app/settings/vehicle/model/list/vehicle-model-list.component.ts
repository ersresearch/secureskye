import { Component, OnInit } from '@angular/core';
import { vehicle, BreadcrumbSwitchLink } from '../../../../shared/model';
import { Router } from '@angular/router';
import { ModelService } from '../model.service';
import { BreadcrumbsSwitchService } from '../../../../shared/service';

@Component({
  selector: 'app-vehicle-model-list',
  templateUrl: './vehicle-model-list.component.html',
  styleUrls: ['./vehicle-model-list.component.scss']
})
export class VehicleModelListComponent implements OnInit {
  /**
   * Vehicle model list curret page number for pagination.
   */
  modelListPageNo = 1;
  /**
   * Number of item per page.
   */
  itemsPerPage = 5;
  /**
   * Vehicle model list.
   */
  items: vehicle.admin.IVehicleModelListProto;

  constructor(
    private router: Router,
    private modelService: ModelService,
    private breadcrumbsSwitchService: BreadcrumbsSwitchService
  ) { }

  ngOnInit() {
    this.breadcrumbsSwitchService.breadcrumbSwitchLinks(
      BreadcrumbSwitchLink.create('Vehicle', false, 'fa fa-car', ['/vehicle'])
    );
    this.loadVehicleModelList();
  }

  /**
   * load all registered Vehicle models
   */
  loadVehicleModelList() {
    const self = this;

    // Request list of Vehicle models
    self.modelService.getListVehicleModels().subscribe((models) => {
      self.modelListPageNo = 1;
      self.items = models;
    });
  }
}
