/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 08:50:20 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-11-29 13:35:50
 */
import { fromJS } from 'immutable';
import { actionTypes } from './constants';

export const initialState = fromJS({
  files: [],
  dataImage: [],
});

function AttachmentReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_IMG:
      return state.update('dataImage', dataImage =>
        dataImage.concat(action.dataImage),
      );
    case actionTypes.GET_IMAGE.SUCCESS: {
      const files = state.get('files').toJS();
      const dataImage = state.get('dataImage').toJS();
      dataImage.push(action.payload.dataImage);
      files.push(action.payload.files);
      return state.merge({
        files: fromJS(files),
        dataImage: fromJS(dataImage),
      });
    }
    case actionTypes.UPLOAD_FILES_IMAGE:
      return state.update('files', files => files.concat(action.file));
    case actionTypes.UPDATE_ATTACHMENT_FILE_LIST:
    case actionTypes.RESET_DATA_UPDATE:
      return state.merge({
        files: action.payload.files,
        dataImage: action.payload.dataImage,
      });
    case actionTypes.RESET_DATA:
      return state.merge({ files: [], dataImage: [] });
    default:
      return state;
  }
}
export default AttachmentReducer;
