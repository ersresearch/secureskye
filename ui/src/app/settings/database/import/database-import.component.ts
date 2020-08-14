import { Component, OnInit } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { GlobalDialogService } from '../../../shared/service';
import { DatabaseService } from '../database.service';
import { LoginService } from '../../../login/login.service';

@Component({
  selector: 'app-database-import',
  templateUrl: './database-import.component.html',
  styleUrls: ['./database-import.component.scss']
})
export class DatabaseImportComponent implements OnInit {
  /**
   * Constant
   */
  static readonly MAX_FILE_SIZE = 10 * 1024 * 1024 * 1024;
  static readonly MAX_RETRY = 5;
  /**
   * Mime type allowed
   */
  static readonly ALLOWED_MIME_TYPE = ['application/x-zip-compressed', 'application/x-gzip', 'application/zip', 'application/gzip'];
  /**
   * Error message
   */
  errorMsg: string;
  /**
   * File uploader object
   */
  uploader: FileUploader;
  /**
   * Check state of drop zone
   */
  hasBaseDropZoneOver = false;
  /**
   * File Id after file update succeed
   */
  fileId;
  /**
   * File uploading retry count
   */
  retryCount = 0;

  constructor(
    private oauthService: LoginService,
    private router: Router,
    private globalDialogService: GlobalDialogService
  ) { }

  ngOnInit() {
    this.uploader = new FileUploader({
      url: DatabaseService.ENDPOINT_IMPORT,
      allowedMimeType: DatabaseImportComponent.ALLOWED_MIME_TYPE,
      headers: [{ name: 'Authorization', value: this.oauthService.authorizationHeader() }],
      maxFileSize: DatabaseImportComponent.MAX_FILE_SIZE
    });

    this.uploader.onAfterAddingAll = (items) => this.onAfterAddingAll(items);
    this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
    this.uploader.onWhenAddingFileFailed = (item, filter, options) => this.onWhenAddingFileFailed(item, filter, options);

    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
  }

  /**
   * Implement fileOver event
   * @param e event
   */
  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  /**
   * Implement onFileSelected event
   * @param e event
   */
  selectFile(e: any) {
    if (this.validateImportFile(e)) {
      this.uploader.clearQueue();
      this.uploader.addToQueue(e);
    }
  }

  /**
   * Implement onFileDrop event
   * @param e event
   */
  dropFile(e: any) {
    if (this.validateImportFile(e)) {
      this.selectFile(e);
    }
  }

  /**
   * Check at least 1 file is selected
   */
  hasSelectedFile(): boolean {
    return this.uploader.queue.length > 0;
  }

  /**
   * Validate selected files
   * @param fileList processing files
   */
  validateImportFile(fileList: any): boolean {
    if (fileList.length > 1) {
      this.errorMsg = 'Please select only 1 file';
      return false;
    }

    return true;
  }

  /**
   * Implement onAfterAddingAll event of FileUploader
   * @param item processing files
   */
  onAfterAddingAll(items: any) {
    this.errorMsg = null;
    if (!this.validateImportFile(items)) {
      for (const item of items) {
        this.uploader.removeFromQueue(item);
      }
    }
  }

  /**
   * Implement onErrorItem event of FileUploader
   * @param item processing file
   * @param responseString response from server
   * @param status response status code
   * @param headers response header
   */
  onErrorItem(item, responseString, status, headers) {
    const self = this;
    if (status === 401) {
      // check retry count
      if (self.retryCount < DatabaseImportComponent.MAX_RETRY) {
        self.oauthService.refreshToken()
          .then(function () {
            // Refresh succeeds
            self.uploader.options.headers = [{
              name: 'Authorization',
              value: self.oauthService.authorizationHeader()
            }];
            self.refreshFileState(self.uploader.queue[0]);
            self.uploader.uploadAll();
          }).catch((refreshErr) => {
            // Refresh fails
            self.errorMsg = 'Unexpected error, please report for your Adminstrator!';
          });
      } else {
        // Refresh fails
        self.oauthService.invalidateSession();
      }
    } else {
      try {
        const response = JSON.parse(responseString);
        if (response && (response.error || response.message)) {
          this.errorMsg = (response.error || response.message);
        } else {
          this.errorMsg = 'Unknown error. Please contact the Administrator.';
        }
      } catch (e) {
        this.errorMsg = 'Unknown error. Please contact the Administrator.';
      }
    }
  }

  /**
   * Implement onWhenAddingFileFailed event of FileUploader
   * @param item processing file
   * @param filter error catched by filter
   * @param options item option
   */
  onWhenAddingFileFailed(item, filter, options) {
    if (filter && filter.name) {
      switch (filter.name) {
        case 'fileSize': {
          this.errorMsg = 'Please choose the file less than 10 MB';
          break;
        }
        case 'mimeType': {
          this.errorMsg = `Please choose the file with '.zip', '.tar.gz' extension`;
          break;
        }
        default: this.errorMsg = 'Unexpected error, please check your file and try again!';
      }
    } else {
      this.errorMsg = 'Unexpected error, please check your file and try again!';
    }
  }

  /**
   * Reset state for file
   * @param fileItem processing file
   */
  refreshFileState(fileItem: FileItem) {
    if (fileItem) {
      fileItem.isError = false;
      fileItem.isSuccess = false;
      fileItem.isUploaded = false;
      fileItem.isUploading = false;
    }
  }

  /**
   * Implement onSuccessItem event of FileUploader
   * @param item processing file
   * @param response response from server
   * @param status response status code
   * @param headers response header
   */
  onSuccessItem(item, response, status, headers) {
    this.globalDialogService.success('Import succeed', 'Succeed');
  }

  /**
   * Implement onChange event of file input
   */
  onFileChange() {
    // clear file id of last success response
    this.fileId = null;
  }
}
