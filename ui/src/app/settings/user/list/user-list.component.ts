import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AvatarService } from 'ngx-avatar';
import { BreadcrumbsSwitchService } from '../../../shared/service';
import { BreadcrumbSwitchLink } from '../../../shared/model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  /**
   * User list curret page number for pagination.
   */
  userListPageNo = 1;
  /**
   * Item per page.
   */
  itemsPerPage = 5;
  /**
   * User list.
   */
  items: any[];

  constructor(
    private router: Router,
    private userService: UserService,
    private avatarService: AvatarService,
    private breadcrumbsSwitchService: BreadcrumbsSwitchService
  ) { }

  ngOnInit() {

    this.breadcrumbsSwitchService.breadcrumbSwitchLinks(
      BreadcrumbSwitchLink.create('Role Management', false, 'fa fa-user-circle', ['/settings', 'user', 'role'])
    );
    this.loadListUsers();
  }

  /**
   * load all registered users
   */
  loadListUsers() {
    const self = this;

    // Request list of users
    self.items = null;
    self.userService.getListUsers().subscribe((users) => {
      self.userListPageNo = 1;
      self.items = users.data.map(u => {
        const extendUser = Object.create(u);

        // extends avatar
        extendUser.avatar3rdPartyMap = {};
        Object.keys(extendUser.avatar3rdPartyMap).forEach(sourceType => extendUser.avatar3rdPartyMap[sourceType] = undefined);
        extendUser.avatar3rdPartyMap['initials'] = extendUser.displayName;
        if (extendUser.avatarFormat && self.avatarService.isSource(extendUser.avatarFormat)) {
          extendUser.avatar3rdPartyMap[extendUser.avatarFormat] = extendUser.avatar;
        } else {
          extendUser.avatar3rdPartyMap['img'] = extendUser.avatar;
        }
        return extendUser;
      });
    });
  }
}
