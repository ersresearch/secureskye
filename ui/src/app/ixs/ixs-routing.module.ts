import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanMessageComponent } from './can-message.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'can-message'
  },
  {
    path: 'can-message',
    pathMatch: 'full',
    data: {
      authorities: ['message:read']
    },
    component: CanMessageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IxsRoutingModule { }
