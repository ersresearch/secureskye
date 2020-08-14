import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { user } from '../../../shared/model';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  /**
   * Role list current page number for pagination.
   */
  roleListPageNo = 1;
  /**
   * Number of items per page.
   */
  itemsPerPage = 5;
  /**
   * User list.
   */
  items: user.admin.IRoleProto[];

  constructor(private userService: UserService, public roleService: RoleService) { }

  ngOnInit() {
    this.loadRoleList();
  }

  /**
   * Load role list
   */
  loadRoleList() {
    const self = this;

    self.roleService.getAllRoles().subscribe((roleset) => {
      self.items = roleset.data;
    });
  }
}
