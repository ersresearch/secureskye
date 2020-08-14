import { Component, Input, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { AvatarComponent, AvatarService } from 'ngx-avatar';
import { LoginService } from '../../login/login.service';
import { GlobalDialogService } from '../../shared/service';
import { UserService } from '../../settings/user/user.service';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  public navItems = undefined;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  /**
   * User info (identity claim)
   */
  user: any;
  /**
   * uuid of logged in user
   */
  uuid: string;
  /**
   * Avatar component
   */
  @ViewChild('avatar')
  avatar: AvatarComponent;
  /**
   * avatar source of logged user
   */
  avatar3rdPartyMap = {};

  constructor(
    private authService: LoginService,
    private userService: UserService,
    private avatarService: AvatarService,
    private globalDialogService: GlobalDialogService
  ) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }

  ngOnInit() {
    const self = this;

    self.userInfo();

    // listen session user update event
    self.userService.onUpdateSessionUser.subscribe(() => {
      self.userInfo();
    });
  }

  ngOnDestroy() {
    this.navItems = undefined;
  }

  /**
   * Retrieve user info and avatar
   */
  userInfo() {
    const self = this;

    // user info
    try {
      self.navItems = undefined;
      self.authService.loadUserProfile().then((userInfo) => {
        self.user = userInfo;
        // user avatar
        // remove all sources
        if (self.avatar) {
          self.avatar._sources = Array();
        }
        Object.keys(self.avatar3rdPartyMap).forEach(sourceType => self.avatar3rdPartyMap[sourceType] = undefined);
        self.avatar3rdPartyMap['initials'] = self.user.displayName;
        if (self.user.avatarFormat && self.avatarService.isSource(self.user.avatarFormat)) {
          self.avatar3rdPartyMap[self.user.avatarFormat] = self.user.avatar;
        } else {
          self.avatar3rdPartyMap['img'] = self.user.avatar;
        }

        // Update navigation sidebar
        self.authService.authorizeNavItems(self.user).subscribe((authorizedNavItems) => {
          self.navItems = authorizedNavItems;
        });
      });
    } catch (e) {
      self.authService.invalidateSession(1000); // 1 second delay in case of other on-going requests
    }
  }
}
