import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SecurityButton from 'components/SecurityButton';
import CardHeader from 'components/CardHeader';
import styles from 'styles/jss/containers/securityStatus';

export class SecurityStatus extends React.PureComponent {
  componentDidMount() {
    const { location, onGetSecurityStatus } = this.props;
    const vehicleId = qs.parse(location.search)['?id'] || '';
    onGetSecurityStatus(vehicleId);
  }
  render() {
    const { classes, securityStatus } = this.props;
    return (
      <React.Fragment>
        <Paper className={classes.root}>
          <Grid container className={classes.gridHeader}>
            {securityStatus.data.map(item => (
              <Grid key={item.id} className={classes.gridHeaderItem} item>
                <div className={classes.panels}>
                  <span className={classes.title}>
                    {item.securitySoftware.name}
                  </span>
                  <SecurityButton isActive={item.isActive} />
                </div>
              </Grid>
            ))}
          </Grid>
        </Paper>
        <Grid container className={classes.gridContent}>
          {securityStatus.data.map(item => (
            <Card key={item.id} className={classes.card}>
              {item.isActive ? (
                <React.Fragment>
                  <CardHeader
                    type="security"
                    title={item.securitySoftware.name}
                  />
                  <CardContent className={classes.cardContent}>
                    {item.securitySettingConfig.map(configItem => (
                      <div key={configItem.id} className={classes.item}>
                        <span className={classes.title}>
                          {configItem.securitySetting.name}:
                        </span>
                        <SecurityButton isActive={configItem.isActive} />
                      </div>
                    ))}
                  </CardContent>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <CardHeader
                    type="security"
                    className={classes.headerDisable}
                    title={item.securitySoftware.name}
                  />
                  <CardContent className={classes.cardContent}>
                    {item.securitySettingConfig.map(configItem => (
                      <div key={configItem.id} className={classes.item}>
                        <span className={classes.title}>
                          {configItem.securitySetting.name}:
                        </span>
                        <SecurityButton
                          className={classes.buttonDisable}
                          isActive={configItem.isActive}
                        />
                      </div>
                    ))}
                  </CardContent>
                </React.Fragment>
              )}
            </Card>
          ))}
        </Grid>
      </React.Fragment>
    );
  }
}

SecurityStatus.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object,
  securityStatus: PropTypes.object.isRequired,
  onGetSecurityStatus: PropTypes.func.isRequired,
};

export default withStyles(styles)(SecurityStatus);
