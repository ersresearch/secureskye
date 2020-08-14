import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error.component';

export const routes: Routes = [
  {
    path: '403',
    component: ErrorComponent,
    data: {
      errorCode: 403,
      errorPrimary: 'Forbidden',
      errorSecondary: 'Insufficient privileges to access this resource.'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }
