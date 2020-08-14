import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { withStyles } from '@material-ui/core/styles';
import styles from 'styles/jss/containers/vehicleSWUpdate';
import Footer from 'components/Footer';
import Alert from 'containers/Alert/Loadable';
import AppDecorator from 'containers/AppDecorator/Loadable';
import VehicleSidebar from '../VehicleSidebar/Loadable';
// import SoftwareManagement from './SoftwareManagement/Loadable';
import UpgradeSoftware from './UpgradeSoftware/Loadable';
import UpgradeSoftwareDetail from './UpgradeSoftwareDetail/Loadable';

class VehicleSoftwareUpdate extends React.Component {
  componentDidMount() {
    const { location } = this.props;
    const vehicleId = qs.parse(location.search)['?id'] || '';
    this.props.getData(vehicleId);
  }
  render() {
    const { classes, VehicleSWUpdate, changeStatusModal } = this.props;
    return (
      <AppDecorator>
        <Alert>
          <React.Fragment>
            <div className={classes.root}>
              <VehicleSidebar />
              <div className={classes.SWManagement}>
                <div className={classes.panels}>
                  {/* <SoftwareManagement /> */}
                  <UpgradeSoftware changeStatusModal={changeStatusModal} />
                </div>
                <Footer />
              </div>
            </div>
            <UpgradeSoftwareDetail
              check={VehicleSWUpdate.check}
              changeStatusModal={changeStatusModal}
            />
          </React.Fragment>
        </Alert>
      </AppDecorator>
    );
  }
}

VehicleSoftwareUpdate.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  getData: PropTypes.func.isRequired,
  VehicleSWUpdate: PropTypes.object.isRequired,
  changeStatusModal: PropTypes.func.isRequired,
};
export default withStyles(styles)(VehicleSoftwareUpdate);
