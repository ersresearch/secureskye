import { Component, OnInit, ViewChild } from '@angular/core';
import { vehicle, totp, BreadcrumbSwitchLink } from '../../shared/model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VehicleService } from '../vehicle.service';
import { GlobalDialogService, BreadcrumbsSwitchService } from '../../shared/service';
import { OtpDialogComponent } from '../../shared/component';
import { ModelService } from '../../settings/vehicle/model/model.service';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit {

  /**
   * Vehicle ID from parameter
   */
  vehicleId: string;
  /**
   * Vehicle data
   */
  vehicle: vehicle.admin.IVehicleProto;
  /**
   * Vehicle form
   */
  vehicleForm: FormGroup;
  /**
   * List of available models
   */
  vehicleModelList: vehicle.admin.IVehicleModelListProto;
  /**
   * Modal for OTP input
   */
  @ViewChild('otpDialog')
  otpDialog: OtpDialogComponent;
  /**
   * 2FA in process (for button states)
   */
  tfaProcessing = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private fb: FormBuilder,
    private globalDialogService: GlobalDialogService,
    private breadcrumbsSwitchService: BreadcrumbsSwitchService,
    private modelService: ModelService
  ) { }

  ngOnInit() {
    const self = this;

    // Retrieve vehicle UUID from parameters
    self.route.params.subscribe((params) => {
      self.vehicleId = params.vehicleId;

      if (self.vehicleId) {
        self.vehicleService.getVehicleById(self.vehicleId).subscribe((v) => {
          self.vehicle = v;
          self.vehicleForm = self.fb.group({
            vehicleName: [self.vehicle.name, [Validators.required]],
          });
        });

        // breadcrumbs switch links
        self.breadcrumbsSwitchService.breadcrumbSwitchLinks(
          BreadcrumbSwitchLink.create('Monitoring', false, 'fa fa-tachometer', ['/vehicle', self.vehicleId, 'monitoring']),
          BreadcrumbSwitchLink.create('GPS History', false, 'fa fa-location-arrow', ['/vehicle', self.vehicleId, 'route'])
        );
      } else {
        // Register
        self.vehicle = null;
        self.vehicleForm = self.fb.group({
          vehicleName: [null, [Validators.required]],
          vehicleModel: [null, [Validators.required]]
        });
        // Load model list
        self.modelService.getListVehicleModels().subscribe((modelList) => {
          self.vehicleModelList = modelList;
        });
      }
    });
  }

  /**
   * Save vehicle name on edit mode
   */
  saveVehicleName() {
    const self = this;

    if (self.vehicleForm.dirty) {
      if (self.vehicleForm.invalid) {
        Object.keys(self.vehicleForm.controls).forEach(field => self.vehicleForm.get(field).markAsTouched({ onlySelf: true }));
        return;
      }

      const vehicleName = self.vehicleForm.get('vehicleName').value;
      self.vehicleService.renameVehicle(self.vehicle.id, vehicleName).subscribe(() => self.returnVehicleList(), (err) => {
        self.globalDialogService.error(err);
      });
    } else {
      return self.returnVehicleList();
    }
  }

  /**
   * Remove vehicle on edit mode
   */
  removeVehicle() {
    const self = this;

    self.vehicleService.deleteVehicle(self.vehicle.id).subscribe((evt) => self.returnVehicleList(), (err) => {
      self.globalDialogService.error(err);
    });
  }

  /**
   * Register new vehicle
   */
  registerVehicle() {
    const self = this;

    if (self.vehicleForm.invalid) {
      Object.keys(self.vehicleForm.controls).forEach(field => self.vehicleForm.get(field).markAsTouched({ onlySelf: true }));
      return;
    }

    const vehicleModelId = self.vehicleForm.get('vehicleModel').value;
    const vehicleName = self.vehicleForm.get('vehicleName').value;
    self.vehicleService.registerVehicle(vehicleModelId, vehicleName).subscribe((newVehicle) => self.showInfoDialog(newVehicle), (err) => {
      self.globalDialogService.error(err);
    });
  }

  /**
   * Navigate back to vehicle list
   */
  private returnVehicleList(registered: boolean = false): Promise<boolean> {
    if (registered) {
      return this.router.navigate(['..'], { relativeTo: this.route });
    } else {
      return this.router.navigate(['..'], { relativeTo: this.route.parent, replaceUrl: true });
    }
  }

  /**
   * Form field validation classes.
   * @param field field name.
   */
  fieldValidationClass(field: string) {
    return {
      'is-invalid': this.vehicleForm.get(field).invalid && (this.vehicleForm.get(field).dirty || this.vehicleForm.get(field).touched),
      'is-valid': this.vehicleForm.get(field).valid && this.vehicleForm.get(field).dirty
    };
  }

  /**
   * Form field validation error check.
   * @param field fild name.
   * @param error error type.
   */
  fieldValidationError(field: string, error: string) {
    return this.vehicleForm.get(field).errors && this.vehicleForm.get(field).errors[error];
  }

  /**
   * Show confirm dialog
   */
  showConfirmDialog() {
    const self = this;

    // Ask for confirmation.
    self.globalDialogService.delete(`vehicle ${self.vehicle.name}`)
      .subscribe((agreed) => {
        if (agreed) {
          // Agreed to remove
          self.removeVehicle();
        }
      });
  }

  /**
  * Show info dialog
  */
  showInfoDialog(newVehicle: vehicle.admin.IRegisteredVehicleProto) {
    const self = this;

    // Ask for confirmation.
    self.globalDialogService.success(`Client ID: ${newVehicle.clientId}`, 'Register Vehicle succeed')
      .subscribe(() => {
        self.returnVehicleList(true);
      });
  }
  /**
   * Enable / disable 2fa
   */
  switch2FactorAuthentication() {
    const self = this;

    if (self.vehicle.tfa !== totp.TwoFactorAuthenticationStatusProto.ENABLED) {
      self.tfaProcessing = true;
      // enable / confirm
      self.vehicleService.register2FactorAuthentication(self.vehicle.id, self.vehicle.modelId).subscribe((totpSecret) => {
        self.vehicle.tfa = totp.TwoFactorAuthenticationStatusProto.ENABLED;
        self.tfaProcessing = false;
        self.globalDialogService.success(`Please use this secret key for TOTP: ${totpSecret.secret}`, '2-Factor Authentication enabled');
      }, (err) => {
        self.tfaProcessing = false;
        self.globalDialogService.error(err);
      });
    } else {
      // disable
      self.tfaProcessing = true;
      self.otpDialog.otp().subscribe((otp) => {
        self.vehicleService.unregister2FactorAuthentication(self.vehicle.id, otp).subscribe(() => {
          self.vehicle.tfa = totp.TwoFactorAuthenticationStatusProto.DISABLED;
          self.tfaProcessing = false;
          self.globalDialogService.success('2-Factor Authentication is disabled successfully.');
        }, (err) => {
          self.tfaProcessing = false;
          self.globalDialogService.error(err);
        });
      }, () => {
        self.tfaProcessing = false;
      }, () => {
        self.tfaProcessing = false;
      });
    }
  }

  reset2Fa() {
    const self = this;

    self.tfaProcessing = true;
    self.otpDialog.scratchCode().subscribe((scratchCode: string) => {
      self.vehicleService.reset2FactorAuthentication(self.vehicle.id, scratchCode).subscribe(() => {
        self.vehicle.tfa = totp.TwoFactorAuthenticationStatusProto.DISABLED;
        self.tfaProcessing = false;
        self.globalDialogService.success('2-Factor Authentication is reset successfully.');
      }, (err) => {
        self.tfaProcessing = false;
        self.globalDialogService.error(err);
      })
    });
  }
}
