import { Component, OnInit, ViewChild, ElementRef, ContentChildren } from '@angular/core';
import { user, totp, notification, EmailNotificationSubscription, UpdateCredential, BreadcrumbSwitchLink } from '../../../shared/model';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { GlobalDialogService, BCryptService, ImageService, BreadcrumbsSwitchService } from '../../../shared/service';
import { RoleService } from '../../role/role.service';
import { LoginService } from '../../../login/login.service';
import { BsModalService, ModalDirective } from 'ngx-bootstrap';
import { SourceFactory, AvatarService, AvatarComponent, } from 'ngx-avatar';
import { CropperSettings, ImageCropperComponent } from 'ngx-img-cropper';
import { OtpDialogComponent } from '../../../shared/component';
import { combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  /**
   * Default notification channel for user subscription.
   */
  static readonly USER_NOTIFICATION_CHANNEL = 'Email';
  /**
   * UserId of logged in user.
   */
  profileMode = false;
  /**
   * UserId  from parameter.
   */
  userId: string;
  /**
   * User data.
   */
  user: user.admin.ICredentialProto = {};
  /**
   * User form.
   */
  userForm: FormGroup;
  /**
   * Local avatar base64 string.
   */
  avatarBase64Str: string;
  /**
   *Local avatar format.
   */
  avatarFormat: string;
  /**
   * Local avatar cropper data.
   */
  avatarCropperData: any = {};
  /**
   * Local avatar cropper settings.
   */
  avatarCropperSettings: CropperSettings;
  /**
   * Local avatar cropper component.
   */
  @ViewChild('avatarCropper')
  avatarCropper: ImageCropperComponent;
  /**
   * Local avatar copper modal.
   */
  @ViewChild('avatarCropperModal')
  avatarCropperModal: ModalDirective;
  /**
   * Button OK of avatar cropper modal.
   */
  @ViewChild('avatarCropperOkBtn')
  avatarCropperOkBtn: ElementRef;
  /**
   * Local avatar file upload.
   */
  @ViewChild('avatarFileUpload')
  avatarFileUpload: ElementRef;
  /**
   * Avatar component.
   */
  @ViewChild('avatar')
  avatar: AvatarComponent;
  /**
   * Avatar file name.
   */
  avatarFileUploadName: string;
  /**
   * Avatar 3rd party provider.
   */
  avatar3rdParty: string;
  /**
   * 3rd party ID for avatar.
   */
  avatar3rdPartyId: string;
  /**
   * 3rd party avatars.
   */
  avatar3rdPartyMap = {};
  /**
   * 3rd party avatars id input.
   */
  @ViewChild('avatar3rdPartyIdInput')
  avatar3rdPartyIdInput: ElementRef;
  /**
   * Modal for 3rd party input for avatar.
   */
  @ViewChild('avatar3rdPartyModal')
  avatar3rdPartyModal: ModalDirective;
  /**
   * Notification subcription topics.
   */
  subcriptionTopics: notification.TopicListProto;
  /**
   * User subscriptions.
   */
  userSubscriptions: EmailNotificationSubscription[] = [];
  /**
   * All user roles.
   */
  roles: user.admin.IRoleProto[] = [];
  /**
   * Modal for OTP input.
   */
  @ViewChild('otpDialog')
  otpDialog: OtpDialogComponent;
  /**
   * 2FA in process (for button states).
   */
  tfaProcessing = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private bcrypt: BCryptService,
    private authService: LoginService,
    private globalDialogService: GlobalDialogService,
    private modalService: BsModalService,
    private avatarSourceFactory: SourceFactory,
    private avatarService: AvatarService,
    private roleService: RoleService,
    private imageService: ImageService,
    private breadcrumbsSwitchService: BreadcrumbsSwitchService
  ) { }

  ngOnInit() {
    const self = this;

    // Image cropper settings
    self.avatarCropperSettings = new CropperSettings({
      canvasWidth: 500,
      canvasHeight: 400,
      croppedWidth: 160,
      croppedHeight: 160,
      width: 160,
      height: 160,
      keepAspect: true,
      noFileInput: true
    });
    self.avatarCropperSettings.rounded = true;
    self.avatarCropperSettings.preserveSize = false;
    // self.avatarCropperSettings.dynamicSizing = true;
    // self.avatarC.cropOnResize = false;
    // self.avatarC.showCenterMarker = false;
    self.avatarCropperSettings.markerSizeMultiplier = 0.5;
    self.avatarCropperSettings.cropperClass = 'mx-auto d-block img-thumbnail border-0';
    self.avatarCropperModal.onShown.subscribe(_ => self.avatarCropperOkBtn.nativeElement.focus());
    self.avatar3rdPartyModal.onShown.subscribe(_ => self.avatar3rdPartyIdInput.nativeElement.focus());

    // Retrieve user UUID from parameters
    self.route.params.subscribe((params) => {
      if (self.route.snapshot.data['profileMode']) {
        // Retrieve in-session userId
        if (self.authService.getIdentityClaims()) {
          self.userId = self.authService.getIdentityClaims()['id'];
        }
        self.profileMode = true;
        self.breadcrumbsSwitchService.breadcrumbSwitchLinks(
          BreadcrumbSwitchLink.create('Change password', false, 'fa fa-key', ['password'])
        );
      } else {
        self.userId = params.userId;
      }

      // Retrieve all roles
      self.roleService.getAllRoles().subscribe((roles) => {
        self.roles = roles.data;

        if (self.userId) {
          // Retrive user info
          self.userService.getUserById(self.userId).subscribe((v) => {
            self.user = v;
            self.userForm = self.fb.group({
              displayName: [self.user.displayName, [Validators.required]],
              username: [{ value: self.user.name, disabled: true }, [Validators.required]],
              email: [self.user.email, [Validators.required, Validators.email]],
              firstName: [self.user.firstName, [Validators.required]],
              middleName: [self.user.middleName],
              lastName: [self.user.lastName, [Validators.required]],
              enabled: [{ value: self.user.enabled, disabled: self.isAdmin() }],
              roles: [self.user.roles.map(r => r.id)]
            });

            // avatar sources
            self.avatar3rdPartyMap['initials'] = self.user.displayName;
            if (self.user.avatarFormat && self.avatarService.isSource(self.user.avatarFormat)) {
              self.avatar3rdPartyMap[self.user.avatarFormat] = self.user.avatar;
            } else {
              self.avatar3rdPartyMap['img'] = self.user.avatar;
            }
          });

          if (self.profileMode) {
            // Get user subcriptions topics
            combineLatest(
              // Get all available subscription topics
              self.userService.getSubcriptionTopics(),
              // Get all user subscriptions
              self.userService.getSubscriptions(UserDetailComponent.USER_NOTIFICATION_CHANNEL)
            ).subscribe(([topicResp, subResp]: [notification.ITopicListProto, notification.ISubscriptionListProto]) => {
              self.userSubscriptions = topicResp.topics.map(t => new EmailNotificationSubscription(t, subResp.subscriptions));
            });
          }
        } else {
          // Register
          self.user = user.admin.CredentialProto.create(); // for dummy avatar
          self.userForm = self.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
            displayName: ['', [Validators.required]],
            email: ['', [Validators.required]],
            firstName: ['', [Validators.required]],
            middleName: [''],
            lastName: ['', [Validators.required]],
            enabled: [true],
            avatar: [''],
            roles: ['']
          });

          // avatar sources
          self.avatar3rdPartyMap['initials'] = 'SKYE';
        }
      });

    });
  }

  /**
   * Save user name on edit mode
   */
  updateUser() {
    const self = this;

    if (self.userForm.invalid) {
      self.markAsTouchDeep(self.userForm);
      return;
    }

    const updateInfo = new UpdateCredential(self.userForm.get('enabled').value,
      self.userForm.get('displayName').value,
      self.avatarBase64Str, self.avatarFormat, self.avatarFormat && self.avatarService.isSource(self.avatarFormat),
      self.userForm.get('firstName').value, self.userForm.get('lastName').value,
      self.userForm.get('middleName').value, self.userForm.get('email').value,
    );

    if (!self.isAdmin()) {
      updateInfo.roles = self.userForm.get('roles').value.map(rid => user.admin.RoleProto.create({ id: rid }));
    } else {
      // prevent changing active status of `admin`
      updateInfo.enabled = undefined;
    }

    combineLatest(
      // Update user info
      self.userService.updateUser(self.user.id, updateInfo),
      // Subscribe list
      self.userService.subscribeTopic(UserDetailComponent.USER_NOTIFICATION_CHANNEL,
        self.userSubscriptions.filter(s => s.checked).map(s => s.topic.id)),
      // Unsubscribe list
      self.userService.unsubscribeTopic(UserDetailComponent.USER_NOTIFICATION_CHANNEL,
        self.userSubscriptions.filter(s => !s.checked).map(s => s.topic.id)),
    ).subscribe(() => {
      if (self.profileMode) {
        self.userService.updateSessionUser();
        self.globalDialogService.success('Profile updated.');
      } else {
        self.returnUserList();
      }
    }, (err) => {
      self.globalDialogService.error(err);
    });
  }

  /**
   * Remove user on edit mode
   */
  removeUser() {
    const self = this;

    self.userService.deleteUser(self.user.id).subscribe((evt) => {
      self.returnUserList();
    }, (err) => {
      self.globalDialogService.error(err);
    });
  }

  /**
   * Register new user
   */
  registerUser() {
    const self = this;

    if (self.userForm.invalid) {
      self.markAsTouchDeep(self.userForm);
      return;
    }

    const encryptedPwd = self.bcrypt.encrypt(self.userForm.get('password').value);
    const newUser = user.admin.CredentialProto.create({
      name: self.userForm.get('username').value,
      password: encryptedPwd,
      displayName: self.userForm.get('displayName').value,
      email: self.userForm.get('email').value,
      firstName: self.userForm.get('firstName').value,
      middleName: self.userForm.get('middleName').value,
      lastName: self.userForm.get('lastName').value,
      enabled: self.userForm.get('enabled').value,
      roles: self.userForm.get('roles').value.map(rid => user.admin.RoleProto.create({ id: rid })),
      avatar: self.avatarBase64Str,
      avatarFormat: self.avatarFormat,
      avatarThirdParty: self.avatarFormat && self.avatarService.isSource(self.avatarFormat)
    });
    self.userService.registerUser(newUser).subscribe(() => {
      self.returnUserList();
    }, (err) => {
      self.globalDialogService.error(err);
    });
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
   * Navigate back to user list
   */
  returnUserList(): Promise<boolean> {
    return this.router.navigate(['..'], { relativeTo: this.route, replaceUrl: true });
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

  /**
   * get a list of user authorities
   * @param authList authority list
   */
  private getUserAuths(authList: user.admin.IAuthorityProto[]): user.admin.AuthorityProto[] {
    return authList.map(auth => this.convertIAuthorityToAuthority(auth));
  }

  /**
   * convert from IAuthorityProto to authority JSON
   * @param iAuth IAuthorityProto
   */
  private convertIAuthorityToAuthority(iAuth: user.admin.IAuthorityProto): any {
    return {
      authority: iAuth.authority,
      id: iAuth.id
    };
  }

  /**
   * Check detail page of `admin` or not
   */
  isAdmin() {
    return this.user && this.user.name === 'admin';
  }

  /**
   * Show confirm dialog
   */
  showConfirmDialog() {
    const self = this;

    // Ask for confirmation.
    self.globalDialogService.delete(`user ${self.user.displayName}`).subscribe((agreed) => {
      if (agreed) {
        // Agreed to remove user
        self.removeUser();
      }
    });
  }

  /**
   * Avatar clicked for changing
   */
  avatarFileChange(e: any) {
    const self = this;

    if (e.target.files && e.target.files[0]) {
      // set file name
      self.avatarFileUploadName = e.target.files[0].name;
      // Load image
      self.imageService.validate(e.target.files[0]).subscribe((resp) => {
        // save image type
        self.avatarFormat = resp.type;

        // set image to cropper
        const avatarImg = new Image();
        avatarImg.src = resp.src;
        self.avatarCropper.setImage(avatarImg);
        self.avatarCropperModal.show();
      }, (err) => {
        self.globalDialogService.error(err, 'Avatar upload failed');
      });
    }
  }

  /**
   * Cancel avatar updating
   */
  cancelUpdateAvatar() {
    this.avatarFileUpload.nativeElement.value = '';
    this.avatarFileUploadName = '';
    this.avatar3rdParty = '';
    this.avatar3rdPartyId = '';
  }

  /**
   * Update avatar image to avatar component
   */
  updateAvatar() {
    // update avatar renderer
    // remove all sources
    this.avatar._sources = Array();
    Object.keys(this.avatar3rdPartyMap).forEach(sourceType => this.avatar3rdPartyMap[sourceType] = undefined);

    this.avatar3rdPartyMap['img'] = this.avatarCropperData.image;
    // save image base 64 string for updating
    this.avatarBase64Str = this.imageService.getImageBase64String(this.avatarCropperData.image);
  }

  /**
   * Update avatar from 3rd party
   */
  updateAvatar3rdParty() {
    // remove all sources
    this.avatar._sources = Array();
    Object.keys(this.avatar3rdPartyMap).forEach(sourceType => this.avatar3rdPartyMap[sourceType] = undefined);
    // add new source
    this.avatar3rdPartyMap[this.avatar3rdParty] = this.avatar3rdPartyId;
    // for DB persist
    this.avatarBase64Str = this.avatar3rdPartyId;
    this.avatarFormat = this.avatar3rdParty;
  }

  /**
   * Input ID for 3rd party avatar
   */
  avatar3rdPartyInput(provider: string) {
    this.avatar3rdParty = provider;
    this.avatar3rdPartyModal.show();
  }

  /**
   * Enable / disable 2fa
   */
  switch2FactorAuthentication() {
    const self = this;

    if (self.user.tfa !== totp.TwoFactorAuthenticationStatusProto.ENABLED) {
      // enable / confirm
      self.router.navigate(['2fa'], { relativeTo: self.route, replaceUrl: true });
    } else {
      // disable
      self.tfaProcessing = true;
      self.otpDialog.otp().subscribe((otp) => {
        self.userService.unregister2FactorAuthentication(otp).subscribe(() => {
          self.user.tfa = totp.TwoFactorAuthenticationStatusProto.DISABLED;
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

  /**
   * Remove OTP access devices
   */
  removeOtpAccess() {
    const self = this;

    self.globalDialogService.delete('all recent devices').pipe(filter(anwser => anwser === true)).subscribe(() =>
      self.userService.removeOtpAccess().subscribe(() => {
        self.globalDialogService.success('All recent devices removed.');
      }, (err) => self.globalDialogService.error(err))
    );
  }

  /**
   * Reset 2fa using recovery codes.
   */
  reset2Fa() {
    const self = this;

    self.otpDialog.scratchCode().subscribe((scratchCode) => {
      self.tfaProcessing = true;
      self.userService.reset2FactorAuthentication(scratchCode).subscribe(() => {
        self.user.tfa = totp.TwoFactorAuthenticationStatusProto.DISABLED;
        self.tfaProcessing = false;
        self.globalDialogService.success('2-Factor Authentication is reset successfully.');
      }, (err) => {
        self.tfaProcessing = false;
        self.globalDialogService.error(err);
      });
    });
  }
}
