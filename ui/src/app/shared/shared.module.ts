import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalDialogComponent, OtpDialogComponent } from './component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './component/breadcrumbs.component';
import { EmptyParentComponent } from './layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ModalModule.forRoot(),
  ],
  entryComponents: [GlobalDialogComponent],
  declarations: [GlobalDialogComponent, OtpDialogComponent, EmptyParentComponent, BreadcrumbsComponent],
  exports: [GlobalDialogComponent, OtpDialogComponent, BreadcrumbsComponent]
})
export class SharedModule { }
