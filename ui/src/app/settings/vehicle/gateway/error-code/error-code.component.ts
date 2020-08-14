import { Component, OnDestroy, ViewChild, Input } from '@angular/core';
import { NgForm, AbstractControl } from '@angular/forms';
import { vehicle } from '../../../../shared/model';

@Component({
  selector: 'app-error-code',
  templateUrl: './error-code.component.html',
  styleUrls: ['./error-code.component.scss']
})
export class ErrorCodeComponent implements OnDestroy {
  @ViewChild('errorCodeForm') errorCodeForm: NgForm;
  @Input() errorCode: vehicle.registry.ICodeInfoProto[];
  @Input() newCodeInfoList: any;
  @Input() readonly: boolean;

  constructor() { }

  ngOnDestroy() {
    this.errorCode = null;
  }

  /**
   * Add new code info
   */
  addNewCodeInfo() {
    this.newCodeInfoList.push(vehicle.registry.CodeInfoProto.create());
  }

  /**
   * Delete code info at specified index
   * @param index selected index
   */
  deleteNewCodeInfo(index: number) {
    this.newCodeInfoList.splice(index, 1);
  }

  /**
   * Submit errorCodeForm
   */
  submit() {
    // mark all invalid field of form
    if (this.errorCodeForm.invalid) {
      this.markAsTouchDeep(this.errorCodeForm.control);
    }
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
   * Form field validation classes.
   * @param field field name.
   */
  fieldValidationClass(control) {
    return control ? { 'is-invalid': control.invalid && (control.dirty || control.touched), 'is-valid': control.valid && control.dirty }
      : {};
  }

  /**
   * Get valid value of errorCodeForm
   */
  isValid() {
    return this.errorCodeForm.valid;
  }
}
