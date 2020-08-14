import { Injectable } from '@angular/core';
import { mimeTypes } from 'mime-wrapper';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class FileSaverService {

  constructor() { }

  /**
   * Save blob data as filename.
   * @param data blob data
   * @param fileName target file name
   * @param type mime type (omit for auto detection)
   */
  save(data: Blob, fileName: string = 'download', type?: string) {
    fileName = decodeURI(fileName);

    type = type || data.type || mimeTypes.getType(fileName) || 'application/octet-stream';
    FileSaver.saveAs(new Blob([data], { type: type }), fileName);
  }
}
