import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { withStyles, Card, CardContent } from '@material-ui/core';
import styles from 'styles/jss/containers/vehicleECUSidebar';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class ECUSidebar extends React.PureComponent {
  render() {
    const { classes, ECUSoftwareUpdate } = this.props;
    const { data } = ECUSoftwareUpdate;
    return (
      <Card className={classes.root}>
        <CardContent className={classes.cardContent}>
          <div className={classes.titleSidebar}>
            <FormattedMessage {...messages.title} />
          </div>
          <div className={classes.detailSidebar}>
            <div className={classes.infor}>
              <div className={classes.colLeft}>
                <span className={classes.textLeft}>
                  <FormattedMessage {...messages.ecuId} />
                </span>
              </div>
              <div className={classes.colRight}>
                <span className={classes.textRight}>
                  {data.interfaceInfo !== undefined ? (
                    data.displayName || <FormattedMessage {...messages.empty} />
                  ) : (
                    <span className={classes.empty}>
                      {<FormattedMessage {...messages.empty} />}
                    </span>
                  )}
                </span>
              </div>
            </div>
            <div className={classes.infor}>
              <div className={classes.colLeft}>
                <span className={classes.textLeft}>
                  <FormattedMessage {...messages.ip} />
                </span>
              </div>
              <div className={classes.colRight}>
                <span className={classes.textRight}>
                  {data.gatewayInterfaceInfo !== undefined ? (
                    data.gatewayInterfaceInfo.ip || (
                      <FormattedMessage {...messages.empty} />
                    )
                  ) : (
                    <span className={classes.empty}>
                      {<FormattedMessage {...messages.empty} />}
                    </span>
                  )}
                </span>
              </div>
            </div>
            <div className={classes.infor}>
              <div className={classes.colLeft}>
                <span className={classes.textLeft}>
                  <FormattedMessage {...messages.commProtocol} />
                </span>
              </div>
              <div className={classes.colRight}>
                <span className={classes.textRight}>
                  {data.interfaceInfo !== undefined ? (
                    _.upperFirst(
                      _.lowerCase(data.interfaceInfo.commProtocol),
                    ) || <FormattedMessage {...messages.empty} />
                  ) : (
                    <span className={classes.empty}>
                      {<FormattedMessage {...messages.empty} />}
                    </span>
                  )}
                </span>
              </div>
            </div>
            <div className={classes.infor}>
              <div className={classes.colLeft}>
                <span className={classes.textLeft}>
                  <FormattedMessage {...messages.error} />
                </span>
              </div>
              <div className={classes.colRight}>
                <span className={classes.textRight}>
                  {data.securityStatus !== undefined ? (
                    _.upperFirst(_.lowerCase(data.securityStatus)) || (
                      <FormattedMessage {...messages.empty} />
                    )
                  ) : (
                    <span className={classes.empty}>
                      {<FormattedMessage {...messages.empty} />}
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}

ECUSidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  ECUSoftwareUpdate: PropTypes.object.isRequired,
};

export default withStyles(styles)(ECUSidebar);
