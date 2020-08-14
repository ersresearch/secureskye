import { Component, OnInit } from '@angular/core';
import { UpdateCredential, user } from '../../../../shared/model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '../../../../login/login.service';
import { BCryptService, GlobalDialogService } from '../../../../shared/service';
import { UserService } from '../../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {
  /**
   * UserId from parameter
   */
  userId: string;
  /**
   * User data
   */
  user: user.admin.ICredentialProto;
  /**
   * User form
   */
  userForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private bcrypt: BCryptService,
    private authService: LoginService,
    private globalDialogService: GlobalDialogService
  ) { }

  ngOnInit() {
    const self = this;

    // Retrieve user UUID
    if (self.authService.getIdentityClaims()) {
      self.userId = self.authService.getIdentityClaims()['id'];
    }

    // Retrieve user info
    self.userService.getUserById(self.userId).subscribe((v) => {
      self.user = v;
      self.userForm = self.fb.group({
        newPassword: [null, [Validators.required]]
      });
    });
  }

  /**
  * Save user name on edit mode
  */
  changePassword() {
    const self = this;
    if (self.userForm.invalid) {
      return;
    }

    const updateInfo = new UpdateCredential();
    updateInfo.password = self.bcrypt.encrypt(self.userForm.get('newPassword').value);

    self.userService.updateUser(self.user.id, updateInfo).subscribe(() => {
      self.authService.logOut();
      self.router.navigate(['/login'], { queryParams: { returnUrl: '/settings/profile' }, replaceUrl: true }).then(() => {
        self.globalDialogService.success('Please login with the new password to continue.', 'Password changed successfully');
      });
    });
  }

  /**
   * Form field validation classes.
   * @param field field name.
   */
  fieldValidationClass(field: string) {
    return {
      'is-invalid': this.userForm.get(field).invalid && (this.userForm.get(field).dirty || this.userForm.get(field).touched),
      'is-valid': this.userForm.get(field).valid && this.userForm.get(field).dirty
    };
  }

  /**
   * Form field validation error check.
   * @param field fild name.
   * @param error error type.
   */
  fieldValidationError(field: string, error: string) {
    return this.userForm.get(field).errors && this.userForm.get(field).errors[error];
  }
}
