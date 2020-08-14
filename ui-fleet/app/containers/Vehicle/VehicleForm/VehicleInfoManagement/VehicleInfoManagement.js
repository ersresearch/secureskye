/**
 *
 * VehicleInfoManagement
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core';
import { ApiGatewayUrl } from 'commons/constants';
import styles from 'styles/jss/containers/vehicleInfoManagement';
import IconFile from 'assets/images/icon_file.png';
import Button from 'components/Button';
import qs from 'qs';
import { ShowNotify } from 'utils/actionUtils';
import messages from './../../messages';

let file = {};
export class VehicleInfoManagement extends React.PureComponent {
  handleImageChange(e) {
    const { onChangeImage } = this.props;
    e.preventDefault();
    const reader = new FileReader();
    [file] = e.target.files;
    const [image, type] = e.target.files[0].type.split('/');
    if (image === 'image' && file.size <= 5245329) {
      if (type === 'png' || type === 'jpeg') {
        reader.onloadend = () => {
          onChangeImage(file, reader.result);
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
  render() {
    const { classes, location } = this.props;
    const { imageURL, imageURLInit } = this.props.VehicleManagement;
    const ID = qs.parse(location.search)['?id'] || '';
    let image = '';
    let $imagePreview = null;
    if (ID === 'register') {
      image = imageURLInit;
      if (image) {
        $imagePreview = (
          <img
            className={classes.imgCar}
            alt="car"
            src={image !== `${ApiGatewayUrl}undefined` ? image : null}
          />
        );
      } else {
        $imagePreview = (
          <div className={classes.notChooseImg}>
            <span className={classes.txtChooseImg}>
              <div className={classes.wrapperIcon}>
                <img className={classes.iconFile} alt="car" src={IconFile} />
                <FormattedMessage {...messages.notChooseImg} />
              </div>
            </span>
          </div>
        );
      }
    } else {
      image = imageURL;
      $imagePreview = (
        <img
          className={classes.imgCar}
          alt="car"
          src={image !== `${ApiGatewayUrl}undefined` ? image : IconFile}
        />
      );
    }

    return (
      <div className={classes.wrapper}>
        <div className={classes.uploadImage}>
          {$imagePreview}
          <div className={classes.updateBtnWrapper}>
            <Button variant="secondary" className={classes.btnUpload}>
              <FormattedMessage {...messages.chooseImg} />
            </Button>
            <input
              className={classes.chooseImg}
              type="file"
              accept="image/png, image/jpeg"
              onChange={e => this.handleImageChange(e)}
            />
          </div>
        </div>
      </div>
    );
  }
}

VehicleInfoManagement.propTypes = {
  onChangeImage: PropTypes.func.isRequired,
  VehicleManagement: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withStyles(styles)(VehicleInfoManagement);
