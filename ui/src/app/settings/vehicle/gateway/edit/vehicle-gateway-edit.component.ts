import { Component, OnInit, ViewChild } from '@angular/core';
import { vehicle, BreadcrumbSwitchLink } from '../../../../shared/model';
import { Router, ActivatedRoute } from '@angular/router';
import { GatewayService } from '../gateway.service';
import { GlobalDialogService, BreadcrumbsSwitchService } from '../../../../shared/service';
import { AbstractControl } from '@angular/forms';
import { VehicleService } from '../../../../vehicle/vehicle.service';
import { mergeMap, pluck, map, toArray } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-vehicle-gateway-edit',
  templateUrl: './vehicle-gateway-edit.component.html',
  styleUrls: ['./vehicle-gateway-edit.component.scss']
})
export class VehicleGatewayEditComponent implements OnInit {
  /**
   * Gateway Id from parameter
   */
  gatewayId: string;
  /**
   * GatewayInfo data
   */
  gatewayInfo: vehicle.registry.IEcuInfoProto;
  /**
   * New CodeInfo List
   */
  newCodeInfoList: vehicle.registry.ICodeInfoProto[] = [];
  /**
   * Gateway communication protocol list
   */
  gatewayCommProtocols;
  /**
   * Error code component
   */
  @ViewChild('errorCodeForm') errorCodeForm;
  /**
   * Error code component
   */
  @ViewChild('gatewayDetailForm') gatewayDetailForm;
  /**
   * error code info
   */
  errorCodeInfo: vehicle.registry.ErrorCodeInfoProto;
  /**
   * Vehicle list options
   */
  vehicleList: { value: string, label: string }[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gatewayService: GatewayService,
    private globalDialogService: GlobalDialogService,
    private breadcrumbsSwitchService: BreadcrumbsSwitchService,
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {
    const self = this;
    self.gatewayCommProtocols = Object.keys(vehicle.registry.EcuInfoProto.CommProtocol).map((key) => ({
      value: vehicle.registry.EcuInfoProto.CommProtocol[key],
      label: key
    }));

    self.vehicleService.getListVehicles().pipe(
      pluck('data'),
      mergeMap((protoList: vehicle.admin.IVehicleProto[]) => from(protoList)),
      map(proto => ({ value: proto.id, label: proto.name })),
      toArray()
    ).subscribe(optionList => self.vehicleList = optionList);

    // Retrieve vehicle model UUID from parameters
    self.route.params.subscribe((params) => {
      self.gatewayId = params.gatewayId;

      self.breadcrumbsSwitchService.breadcrumbSwitchLinks(
        BreadcrumbSwitchLink.create('ECU', false, 'fa fa-microchip', ['/settings', 'vehicle', 'gateway', self.gatewayId, 'ecu'])
      );
      if (self.gatewayId) {
        // Retrive gateway info
        self.gatewayService.getGatewayById(self.gatewayId).subscribe((g) => {
          self.gatewayInfo = g;
        }, (err) => {
          return self.router.navigate(['..'], { relativeTo: self.route.parent, replaceUrl: true });
        });
      } else {
        // Create new vehicle model
        self.gatewayInfo = vehicle.registry.EcuInfoProto.create({
          interfaceInfo: vehicle.registry.EcuInfoProto.InterfaceInfo.create(),
          gatewayInterfaceInfo: vehicle.registry.EcuInfoProto.GatewayInterfaceInfo.create(),
          errorCode: vehicle.registry.ErrorCodeInfoProto.create()
        });
      }
    });
  }

  /**
   * Update vehicle model
   */
  updateGateway() {
    const self = this;

    self.errorCodeForm.submit();

    if (!self.errorCodeForm.isValid() || self.gatewayDetailForm.invalid) {
      self.markAsTouchDeep(self.gatewayDetailForm.control);
      return;
    }

    let updatedGateway: vehicle.registry.EcuInfoProto = self.deepCopy(self.gatewayInfo);
    updatedGateway = vehicle.registry.EcuInfoProto.create(updatedGateway);
    updatedGateway.errorCode.errorCodes = updatedGateway.errorCode.errorCodes.concat(self.newCodeInfoList);

    // Update gateway
    self.gatewayService.updateGatewayInfo(self.gatewayId, updatedGateway).subscribe(() => {
      // TODO notify updating result.
      return self.router.navigate(['..'], { relativeTo: self.route, replaceUrl: true });
    }, (err) => {
      self.globalDialogService.error(err, 'Update failed');
    });
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
   * Remove gateway on edit mode
   */
  removeGateway() {
    const self = this;

    self.gatewayService.deleteGatewayInfo(self.gatewayId).subscribe((evt) => {
      return self.router.navigate(['..'], { relativeTo: self.route.parent, replaceUrl: true });
    }, (err) => {
      self.globalDialogService.error(err, 'Action failed');
    });
  }

  /**
   * Create new gateway
   */
  registerGateway() {
    const self = this;

    // validate error code form
    self.errorCodeForm.submit();

    // check valid
    if (!self.errorCodeForm.isValid() || self.gatewayDetailForm.invalid) {
      self.markAsTouchDeep(self.gatewayDetailForm.control);
      return;
    }

    self.gatewayInfo.errorCode.errorCodes = self.gatewayInfo.errorCode.errorCodes.concat(self.newCodeInfoList);

    // call service
    self.gatewayService.registerGateway(self.gatewayInfo).subscribe((gw) => {
      return self.router.navigate(['..', gw.id], { relativeTo: self.route, replaceUrl: true });
    }, (err) => {
      self.globalDialogService.error(err, 'Action failed');
    });
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
    self.globalDialogService.delete(`gateway ${self.gatewayId}`)
      .subscribe((agreed) => {
        if (agreed) {
          // Agreed to remove
          self.removeGateway();
        }
      });
  }
}
