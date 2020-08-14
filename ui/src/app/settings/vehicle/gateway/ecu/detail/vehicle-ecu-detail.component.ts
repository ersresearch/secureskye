import { Component, OnInit } from '@angular/core';
import { vehicle, BreadcrumbSwitchLink } from '../../../../../shared/model';
import { Router, ActivatedRoute } from '@angular/router';
import { GatewayService } from '../../gateway.service';
import { GlobalDialogService, BreadcrumbsSwitchService } from '../../../../../shared/service';
import { VehicleService } from '../../../../../vehicle/vehicle.service';

@Component({
  selector: 'app-vehicle-ecu-detail',
  templateUrl: './vehicle-ecu-detail.component.html',
  styleUrls: ['./vehicle-ecu-detail.component.scss']
})
export class VehicleEcuDetailComponent implements OnInit {
  /**
   * Gateway Id from parameter
   */
  ecuId: string;
  /**
   * GatewayInfo data
   */
  ecuInfo: vehicle.registry.IEcuInfoProto;
  /**
   * Ecu communication protocol.
   */
  readonly ecuCommProtocol = Object.keys(vehicle.registry.EcuInfoProto.CommProtocol);
  /**
   * Connected vehicle
   */
  connectedVehicle: vehicle.admin.IVehicleProto;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gatewayService: GatewayService,
    private ecuService: GatewayService,
    private globalDialogService: GlobalDialogService,
    private breadcrumbsSwitchService: BreadcrumbsSwitchService,
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {
    const self = this;

    // Retrieve vehicle model UUID from parameters
    self.route.params.subscribe((params) => {
      self.ecuId = params.ecuId;

      self.breadcrumbsSwitchService.breadcrumbSwitchLinks(
        BreadcrumbSwitchLink.create('Edit', false, 'fa fa-pencil', ['edit']),
      );
      // Retrive gateway info
      self.gatewayService.getEcuInfoById(self.ecuId).subscribe((ecu) => {
        self.ecuInfo = ecu;

        if (ecu.interfaceInfo.vehicleId !== undefined) {
          self.vehicleService.getVehicleById(ecu.interfaceInfo.vehicleId).subscribe(v => self.connectedVehicle = v);
        }
      });
    });
  }
}
