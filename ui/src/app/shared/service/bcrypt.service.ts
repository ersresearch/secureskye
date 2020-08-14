import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class BCryptService {
  static readonly SALT_WORK_FACTOR = 10;
  constructor() { }

  encrypt(rawStr: String) {
    return bcrypt.hashSync(rawStr, BCryptService.SALT_WORK_FACTOR);
  }
}
