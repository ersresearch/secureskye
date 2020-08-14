/**
 * Image model
 */
export class ImageResponse {
  /**
   * Image source
   */
  src?: string;

  /**
   * Image type
   */
  type?: string;

  constructor(src?: string, type?: string) {
    const self = this;

    // update from params
    self.src = src;
    self.type = type;
  }
}
