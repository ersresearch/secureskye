/*
 * @Author: NhuHH 
 * @Date: 2018-11-15 11:30:29 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-07 15:14:36
 */
import { actionTypes } from './constants';

export function getImage(image) {
  return {
    type: actionTypes.GET_IMAGE.REQUEST,
    payload: {
      image,
    },
  };
}

export function updateAttachmentList(files, dataImage) {
  return {
    type: actionTypes.UPDATE_ATTACHMENT_FILE_LIST,
    payload: {
      files,
      dataImage,
    },
  };
}
export function ChangeImage(file, imageURL) {
  const dataImage = [];
  const image = {
    name: file.name,
    url: imageURL,
  };
  dataImage.push(image);
  return {
    type: actionTypes.CHANGE_IMG,
    dataImage,
  };
}

export function UploadFilesImage(item) {
  const file = [];
  file.push(item);
  return {
    type: actionTypes.UPLOAD_FILES_IMAGE,
    file,
  };
}
export function resetDataAttachFile(file, dataImage) {
  return {
    type: actionTypes.RESET_DATA,
    payload: {
      file,
      dataImage,
    },
  };
}
