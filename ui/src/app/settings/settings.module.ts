import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { UserListComponent } from './user/list/user-list.component';
import { UserDetailComponent } from './user/detail/user-detail.component';
import { TwoFactorAuthenticationComponent } from './user/detail/2fa/two-factor-authentication.component';
import { PasswordChangeComponent } from './user/detail/password/password-change.component';
import { RoleListComponent } from './role/list/role-list.component';
import { RoleDetailComponent } from './role/detail/role-detail.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from 'ngx-avatar';
import { ModalModule, PaginationModule, BsDropdownModule } from 'ngx-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ImageCropperModule } from 'ngx-img-cropper';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { VehicleModelListComponent } from './vehicle/model/list/vehicle-model-list.component';
import { VehicleModelDetailComponent } from './vehicle/model/detail/vehicle-model-detail.component';
import { VehicleGatewayListComponent } from './vehicle/gateway/list/vehicle-gateway-list.component';
import { VehicleGatewayEditComponent } from './vehicle/gateway/edit/vehicle-gateway-edit.component';
import { VehicleGatewayDetailComponent } from './vehicle/gateway/detail/vehicle-gateway-detail.component';
import { VehicleEcuListComponent } from './vehicle/gateway/ecu/list/vehicle-ecu-list.component';
import { VehicleEcuEditComponent } from './vehicle/gateway/ecu/edit/vehicle-ecu-edit.component';
import { VehicleEcuDetailComponent } from './vehicle/gateway/ecu/detail/vehicle-ecu-detail.component';
import { DatabaseImportComponent } from './database/import/database-import.component';
import { DatabaseExportComponent } from './database/export/database-export.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ErrorCodeComponent } from './vehicle/gateway/error-code/error-code.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    AvatarModule,
    NgSelectModule,
    ModalModule,
    ImageCropperModule,
    NgxQRCodeModule,
    FileUploadModule,

    SettingsRoutingModule
  ],
  declarations: [
    UserListComponent,
    UserDetailComponent,
    TwoFactorAuthenticationComponent,
    PasswordChangeComponent,
    RoleListComponent,
    RoleDetailComponent,
    VehicleModelListComponent,
    VehicleModelDetailComponent,
    VehicleGatewayListComponent,
    VehicleGatewayEditComponent,
    VehicleGatewayDetailComponent,
    VehicleEcuListComponent,
    VehicleEcuEditComponent,
    VehicleEcuDetailComponent,
    DatabaseImportComponent,
    DatabaseExportComponent,
    ErrorCodeComponent
  ]
})
export class SettingsModule { }
