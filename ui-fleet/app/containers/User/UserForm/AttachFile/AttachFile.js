/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 08:49:02 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-12 10:00:21
 */
import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from 'assets/images/ic-delete.png';
import DownloadIcon from 'assets/images/ic-download.png';
import { withStyles, Button as ButtonMaterial } from '@material-ui/core';
import styles from 'styles/jss/containers/userForm';
import Button from 'components/Button';
import PanelTitle from 'components/PanelTitle';
import { ShowNotify } from 'utils/actionUtils';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';

class AttachFile extends React.PureComponent {
  CheckImage = file => {
    const { ChangeImage, UploadFilesImage } = this.props;
    const reader = new FileReader();
    if (file !== undefined) {
      const [image, type] = file.type.split('/');
      if (image === 'image' && file.size <= 5245329) {
        if (type === 'png' || type === 'jpeg') {
          reader.onloadend = () => {
            ChangeImage(file, reader.result);
            UploadFilesImage(file);
          };
        } else {
          ShowNotify('warning', 'Please choose type of image is PNG or JPEG');
        }
      } else if (image === 'image' && file.size > 5245329) {
        ShowNotify('warning', 'Image maxsize is 5Mb');
      } else {
        ShowNotify('warning', 'Image is incorrect');
      }
      reader.readAsDataURL(file);
    }
  };
  handleImageChange = e => {
    e.preventDefault();
    for (let i = 0; i <= e.target.files.length; i += 1) {
      this.CheckImage(e.target.files[i]);
    }

    document.getElementById('files').value = '';
  };
  handleDeleteImageAttach = index => {
    const { files, dataImage } = this.props.attachment;
    files.splice(index, 1);
    dataImage.splice(index, 1);
    this.props.updateAttachmentList(files, dataImage);
  };
  displayAttachmentFiles() {
    const { classes, attachment } = this.props;
    return attachment.dataImage.map((item, index) => (
      <div key={item.name} className={classes.images}>
        <div className={classes.imageItem}>
          <div className={classes.imageItemConten}>
            <img src={item.url} className={classes.imageSize} alt="img" />
            <div className={classes.text}>{item.name}</div>
          </div>
          <div className={classes.imageItemButton}>
            <a href={item.url} download={item.name}>
              <ButtonMaterial className={classes.imageItemButtonDownload}>
                <img
                  src={DownloadIcon}
                  className={classes.imageButtonSize}
                  alt="download"
                />
              </ButtonMaterial>
            </a>
            <ButtonMaterial
              className={`${classes.imageItemButtonDownload} ${
                classes.imageItemButtonDelete
              }`}
              onClick={() => this.handleDeleteImageAttach(index)}
            >
              <img
                src={DeleteIcon}
                className={classes.imageButtonSize}
                alt="delete"
              />
            </ButtonMaterial>
          </div>
        </div>
      </div>
    ));
  }
  render() {
    const { classes, attachment } = this.props;
    return (
      <React.Fragment>
        <div className={classes.header}>
          <div className={classes.titleHeader}>
            <PanelTitle
              title={<FormattedMessage {...messages.attachmentFiles} />}
              subtitle={2}
            />
          </div>
          <div className={classes.buttonItem}>
            <Button
              variant="primary"
              className={`${classes.button} ${classes.buttonUpload}`}
            >
              <FormattedMessage {...messages.buttonUpload} />
            </Button>
            <input
              className={classes.chooseImg}
              id="files"
              type="file"
              accept="image/png, image/jpeg"
              multiple
              onChange={e => this.handleImageChange(e)}
            />
          </div>
        </div>
        <div className={`${classes.itemFormContent} ${classes.attachFile}`}>
          {attachment.dataImage[0] ? this.displayAttachmentFiles() : ''}
        </div>
      </React.Fragment>
    );
  }
}

AttachFile.propTypes = {
  classes: PropTypes.object.isRequired,
  attachment: PropTypes.object.isRequired,
  ChangeImage: PropTypes.func.isRequired,
  UploadFilesImage: PropTypes.func.isRequired,
  updateAttachmentList: PropTypes.func.isRequired,
};

export default withStyles(styles)(AttachFile);
