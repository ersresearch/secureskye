import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { Observable, Observer } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-otp-dialog',
  templateUrl: './otp-dialog.component.html'
})
export class OtpDialogComponent {

  /**
   * OTP form.
   */
  modalForm?: FormGroup;
  /**
   * Observer to emit events.
   */
  otpFormObserver: Observer<string>;
  /**
   * Modal component.
   */
  @ViewChild('otpModal')
  otpModal: ModalDirective;
  /**
   * OTP textbox for focusing.
   */
  @ViewChild('otp')
  otpInput: ElementRef;
  /**
   * scratchCode textbox for focusing.
   */
  @ViewChild('scratchCode')
  scratchCodeInput: ElementRef;

  constructor(private fb: FormBuilder) { }

  /**
   * Show the OTP input form. Passing [oauthId] will allow reset 2fa.
   */
  otp(): Observable<string> {
    const self = this;

    // New Form
    self.modalForm = self.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });

    // Focus on shown
    self.otpModal.onShown.pipe(first()).subscribe(() => {
      self.otpInput.nativeElement.focus();
    });

    // Show
    self.otpModal.show();

    // Return observable to other component to subscribe
    return Observable.create((observer) => self.otpFormObserver = observer);
  }

  /**
   * Accept the OTP
   */
  otpEntered() {
    const self = this;

    // Validate
    if (self.modalForm.invalid) {
      self.markAsDirty(self.modalForm);
      return;
    }

    // Emit after hidden
    self.otpModal.onHidden.pipe(first()).subscribe(() => {
      self.otpFormObserver.next(self.modalForm.get('otp').value);
    });

    // Close
    self.otpModal.hide();
  }

  /**
   * Show the dialog for scartch code to reset 2FA.
   */
  scratchCode(): Observable<string> {
    const self = this;

    // New Form
    self.modalForm = self.fb.group({
      scratchCode: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]]
    });

    // Focus on shown
    self.otpModal.onShown.pipe(first()).subscribe(() => {
      self.scratchCodeInput.nativeElement.focus();
    });

    // Show
    self.otpModal.show();

    // Return observable to other component to subscribe
    return Observable.create((observer) => self.otpFormObserver = observer);
  }

  /**
   * Accept the scratch code.
   */
  scratchCodeEntered() {
    const self = this;

    // Validate
    if (self.modalForm.invalid) {
      self.markAsDirty(self.modalForm);
      return;
    }

    // Emit after hidden
    self.otpModal.onHidden.pipe(first()).subscribe(() => {
      self.otpFormObserver.next(self.modalForm.get('scratchCode').value);
    });

    // Close
    self.otpModal.hide();
  }

  /**
   * Form field validation classes.
   * @param field field name.
   */
  fieldValidationClass(field: string) {
    return {
      'is-invalid': this.modalForm.get(field).invalid && this.modalForm.get(field).dirty,
      'is-valid': this.modalForm.get(field).valid && this.modalForm.get(field).dirty
    };
  }

  /**
   * Form field validation error check.
   * @param field fild name.
   * @param error error type.
   */
  fieldValidationError(field: string | string[], error: string) {
    return this.modalForm.get(field).errors && this.modalForm.get(field).errors[error];
  }

  /**
   * Function which mark all form control to `touched`
   * @param control Form control
   */
  private markAsDirty(control: AbstractControl): void {
    const self = this;
    // Mark this control as dirty.
    control.markAsDirty({ onlySelf: true });

    // Recursively mark any children as dirty.
    if (control.hasOwnProperty('controls')) {
      // inner controls
      const inner = control['controls'];
      Object.keys(inner).forEach(field => self.markAsDirty(control.get(field)));
    }
  }
}
