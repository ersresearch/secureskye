import { createAsyncTypes } from 'utils/actionUtils';
const PREFIX = 'OTA_FORM_';

export const actionTypes = {
  GET_OTA_DETAIL: createAsyncTypes(`${PREFIX}GET_OTA_DETAIL`),
  READ_OTA_FILE: `${PREFIX}READ_OTA_FILE`,
  UPLOAD_OTA_FILE: createAsyncTypes(`${PREFIX}UPLOAD_OTA_FILE`),
  UPDATE_OTA_NAME: createAsyncTypes(`${PREFIX}UPDATE_OTA_NAME`),
  RELEASE_OTA: createAsyncTypes(`${PREFIX}RELEASE_OTA`),
  RESET_OTA_DETAIL: `${PREFIX}RESET_OTA_DETAIL`,
};
