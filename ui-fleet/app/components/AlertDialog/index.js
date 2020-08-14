/**
 *
 * AlertDialog
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

class AlertDialog extends React.PureComponent {
  render() {
    const {
      check,
      handleChooseCar,
      type,
      handleDelete,
      cancleDelete,
      title,
      description,
    } = this.props;
    let action;
    switch (type) {
      case 'selectVehicle':
        action = (
          <Button onClick={handleChooseCar} color="primary" autoFocus>
            <FormattedMessage {...messages.messageInButton} />
          </Button>
        );
        break;
      case 'confirmation':
        action = (
          <React.Fragment>
            <Button onClick={handleDelete} color="primary" autoFocus>
              <FormattedMessage {...messages.yesButton} />
            </Button>
            <Button onClick={cancleDelete} color="primary" autoFocus>
              <FormattedMessage {...messages.noButton} />
            </Button>
          </React.Fragment>
        );
        break;
      default:
        break;
    }
    return (
      <Dialog
        open={check}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>{action}</DialogActions>
      </Dialog>
    );
  }
}

AlertDialog.propTypes = {
  check: PropTypes.bool,
  handleChooseCar: PropTypes.func,
  type: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  handleDelete: PropTypes.func,
  cancleDelete: PropTypes.func,
};

export default AlertDialog;
