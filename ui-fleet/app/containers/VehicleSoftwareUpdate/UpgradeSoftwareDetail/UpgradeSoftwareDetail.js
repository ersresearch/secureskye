/* eslint-disable jsx-a11y/anchor-is-valid */
/*
 * @Author: NhuHH 
 * @Date: 2018-11-28 07:56:27 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-12 10:17:49
 */
import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { withStyles, Card, Modal, Popover } from '@material-ui/core';
import styles from 'styles/jss/containers/upgradeDetail';
import { DateFormatSoftware } from 'utils/timeStampUtil';
import Button from 'components/Button';
import CardHeaderComponent from 'components/CardHeader';
import messages from './messages';

const NA = '';
export class UpgradeSoftwareDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { anchorEl: null, data: {}, type: '' };
  }
  componentWillUnmount() {
    this.setState({
      anchorEl: null,
      data: {},
      type: '',
    });
  }
  displayInformation = data => {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.item}>
          <div className={classes.itemLeft}>
            <FormattedMessage {...messages.name} />
          </div>
          <div className={classes.itemRight}>{data.name || NA}</div>
        </div>
        <div className={classes.item}>
          <div className={classes.itemLeft}>
            <FormattedMessage {...messages.family} />
          </div>
          <div className={classes.itemRight}>{data.family || NA}</div>
        </div>
        <div className={classes.item}>
          <div className={classes.itemLeft}>
            <FormattedMessage {...messages.category} />
          </div>
          <div className={classes.itemRight}>{data.category || NA}</div>
        </div>
        <div className={classes.item}>
          <div className={classes.itemLeft}>
            <FormattedMessage {...messages.date} />
          </div>
          <div className={classes.itemRight}>
            {DateFormatSoftware(data.date) || NA}
          </div>
        </div>
        <div className={classes.item}>
          <div className={classes.itemLeft}>
            <FormattedMessage {...messages.ecus} />
          </div>
          <div className={classes.itemRight}>{data.ecus.length || NA}</div>
        </div>
      </React.Fragment>
    );
  };
  displayECU = data => {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      !_.isEmpty(data) &&
      data.map(item => (
        <div key={item.id} className={classes.ecuInformation}>
          <div className={classes.ecuId}>
            <div className={`${classes.color} ${classes.colorEcu}`} />
            <button
              aria-owns={open ? 'simple-popper' : undefined}
              aria-haspopup="true"
              variant="contained"
              className={`${classes.title} ${classes.ecuIdTitle}`}
              onClick={this.handleClick('ecu', item)}
            >
              id: {item.id}
            </button>
          </div>
          {!_.isEmpty(item.items) ? this.displayFiles(item.items) : <div />}
        </div>
      ))
    );
  };
  displayFiles = data => {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      !_.isEmpty(data) &&
      data.map(item => (
        <div key={item.id} className={classes.files}>
          <div className={classes.file}>
            <div className={`${classes.color} ${classes.colorFile}`} />
            <button
              aria-owns={open ? 'simple-popper' : undefined}
              aria-haspopup="true"
              variant="contained"
              className={`${classes.title} ${classes.fileTitle}`}
              onClick={this.handleClick('file', item)}
            >
              {item.name}
            </button>
          </div>
        </div>
      ))
    );
  };
  handleClick = (type, item) => event => {
    this.setState({
      anchorEl: event.currentTarget,
      data: item,
      type,
    });
  };
  handleClose = () => {
    this.setState({
      anchorEl: null,
      data: {},
      type: '',
    });
  };
  checkData = data => (!_.isUndefined(data) ? data.length : '');
  displayContentPopover = () => {
    const { classes, downloadImageOTAPackage } = this.props;
    const { type, data } = this.state;
    return (
      <div className={classes.popover}>
        <div className={classes.popoverTitle}>
          {type === 'ecu' ? (
            <FormattedMessage {...messages.ecuTitle} />
          ) : (
            <FormattedMessage {...messages.imageTitle} />
          )}
        </div>
        <div className={classes.popoverContent}>
          <div className={classes.popoverItem}>
            <div className={classes.popoverItemLeft}>
              <FormattedMessage {...messages.id} />
            </div>
            <div className={classes.popoverItemRight}>{data.id}</div>
          </div>
          <div className={classes.popoverItem}>
            <div className={classes.popoverItemLeft}>
              {type === 'ecu' ? (
                <FormattedMessage {...messages.description} />
              ) : (
                <FormattedMessage {...messages.name} />
              )}
            </div>
            <div className={classes.popoverItemRight}>
              {type === 'ecu' ? data.description : data.name}
            </div>
          </div>
          <div className={classes.popoverItem}>
            <div className={classes.popoverItemLeft}>
              {type === 'ecu' ? (
                <FormattedMessage {...messages.version} />
              ) : (
                <FormattedMessage {...messages.checksum} />
              )}
            </div>
            <div className={classes.popoverItemRight}>
              {type === 'ecu' ? data.version || '' : data.checksum}
            </div>
          </div>
          <div className={classes.popoverItem}>
            <div className={classes.popoverItemLeft}>
              {type === 'ecu' ? (
                <FormattedMessage {...messages.items} />
              ) : (
                <FormattedMessage {...messages.url} />
              )}
            </div>
            <div className={classes.popoverItemRight}>
              {type === 'ecu' ? (
                this.checkData(data.items)
              ) : (
                <a id="downloadImage">
                  <Button
                    onClick={() => downloadImageOTAPackage(data.url, data.name)}
                    className={classes.buttonDownload}
                  >
                    <FormattedMessage {...messages.link} />
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  render() {
    const {
      classes,
      check,
      changeStatusModal,
      packageDetail,
      handleUpgradeOTAPackage,
    } = this.props;
    const { anchorEl, data } = this.state;
    const open = Boolean(anchorEl);
    const { location } = this.props;
    const vehicleId = qs.parse(location.search)['?id'] || '';
    return (
      <Modal open={check}>
        <Card className={classes.root}>
          <CardHeaderComponent
            type=""
            title={<FormattedMessage {...messages.title} />}
          />
          <div className={classes.modalContent}>
            <div className={classes.contentLeft}>
              {!_.isEmpty(packageDetail.dataOTA) &&
                this.displayInformation(packageDetail.dataOTA)}
            </div>
            <div className={classes.contentRight}>
              {!_.isEmpty(packageDetail.dataOTA.ecus) ? (
                this.displayECU(packageDetail.dataOTA.ecus)
              ) : (
                <div />
              )}
            </div>
          </div>
          <div className={classes.modalFooter}>
            <div className={classes.buttonFooter}>
              <Button
                variant="primary"
                className={classes.buttonUpgrade}
                onClick={() =>
                  handleUpgradeOTAPackage(packageDetail.dataOTA.id, vehicleId)
                }
              >
                <FormattedMessage {...messages.upgrade} />
              </Button>
              <Button
                variant="primary"
                onClick={() => changeStatusModal(false)}
              >
                <FormattedMessage {...messages.cancel} />
              </Button>
            </div>
          </div>
          <Popover
            id="simple-popper"
            open={open}
            anchorEl={anchorEl}
            onClose={this.handleClose}
          >
            {!_.isEmpty(data) ? this.displayContentPopover() : <div />}
          </Popover>
        </Card>
      </Modal>
    );
  }
}

UpgradeSoftwareDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  check: PropTypes.bool.isRequired,
  packageDetail: PropTypes.object.isRequired,
  changeStatusModal: PropTypes.func.isRequired,
  handleUpgradeOTAPackage: PropTypes.func.isRequired,
  downloadImageOTAPackage: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpgradeSoftwareDetail);
