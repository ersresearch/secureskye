import { Component, OnInit } from '@angular/core';
import { vehicle } from '../../../../../shared/model';
import { Router, ActivatedRoute } from '@angular/router';
import { GatewayService } from '../../gateway.service';
import { GlobalDialogService } from '../../../../../shared/service';

@Component({
  selector: 'app-vehicle-ecu-list',
  templateUrl: './vehicle-ecu-list.component.html',
  styleUrls: ['./vehicle-ecu-list.component.scss']
})
export class VehicleEcuListComponent implements OnInit {

  /**
   * Gateway Id from parameter.
   */
  gatewayId: string;
  /**
   * Gateway list curret page number for pagination.
   */
  ecuListPageNo = 1;
  /**
   * Number of items per page.
   */
  itemsPerPage = 5;
  /**
   * Gateway list.
   */
  items: vehicle.registry.IEcuInfoProto[];
  /**
   * GatewayInfo data.
   */
  gatewayInfo: vehicle.registry.IEcuInfoProto;
  /**
   * Ecu communication protocol.
   */
  readonly ecuCommProtocol = Object.keys(vehicle.registry.EcuInfoProto.CommProtocol);
  /**
   * readonly view.
   */
  readonly = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gatewayService: GatewayService,
    private globalDialogService: GlobalDialogService
  ) { }

  ngOnInit() {
    const self = this;

    // Retrieve view mode
    self.readonly = self.route.snapshot.data.readonly;

    self.loadEcuList();
  }

  /**
   * Load ECU list
   */
  loadEcuList() {
    const self = this;

    // Request list of gateways
    self.items = null;
    // check params
    self.route.params.subscribe((params) => {
      self.gatewayId = params.gatewayId;
      self.ecuListPageNo = 1;

      if (self.gatewayId) {
        // load all ecu of gateway by gatewayId
        // Retrive gateway info
        self.gatewayService.getGatewayById(self.gatewayId).subscribe((g) => {
          self.gatewayInfo = g;
          self.items = g ? g.children : vehicle.registry.EcuInfoListProto.create().ecuInfo;
        }, (err) => {
          self.globalDialogService.error('Action failed', err);
        });
      } else {
        // cannot load ecu list without gatewayId
        self.globalDialogService.error('Action failed', 'Gateway ID is undefined');
      }
    });
  }
}
