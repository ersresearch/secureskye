import { Component, OnInit } from '@angular/core';
import { vehicle, totp } from '../../../../shared/model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModelService } from '../model.service';
import { LoginService } from '../../../../login/login.service';
import { GlobalDialogService } from '../../../../shared/service';

@Component({
  selector: 'app-vehicle-model-detail',
  templateUrl: './vehicle-model-detail.component.html',
  styleUrls: ['./vehicle-model-detail.component.scss']
})
export class VehicleModelDetailComponent implements OnInit {
  /**
   * VehicleModelId  from parameter
   */
  vehicleModelId: string;
  /**
   * VehicleModel data
   */
  vehicleModel: vehicle.admin.IVehicleModelProto;
  /**
   * VehicleModel form
   */
  vehicleModelForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: ModelService,
    private fb: FormBuilder,
    private authService: LoginService,
    private globalDialogService: GlobalDialogService
  ) { }

  ngOnInit() {
    const self = this;
    // Retrieve vehicle model UUID from parameters
    self.route.params.subscribe((params) => {
      self.vehicleModelId = params.modelId;

      if (self.vehicleModelId) {
        // Retrive vehicle model info
        self.vehicleService.getVehicleModel(self.vehicleModelId).subscribe((model) => {
          self.vehicleModel = model;

          self.vehicleModelForm = self.fb.group({
            name: [self.vehicleModel.name, [Validators.required]],
            vehicle2Fa: [self.vehicleModel.vehicle2FaStatus !== totp.TwoFactorAuthenticationStatusProto.DISABLED]
          });
        });
      } else {
        // Create new vehicle model
        self.vehicleModel = vehicle.admin.VehicleModelProto.create();
        self.vehicleModelForm = self.fb.group({
          name: ['', [Validators.required]],
          vehicle2Fa: [false]
        });
      }
    });
  }

  /**
   * Update vehicle model
   */
  updateVehicleModel() {
    const self = this;

    if (self.vehicleModelForm.invalid) {
      Object.keys(self.vehicleModelForm.controls).forEach(field => self.vehicleModelForm.get(field).markAsTouched({ onlySelf: true }));
      return;
    }

    const updateInfo = vehicle.admin.VehicleModelProto.create({
      name: self.vehicleModelForm.get('name').value,
      vehicle2FaStatus: self.vehicleModelForm.get('vehicle2Fa').value !== true ?
        totp.TwoFactorAuthenticationStatusProto.DISABLED : totp.TwoFactorAuthenticationStatusProto.ENABLED
    });

    self.vehicleService.updateVehicleModel(self.vehicleModelId, updateInfo).subscribe(() => {
      self.returnVehicleModelList();
    }, (err) => {
      self.globalDialogService.error(err);
    });
  }

  /**
   * Remove vehicle model on edit mode
   */
  removeVehicleModel() {
    const self = this;

    self.vehicleService.deleteVehicleModel(self.vehicleModelId).subscribe((evt) => {
      self.returnVehicleModelList();
    }, (err) => {
      self.globalDialogService.error(err);
    });
  }

  /**
   * Create new vehicle model
   */
  registerVehicleModel() {
    const self = this;

    if (self.vehicleModelForm.invalid) {
      return;
    }

    const newVehicleModel = vehicle.admin.VehicleModelProto.create({
      name: self.vehicleModelForm.get('name').value
    });
    self.vehicleService.registerVehicleModel(newVehicleModel).subscribe(() => {
      self.returnVehicleModelList();
    }, (err) => {
      self.globalDialogService.error(err);
    });
  }

  /**
   * Navigate back to vehicle model list
   */
  private returnVehicleModelList(): Promise<boolean> {
    return this.router.navigate(['..'], { relativeTo: this.route });
  }

  /**
   * Form field validation classes.
   * @param field field name.
   */
  fieldValidationClass(field: string) {
    return {
      'is-invalid': this.vehicleModelForm.get(field).invalid &&
        (this.vehicleModelForm.get(field).dirty || this.vehicleModelForm.get(field).touched),
      'is-valid': this.vehicleModelForm.get(field).valid && this.vehicleModelForm.get(field).dirty
    };
  }

  /**
   * Form field validation error check.
   * @param field fild name.
   * @param error error type.
   */
  fieldValidationError(field: string, error: string) {
    return this.vehicleModelForm.get(field).errors && this.vehicleModelForm.get(field).errors[error];
  }

  /**
   * Show confirm dialog
   */
  showConfirmDialog() {
    const self = this;

    // Ask for confirmation.
    self.globalDialogService.delete(`vehicle model ${self.vehicleModel.name}`)
      .subscribe((agreed) => {
        if (agreed) {
          // Agreed to remove
          self.removeVehicleModel();
        }
      });
  }
}
