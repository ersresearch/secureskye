import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SimpleDialog, DialogCommand } from '../model/dialog.model';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalDialogComponent } from '../component';
import { UserSessionExpiredError } from '../error';
import { first, map } from 'rxjs/operators';
/**
 * Global dialog modal service
 */
@Injectable({
  providedIn: 'root'
})
export class GlobalDialogService {

  /**
   * Modal reference
   */
  private bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  /**
   * Show a simple dialog with OK button to close.
   * @param content content
   * @param title title
   * @param modalClass modal class
   */
  simpleDialog(content: string, title: string,
    modalClass: ('modal-primary' | 'modal-danger' | 'modal-success' | 'modal-info' | 'modal-warning')): Observable<void> {
    const self = this;

    // Only allow 1 global dialog at a time
    if (self.bsModalRef != null) {
      self.bsModalRef.hide();
      self.bsModalRef = null;
    }
    self.modalService.onHidden.pipe(first()).subscribe(() => self.bsModalRef = null);
    // Show dialog
    self.bsModalRef = self.modalService.show(GlobalDialogComponent, {
      initialState: { dialog: new SimpleDialog(title, content) },
      class: modalClass
    });
    // Subscribe to modal hide event
    return self.modalService.onHidden.pipe(
      first()
    );
  }

  /**
   * Show a simple confirm dialog with OK / Cancel button.
   * @param content content
   * @param title title
   * @param modalClass modal class
   */
  confirmDialog(content: string, title: string,
    modalClass: ('modal-primary' | 'modal-danger' | 'modal-success' | 'modal-info' | 'modal-warning')): Observable<boolean> {
    const self = this;

    // Only allow 1 global dialog at a time
    if (self.bsModalRef != null) {
      self.bsModalRef.hide();
      self.bsModalRef = null;
    }
    self.modalService.onHidden.pipe(first()).subscribe(() => self.bsModalRef = null);
    // Show dialog
    let accept = false;
    self.bsModalRef = self.modalService.show(GlobalDialogComponent, {
      initialState: {
        dialog: new SimpleDialog(title, content, [
          DialogCommand.no(() => { accept = false; }),
          DialogCommand.yes(modalClass.replace('modal-', 'btn-'), () => { accept = true; })
        ])
      },
      class: modalClass
    });
    // Subscribe to modal hide event
    return self.modalService.onHidden.pipe(
      first(),
      map(_ => accept)
    );
  }

  /**
   * Show a error dialog modal.
   * @param content content
   * @param title title
   */
  error(content: (HttpErrorResponse | UserSessionExpiredError | string), title: string = 'Error') {
    if (content instanceof UserSessionExpiredError) {
      return; // Ignore user session expired error as it was handled at login page.
    } else if (content instanceof HttpErrorResponse) {
      const errorResponse = this.errorResponse(content);
      return this.simpleDialog(errorResponse.message || errorResponse['cause']['message'], title || errorResponse.error, 'modal-danger');
    } else {
      return this.simpleDialog(content, title, 'modal-danger');
    }

  }

  /**
   * Show a success dialog modal.
   * @param content content
   * @param title title
   */
  success(content: string, title: string = 'Success') {
    return this.simpleDialog(content, title, 'modal-success');
  }

  /**
   * Show a info dialog modal.
   * @param content content
   * @param title title
   */
  info(content: string, title: string = 'Info') {
    return this.simpleDialog(content, title, 'modal-info');
  }

  delete(id: string) {
    return this.confirmDialog(`Are you sure?`, `Removing ${id}`, 'modal-danger');
  }

  /**
   * Get error message from [HttpErrorResponse].
   * @param errResp HttpErrorResponse
   */
  private errorResponse(errResp: HttpErrorResponse | { error: ArrayBuffer | Object }): {
    error: string,
    message: string
  } {
    if (errResp.error instanceof ArrayBuffer) {
      const jsString = String.fromCharCode.apply(null, new Uint8Array(errResp.error));
      const json = JSON.parse(jsString);
      return json;
    } else if (errResp.error instanceof Object) {
      return errResp.error;
    } else if (errResp instanceof HttpErrorResponse) {
      return errResp;
    } else {
      return {
        error: 'Error',
        message: 'Unknown error.'
      };
    }
  }

  /**
   * Get current displaying modal dialog.
   */
  getCurrentModal() {
    return this.bsModalRef;
  }

}
