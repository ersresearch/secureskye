import { Component, OnInit } from '@angular/core';
import { totp } from '../../../../shared/model';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalDialogService } from '../../../../shared/service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-two-factor-authentication',
  templateUrl: './two-factor-authentication.component.html',
  styleUrls: ['./two-factor-authentication.component.scss']
})
export class TwoFactorAuthenticationComponent implements OnInit {

  /**
   * TOTP secret info
   */
  totpSecret: totp.IOauthTotpProto;
  /**
   * Show / hide secret key to user
   */
  showSecretKey = false;
  /**
   * Dialog content
   */
  otpForm?: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalDialogService: GlobalDialogService,
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    const self = this;

    self.userService.register2FactorAuthentication().subscribe((secret) => {
      self.totpSecret = secret;
      self.initOtpForm();
    }, (err) => {
      self.userService.request2FactorAuthenticationStatus().subscribe((secret) => {
        self.totpSecret = secret;
        self.initOtpForm();
      });
    });
  }

  /**
   * Initialize OTP input form
   */
  private initOtpForm() {
    const self = this;
    // New Form
    self.otpForm = self.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  /**
   * Verify OTP
   */
  verifyOtp() {
    const self = this;

    // Validate
    if (self.otpForm.invalid) {
      self.markAsTouchDeep(self.otpForm);
      return;
    }

    // Confirm register
    const otp = self.otpForm.get('otp').value;
    self.userService.confirm2FactorAuthentication(otp).subscribe(() => {
      self.router.navigate(['..'], { relativeTo: self.route, replaceUrl: true });
    }, (err) => {
      self.globalDialogService.error(err);
    });
  }

  /**
   * Form field validation classes.
   * @param field field name.
   */
  fieldValidationClass(field: string) {
    return {
      'is-invalid': this.otpForm.get(field).invalid && (this.otpForm.get(field).dirty || this.otpForm.get(field).touched),
      'is-valid': this.otpForm.get(field).valid && this.otpForm.get(field).dirty
    };
  }

  /**
   * Form field validation error check.
   * @param field fild name.
   * @param error error type.
   */
  fieldValidationError(field: string, error: string) {
    return this.otpForm.get(field).errors && this.otpForm.get(field).errors[error];
  }

  /**
   * Function which mark all form control to `touched`
   * @param control Form control
   */
  private markAsTouchDeep(control: AbstractControl): void {
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
}
