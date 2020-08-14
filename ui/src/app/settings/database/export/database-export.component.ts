import { Component, ViewChild, OnInit } from '@angular/core';
import { GlobalDialogService, FileSaverService } from '../../../shared/service';
import { DatabaseService } from '../database.service';
import { HttpResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-database-export',
  templateUrl: './database-export.component.html',
  styleUrls: ['./database-export.component.scss']
})
export class DatabaseExportComponent implements OnInit {
  /**
   * Exporting format.
   */
  readonly EXPORT_FORMAT = ['json', 'yaml', 'xml'];
  /**
   * Export form.
   */
  exportForm: FormGroup;

  constructor(
    private globalDialogService: GlobalDialogService,
    private importExportService: DatabaseService,
    private fileSaverService: FileSaverService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.exportForm = this.fb.group({
      'exportFormat': ['json', [Validators.required]],
      'exportPassword': ['', [Validators.required]]
    });
  }

  export() {
    const self = this;

    if (self.exportForm.invalid) {
      Object.keys(self.exportForm.controls).forEach(field => self.exportForm.get(field).markAsTouched({ onlySelf: true }));
      return;
    }

    const exportFormat = self.exportForm.get('exportFormat').value;
    const exportPassword = self.exportForm.get('exportPassword').value;

    self.importExportService.exportDirect(exportFormat, exportPassword).subscribe(
      (resp: HttpResponse<Blob>) => {

        // get filename
        let filename;
        const contentDisposition = resp.headers.get('content-disposition');
        // match filename with regex
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(contentDisposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '');
        }

        self.fileSaverService.save(resp.body, filename);
      },
      (err) => {
        self.globalDialogService.error(err);
      });
  }

  /**
   * Form field validation classes.
   * @param field field name.
   */
  fieldValidationClass(field: string) {
    return {
      'is-invalid': this.exportForm.get(field).invalid && (this.exportForm.get(field).dirty || this.exportForm.get(field).touched),
      'is-valid': this.exportForm.get(field).valid && this.exportForm.get(field).dirty
    };
  }

  /**
   * Form field validation error check.
   * @param field fild name.
   * @param error error type.
   */
  fieldValidationError(field: string, error: string) {
    return this.exportForm.get(field).errors && this.exportForm.get(field).errors[error];
  }
}
