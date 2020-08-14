import { Component, OnInit } from '@angular/core';
import { vehicle } from '../../../../shared/model';
import { Router } from '@angular/router';
import { GatewayService } from '../gateway.service';

@Component({
  selector: 'app-vehicle-gateway-list',
  templateUrl: './vehicle-gateway-list.component.html',
  styleUrls: ['./vehicle-gateway-list.component.scss']
})
export class VehicleGatewayListComponent implements OnInit {

  /**
   * Gateway list curret page number for pagination
   */
  gatewayListPageNo = 1;
  /**
   * Number of items per page.
   */
  itemsPerPage = 5;
  /**
   * Gateway list
   */
  items: vehicle.registry.IEcuInfoListProto;
  /**
   * Gateway communication protocol
   */
  readonly gatewayCommProtocol = Object.keys(vehicle.registry.EcuInfoProto.CommProtocol);

  constructor(
    private router: Router,
    private gatewayService: GatewayService) { }

  ngOnInit() {
    this.loadGatewayList();
  }

  /**
   * load gateway list
   */
  loadGatewayList() {
    const self = this;

    // Request list of gateways
    self.items = null;
    this.gatewayService.getGatewayList().subscribe((gateways) => {
      self.gatewayListPageNo = 1;
      self.items = gateways;
    });
  }
}
