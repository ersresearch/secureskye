import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GatewayService } from '../gateway.service';
import { GlobalDialogService, BreadcrumbsSwitchService } from '../../../../shared/service';
import { vehicle, BreadcrumbSwitchLink } from '../../../../shared/model';
import { VehicleService } from '../../../../vehicle/vehicle.service';

@Component({
  selector: 'app-vehicle-gateway-detail',
  templateUrl: './vehicle-gateway-detail.component.html',
  styleUrls: ['./vehicle-gateway-detail.component.scss']
})
export class VehicleGatewayDetailComponent implements OnInit {
  /**
   * Gateway Id from parameter
   */
  gatewayId: string;
  /**
   * GatewayInfo data
   */
  gatewayInfo: vehicle.registry.IEcuInfoProto;
  /**
   * Gateway communication protocol
   */
  readonly gatewayCommProtocol = Object.keys(vehicle.registry.EcuInfoProto.CommProtocol);
  /**
   * Connected vehicle
   */
  connectedVehicle: vehicle.admin.IVehicleProto;

  constructor(
    private route: ActivatedRoute,
    private gatewayService: GatewayService,
    private globalDialogService: GlobalDialogService,
    private breadcrumbsSwitchService: BreadcrumbsSwitchService,
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {
    const self = this;

    // Retrieve vehicle model UUID from parameters
    self.route.params.subscribe((params) => {
      self.gatewayId = params.gatewayId;

      self.breadcrumbsSwitchService.breadcrumbSwitchLinks(
        BreadcrumbSwitchLink.create('Edit', false, 'fa fa-pencil', ['edit']),
        BreadcrumbSwitchLink.create('ECU', false, 'fa fa-microchip', ['/settings', 'vehicle', 'gateway', self.gatewayId, 'ecu'])
      );
      // Retrive gateway info
      self.gatewayService.getGatewayById(self.gatewayId).subscribe((g) => {
        self.gatewayInfo = g;
        if (g.interfaceInfo.vehicleId !== undefined) {
          self.vehicleService.getVehicleById(g.interfaceInfo.vehicleId).subscribe((v) => self.connectedVehicle = v);
        }
      });
    });
  }
}
