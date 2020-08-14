import { Component, OnInit, ViewChild } from '@angular/core';
import { vehicle } from '../../../../../shared/model';
import { Router, ActivatedRoute } from '@angular/router';
import { GatewayService } from '../../gateway.service';
import { GlobalDialogService } from '../../../../../shared/service';
import { AbstractControl } from '@angular/forms';
import { VehicleService } from '../../../../../vehicle/vehicle.service';

@Component({
  selector: 'app-vehicle-ecu-edit',
  templateUrl: './vehicle-ecu-edit.component.html',
  styleUrls: ['./vehicle-ecu-edit.component.scss']
})
export class VehicleEcuEditComponent implements OnInit {
  /**
   * ECU Id from parameter
   */
  ecuId: string;
  /**
   * ECU info data
   */
  ecuInfo: vehicle.registry.IEcuInfoProto;
  /**
   * New CodeInfo List
   */
  newCodeInfoList = new Array<vehicle.registry.ICodeInfoProto>();
  /**
   * ECU communication protocol list
   */
  ecuCommProtocols;
  /**
   * Confirm modal
   */
  @ViewChild('errorCodeForm') errorCodeForm;
  /**
   * Error code component
   */
  @ViewChild('ecuForm') ecuForm;
  /**
   * error code info
   */
  errorCodeInfo: vehicle.registry.ErrorCodeInfoProto;
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
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {
    const self = this;
    self.ecuCommProtocols = Object.keys(vehicle.registry.EcuInfoProto.CommProtocol).map((key) => ({
      value: vehicle.registry.EcuInfoProto.CommProtocol[key],
      label: key
    }));

    // Retrieve vehicle model UUID from parameters
    self.route.params.subscribe((params) => {
      self.ecuId = params.ecuId;
      const gatewayId = params.gatewayId;

      // Retrive gateway info
      if (self.ecuId) {
        self.gatewayService.getEcuInfoById(self.ecuId).subscribe((ecu) => {
          self.ecuInfo = ecu;

          if (ecu.interfaceInfo.vehicleId !== undefined) {
            self.vehicleService.getVehicleById(ecu.interfaceInfo.vehicleId).subscribe(v => self.connectedVehicle = v);
          }
        });
      } else {
        self.ecuInfo = vehicle.registry.EcuInfoProto.create({
          'parentEcuId': gatewayId
        });
        self.ecuInfo.interfaceInfo = vehicle.registry.EcuInfoProto.InterfaceInfo.create();
        self.ecuInfo.errorCode = vehicle.registry.ErrorCodeInfoProto.create();
        // clone error code for error code component
        self.gatewayService.getGatewayById(gatewayId).subscribe(g => {
          self.ecuInfo.interfaceInfo.vehicleId = g.interfaceInfo.vehicleId;

          if (self.ecuInfo.interfaceInfo.vehicleId !== undefined) {
            self.vehicleService.getVehicleById(self.ecuInfo.interfaceInfo.vehicleId).subscribe(v => self.connectedVehicle = v);
          }
        });
      }
    });
  }

  /**
   * Update vehicle model
   */
  updateEcuInfo(registered: boolean) {
    const self = this;

    if (self.errorCodeForm.invalid) {
      self.markAsTouchDeep(self.errorCodeForm.control);
      return;
    }

    // update error code list
    self.ecuInfo.errorCode.errorCodes = self.ecuInfo.errorCode.errorCodes.concat(self.newCodeInfoList);

    // Update gateway
    if (registered) {
      self.gatewayService.registeEcuInfo(self.ecuInfo).subscribe(() => {
        // TODO notify updating result.
        return self.router.navigate(['..'], { relativeTo: this.route, replaceUrl: true });
      }, (err) => {
        self.globalDialogService.error(err, 'Action failed');
      });
    } else {
      self.gatewayService.updateEcuInfo(self.ecuId, self.ecuInfo).subscribe(() => {
        // TODO notify updating result.
        return self.router.navigate(['..'], { relativeTo: this.route.parent, replaceUrl: true });
      }, (err) => {
        self.globalDialogService.error(err, 'Action failed');
      });
    }
  }

  /**
   * Returns a deep copy of the object
   */
  deepCopy(oldObj: any) {
    let newObj = oldObj;
    if (oldObj && typeof oldObj === 'object') {
      newObj = Object.prototype.toString.call(oldObj) === '[object Array]' ? [] : {};
      // tslint:disable-next-line:forin
      for (const i in oldObj) {
        newObj[i] = this.deepCopy(oldObj[i]);
      }
    }
    return newObj;
  }

  /**
   * Remove ecu on edit mode
   */
  removeEcu() {
    const self = this;

    self.ecuService.deleteEcuInfo(self.ecuId).subscribe((evt) => {
      return self.router.navigate(['..'], { relativeTo: this.route.parent, replaceUrl: true });
    }, (err) => {
      self.globalDialogService.error(err, 'Action failed');
    });
  }

  /**
   * Create new Ecu
   */
  registerEcu() {
    const self = this;

    self.errorCodeForm.submit();

    if (!self.errorCodeForm.isValid() || self.ecuForm.invalid) {
      self.markAsTouchDeep(self.ecuForm.control);
      return;
    }

    // update gateway
    self.updateEcuInfo(true);
  }

  /**
   * Form field validation classes.
   * @param field field name.
   */
  fieldValidationClass(control) {
    return control ? { 'is-invalid': control.invalid && (control.dirty || control.touched), 'is-valid': control.valid && control.dirty }
      : {};
  }

  /**
   * Function which mark all form control to `touched`
   * @param control Form control
   */
  markAsTouchDeep(control: AbstractControl): void {
    const self = this;
    // Mark this control as dirty.
    control.markAsTouched({ onlySelf: true });

    // Recursively mark any children as dirty.
    if (control.hasOwnProperty('controls')) {
      // inner controls
      const inner = control['controls'];
      Object.keys(inner).forEach(field => self.markAsTouchDeep(control.get(field)));
    }
  }

  /**
   * Show confirm dialog
   */
  showConfirmDialog() {
    const self = this;

    // Ask for confirmation.
    self.globalDialogService.delete(`ECU ${self.ecuId}`)
      .subscribe((agreed) => {
        if (agreed) {
          // Agreed to remove
          self.removeEcu();
        }
      });
  }
}
