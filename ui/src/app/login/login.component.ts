import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { GlobalDialogService } from '../shared/service/global-dialog.service';
import { LoginService } from './login.service';
import { OtpDialogComponent } from '../shared/component';
import { UserService } from '../settings/user/user.service';
import { skip, first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  /**
   * Login form
   */
  loginForm: FormGroup;
  /**
   * OTP Input dialog
   */
  @ViewChild('otpDialog')
  otpDialog: OtpDialogComponent;
  @ViewChild('username')
  username: ElementRef;
  /**
   * If [Lost authenticator?] button is shown when OTP required.
   */
  otpRequired = false;
  private sessionErrorSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private routerState: ActivatedRoute,
    private authService: LoginService,
    private fb: FormBuilder,
    private globalDialogService: GlobalDialogService,
    private userService: UserService
  ) { }

  ngOnInit() {
    const self = this;

    self.loginForm = self.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });

    self.routerState.queryParams.subscribe((params) => {
      if (params['logout']) {
        self.authService.logOut(true);
        self.authService.removeOtpAccess();
      }
    });

    self.sessionErrorSubscription = self.authService.sessionErrorClosed.subscribe(() => {
      self.username.nativeElement.focus();
    });
  }

  ngOnDestroy() {
    this.sessionErrorSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    if (this.globalDialogService.getCurrentModal() === undefined) {
      this.username.nativeElement.focus();
    }
  }

  /**
   * Login
   */
  login(otp: string) {
    const self = this;

    if (self.loginForm.invalid) {
      Object.keys(self.loginForm.controls).forEach(field => self.loginForm.get(field).markAsTouched({ onlySelf: true }));
      return;
    }

    const username = self.loginForm.get('username').value;
    const password = self.loginForm.get('password').value;
    self.authService.login(username, password, otp).then(() => {
      const user = self.authService.getIdentityClaims();
      if (user != null) {
        // get return url from route parameters or default to '/'
        const returnUrl = self.route.snapshot.queryParams['returnUrl'] || '/';
        self.router.navigateByUrl(returnUrl);
      } else {
        self.globalDialogService.error('Invalid username or password.', 'Login failed');
      }
    }).catch((err) => {
      self.loginForm.markAsPristine();
      if (err.error && err.error.error_description === 'Bad credentials') {
        self.globalDialogService.error('Invalid username or password.', 'Login failed');
      } else if (err.error && err.error.error_description && err.error.error_description.startsWith('Invalid OTP')) {
        // Show OTP input dialog when OTP not entered yet
        if (otp === undefined) {
          self.otpDialog.otp().subscribe((result) => {
            self.login(result);
          });
        } else {
          self.globalDialogService.error('Invalid OTP', 'Verification failed.').subscribe(() => self.otpRequired = true);
        }
      } else {
        self.globalDialogService.error(err);
      }
    });
  }

  /**
   * Reset 2fa.
   */
  reset2fa() {
    const self = this;

    if (self.loginForm.invalid) {
      self.loginForm.get('username').markAsTouched({ onlySelf: true })
      return;
    }

    const username = self.loginForm.get('username').value;
    self.otpDialog.scratchCode().subscribe((scratchCode) => {
      self.authService.reset2FactorAuthentication(username, scratchCode).subscribe(() => {
        self.globalDialogService.success('You have reset 2-Factor Authentication. Please login and setup new one.',
          '2-Factor Authentication is reset');
      }, (resetErr) => {
        self.globalDialogService.error(resetErr);
      });
    });
  }

  /**
   * Form field validation classes.
   * @param field field name.
   */
  fieldValidationClass(field: string) {
    return {
      'is-invalid': this.loginForm.get(field).invalid && (this.loginForm.get(field).dirty || this.loginForm.get(field).touched),
      'is-valid': this.loginForm.get(field).valid && this.loginForm.get(field).dirty
    };
  }

  /**
   * Form field validation error check.
   * @param field fild name.
   * @param error error type.
   */
  fieldValidationError(field: string, error: string) {
    return this.loginForm.get(field).errors && this.loginForm.get(field).errors[error];
  }
}
