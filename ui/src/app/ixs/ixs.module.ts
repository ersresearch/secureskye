import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IxsRoutingModule } from './ixs-routing.module';
import { CanMessageComponent } from './can-message.component';
import { FormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IxsRoutingModule,
    PerfectScrollbarModule
  ],
  declarations: [CanMessageComponent]
})
export class IxsModule { }
