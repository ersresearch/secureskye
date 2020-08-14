/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 08:49:07 
 * @Last Modified by: DanND1
 * @Last Modified time: 2018-11-27 09:42:55
 */
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import AttachFile from './AttachFile';
import reducer from './reducer';
import { updateAttachmentList, ChangeImage, UploadFilesImage } from './actions';
import { makeAttachmentInformation } from './selectors';

const mapStateToProps = createStructuredSelector({
  attachment: makeAttachmentInformation(),
});
function mapDispatchToProps(dispatch) {
  return {
    ChangeImage: (file, url) => dispatch(ChangeImage(file, url)),
    UploadFilesImage: file => dispatch(UploadFilesImage(file)),
    updateAttachmentList: (files, image) =>
      dispatch(updateAttachmentList(files, image)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'attachment', reducer });
export default compose(
  withReducer,
  withConnect,
  withRouter,
)(AttachFile);
