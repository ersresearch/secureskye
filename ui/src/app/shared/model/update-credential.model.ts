import { vehicle } from './protoBundle';

import * as Moment from 'moment';
import * as Long from 'long';

/**
 * Model use to update Credential
 */
export class UpdateCredential {
  /**
   * User password
   */
  password?: string;

  /**
   * Is user enable
   */
  enabled?: Boolean;

  /**
   * User display name
   */
  displayName?: string;

  /**
   * User avatar
   */
  avatar?: string;

  /**
   * User avatar format
   */
  avatarFormat: string;

  /**
   * Avatar from 3rd party source
   */
  avatarThirdParty: boolean;

  /**
   * User firstname
   */
  firstName?: string;

  /**
   * User lastname
   */
  lastName?: string;

  /**
   * User middlename
   */
  middleName?: string;

  /**
   * User email
   */
  email?: string;

  /**
   * User roles
   */
  roles?: any;

  constructor(enabled?: Boolean, displayName?: string, avatar?: string, avatarFormat?: string, avatarThirdParty?: boolean,
    firstName?: string, lastName?: string, middleName?: string, email?: string, password?: string) {
    const self = this;

    // update from params
    self.password = password;
    self.enabled = enabled;
    self.displayName = displayName;
    self.avatar = avatar;
    self.avatarFormat = avatarFormat;
    self.avatarThirdParty = avatarThirdParty;
    self.firstName = firstName;
    self.lastName = lastName;
    self.middleName = middleName;
    self.email = email;
  }
}
