/*
 * @Author: NhuHH 
 * @Date: 2018-11-28 08:50:15 
 * @Last Modified by: DanND1
 * @Last Modified time: 2018-12-05 15:15:48
 */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import styles from 'styles/jss/containers/ota';
import Footer from 'components/Footer/index';
import CardHeader from 'components/CardHeader';
import OTAPackage from './OTAPackage/Loadable';
import OTAForm from './OTAForm/Loadable';
import messages from './messages';

export class OTA extends React.PureComponent {
  render() {
    const { classes, match } = this.props;
    const { direction } = match.params;
    const title = direction ? `${direction}OTA` : 'otaList';
    const type = direction ? null : 'list';
    return (
      <div className={classes.root}>
        <div className={classes.panels}>
          <Card className={classes.card}>
            <CardHeader
              type={type}
              title={<FormattedMessage {...messages[title]} />}
            />
            <CardContent className={classes.cardContent}>
              {direction ? <OTAForm /> : <OTAPackage />}
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }
}

OTA.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object,
};

export default withStyles(styles)(OTA);
