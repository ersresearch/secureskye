import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageResponse } from '../model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  static readonly MAX_AVATAR_FILE_SIZE = 5 * 1024 * 1024;
  static readonly MAX_WIDTH = 2048;
  static readonly MAX_HEIGHT = 2048;

  validate(file): Observable<ImageResponse> {
    const image = new ImageResponse();
    return this.readImageFile(file);
  }
  getImageBase64String(imageBase64Source: string) {
    return /[^,]+$/.exec(imageBase64Source)[0];
  }

  /**
   * Get image source base on Base64 string and image type
   * @param base64String image Base64 string
   * @param imageType image type
   */
  getImageSrc(base64String: string, imageType: string) {
    if (!base64String || !imageType) {
      return null;
    }

    return 'data:image/' + imageType + ';base64,' + base64String;
  }

  /**
   * read image inpunt file
   * @param file input file
   */
  private readImageFile(file): Observable<ImageResponse> {
    return new Observable(observer => {
      const image = new ImageResponse();
      // check file size
      if (file.size > ImageService.MAX_AVATAR_FILE_SIZE) {
        observer.error('Avatar must be less than 4mb, please choose another photo.');
        observer.complete();
      } else {
        // create File Reader to load the image
        const reader = new FileReader(); // CREATE AN NEW INSTANCE.
        reader.readAsDataURL(file);

        // load the file
        reader.onload = (ev) => this.loadReader(ev, image).subscribe((imgResp) => {
          observer.next(imgResp);
          observer.complete();
        }, (err) => {
          observer.error(err);
          observer.complete();
        });
      }
    });
  }

  /**
   * Load file by reader
   * @param event `load` event of reader
   * @param imgResp Image response model
   */
  private loadReader(event, imgResp: ImageResponse): Observable<ImageResponse> {
    return new Observable(observer => {
      const img = new Image();
      if (event.target.result) {
        img.src = event.target.result;
      }

      // check wheter the image can be loaded
      // image onload event
      img.onload = () => {
        // get image width, height
        const width = img['width'];
        const height = img['height'];

        // check width and height
        if (!width || !height || width > ImageService.MAX_WIDTH || height > ImageService.MAX_HEIGHT) {
          observer.error('Image dimensions exceed ' + ImageService.MAX_WIDTH + ' x ' + ImageService.MAX_HEIGHT);
        } else {
          const avatarFormat = /\/(.*);/.exec(img['src'])[1];
          imgResp.src = img['src'];
          imgResp.type = avatarFormat;
          observer.next(imgResp);
        }
        observer.complete();
      };

      // image load error event
      img.onerror = function (error) {
        observer.error('Your photo is crashed or not supported');
        observer.complete();
      };
    });
  }

}
