import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OtaListComponent } from './list/ota-list.component';
import { OtaUploadComponent } from './upload/ota-upload.component';
import { EmptyParentComponent } from '../shared/layout';
import { ParamsResolverService } from '../shared/service';
import { OtaPublishComponent } from './publish/ota-publish.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'list',
    pathMatch: 'full',
    component: OtaListComponent,
    data: {
      authorities: ['ota-images:read']
    }
  },
  {
    path: 'upload',
    pathMatch: 'full',
    component: OtaUploadComponent,
    data: {
      breadcrumbs: 'Upload',
      authorities: ['ota-images:create']
    }
  },
  {
    path: ':otaId',
    component: OtaPublishComponent,
    data: {
      breadcrumbs: '{{params.otaId}}',
      authorities: ['ota-images:read', 'ota-images:update', 'ota-images:delete']
    },
    resolve: {
      params: ParamsResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtaRoutingModule { }
