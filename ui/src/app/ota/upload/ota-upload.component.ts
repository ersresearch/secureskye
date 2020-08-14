import { Component, OnInit } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { LoginService } from '../../login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OtaService } from '../ota.service';

@Component({
  selector: 'app-ota-upload',
  templateUrl: './ota-upload.component.html',
  styleUrls: ['./ota-upload.component.scss']
})
export class OtaUploadComponent implements OnInit {

  /**
   * Max file size in bytes
   */
  static readonly MAX_FILE_SIZE = 10 * 1024 * 1024 * 1024;
  /**
   * Max upload retries
   */
  static readonly MAX_RETRY = 5;
  /**
   * Allowed mime types
   */
  static readonly ALLOWED_OTA_MIME_TYPE = ['application/x-zip-compressed', 'application/x-gzip', 'application/zip', 'application/gzip'];

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
   * OTA Id after file update succeed
   */
  otaId;
  /**
   * File uploading retry count
   */
  retryCount = 0;

  constructor(
    private oauthService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.uploader = new FileUploader({
      url: OtaService.ENDPOINT_OTA,
      allowedMimeType: OtaUploadComponent.ALLOWED_OTA_MIME_TYPE,
      headers: [{ name: 'Authorization', value: this.oauthService.authorizationHeader() }],
      maxFileSize: OtaUploadComponent.MAX_FILE_SIZE
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
    if (this.validateOTAImage(e)) {
      this.uploader.clearQueue();
      this.uploader.addToQueue(e);
    }
  }

  /**
   * Implement onFileDrop event
   * @param e event
   */
  dropFile(e: any) {
    if (this.validateOTAImage(e)) {
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
  validateOTAImage(fileList: FileList | File[]): boolean {
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
    if (!this.validateOTAImage(items)) {
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
      if (self.retryCount < OtaUploadComponent.MAX_RETRY) {
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
   * Implement onWhenAddingFileFailed event of Fileuploader.uploadAll()er
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
    this.otaId = JSON.parse(response);
    this.router.navigate(['..', this.otaId], { relativeTo: this.route, replaceUrl: true });
  }

  /**
   * Implement onChange event of OTA file input
   */
  onFileChange() {
    // clear ota id of last success response
    this.otaId = null;
  }
}
