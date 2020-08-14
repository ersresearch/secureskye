import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtaRoutingModule } from './ota-routing.module';
import { OtaUploadComponent } from './upload/ota-upload.component';
import { OtaPublishComponent } from './publish/ota-publish.component';
import { OtaListComponent } from './list/ota-list.component';
import { SharedModule } from '../shared/shared.module';
import { FileUploadModule } from 'ng2-file-upload';
import { PaginationModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeModule } from 'angular-tree-component';

@NgModule({
  imports: [
    CommonModule,
    OtaRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    PaginationModule.forRoot(),
    TreeModule
  ],
  declarations: [OtaUploadComponent, OtaPublishComponent, OtaListComponent]
})
export class OtaModule { }
