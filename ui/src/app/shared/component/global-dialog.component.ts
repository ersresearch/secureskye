import { Component, ViewChild, ElementRef } from '@angular/core';
import { Dialog, DialogCommand } from '../model/dialog.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-global-dialog',
  templateUrl: './global-dialog.component.html'
})
export class GlobalDialogComponent {

  /**
   * Dialog content
   */
  dialog?: Dialog;

  @ViewChild('btn')
  btn: ElementRef;

  constructor(private bsModalRef: BsModalRef, bsModalService: BsModalService) {
    const self = this;

    bsModalService.onShown.pipe(first()).subscribe(() => {
      self.btn.nativeElement.focus();
    });
  }

  /**
   * Command button click handler
   */
  executeCmd(cmd: DialogCommand) {
    if (cmd.command && cmd.command() !== true) {
      this.close();
    }
  }

  /**
   * Close this modal
   */
  close() {
    this.bsModalRef.hide();
  }

}
