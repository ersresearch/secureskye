import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/Header/Loadable';
import MenuTabs from 'components/MenuTabs/Loadable';
import { UrlPath } from 'commons/constants';

class MenuBar extends React.PureComponent {
  handleCheckLocation = () => {
    const { route, handleChangeTabInHeader, handleChangeTab } = this.props;
    switch (route.location.pathname) {
      case `${UrlPath}/fleet-dashboard`:
      default:
        handleChangeTabInHeader(0);
        handleChangeTab(0);
        break;
      case `${UrlPath}/fleet-vehicle`:
        handleChangeTabInHeader(0);
        handleChangeTab(1);
        break;
      case `${UrlPath}/vehicle-view`:
        handleChangeTabInHeader(1);
        handleChangeTab(0);
        break;
      case `${UrlPath}/vehicle-alert`:
        handleChangeTabInHeader(1);
        handleChangeTab(1);
        break;
      case `${UrlPath}/vehicle-software-update`:
      case `${UrlPath}/ecu-software-update-detail`:
        handleChangeTabInHeader(1);
        handleChangeTab(2);
        break;
      case `${UrlPath}/vehicle-security`:
        handleChangeTabInHeader(1);
        handleChangeTab(3);
        break;
      case `${UrlPath}/vehicle-list`:
      case `${UrlPath}/vehicle`:
        handleChangeTabInHeader(2);
        handleChangeTab(0);
        break;
      case `${UrlPath}/user-list`:
      case `${UrlPath}/user`:
        handleChangeTabInHeader(2);
        handleChangeTab(1);
        break;
      case `${UrlPath}/role`:
      case `${UrlPath}/role/create`:
      case `${UrlPath}/role/update`:
        handleChangeTabInHeader(2);
        handleChangeTab(2);
        break;
      case `${UrlPath}/ota`:
      case `${UrlPath}/ota/create`:
      case `${UrlPath}/ota/update`:
      case `${UrlPath}/ota/view`:
        handleChangeTabInHeader(2);
        handleChangeTab(3);
        break;
    }
  };
  componentDidMount() {
    this.handleCheckLocation();
  }
  componentDidUpdate() {
    this.handleCheckLocation();
  }
  render() {
    const {
      route,
      handleChangeTabInHeader,
      menuBar,
      login,
      handleChangeTab,
      vehicleInfo,
      handleLogOut,
    } = this.props;
    let check = false;
    switch (route.location.pathname) {
      case `${UrlPath}/fleet-dashboard`:
      case `${UrlPath}/fleet-vehicle`:
      case `${UrlPath}/vehicle-view`:
      case `${UrlPath}/vehicle-alert`:
      case `${UrlPath}/vehicle-software-update`:
      case `${UrlPath}/ecu-software-update-detail`:
      case `${UrlPath}/vehicle-security`:
      case `${UrlPath}/vehicle-update`:
      case `${UrlPath}/vehicle-list`:
      case `${UrlPath}/vehicle`:
      case `${UrlPath}/user-list`:
      case `${UrlPath}/user`:
      case `${UrlPath}/role`:
      case `${UrlPath}/role/create`:
      case `${UrlPath}/role/update`:
      case `${UrlPath}/ota`:
      case `${UrlPath}/ota/create`:
      case `${UrlPath}/ota/update`:
      case `${UrlPath}/ota/view`:
        check = true;
        break;
      default:
        break;
    }
    if (login.idToken === null || !check) {
      return <React.Fragment />;
    }

    return (
      <React.Fragment>
        <Header
          vehicleId={vehicleInfo.data.id}
          handleChangeTabInHeader={handleChangeTabInHeader}
          tabIndexInHeader={menuBar.tabIndexInHeader}
          displayName={login.userDetail && login.userDetail.lastName}
          handleLogOut={handleLogOut}
        />
        <div>
          <MenuTabs
            vehicleId={vehicleInfo.data.id}
            handleChangeTab={handleChangeTab}
            tabIndexInHeader={menuBar.tabIndexInHeader}
            tabIndex={menuBar.tabIndex}
            pathname={route.location.pathname}
          />
        </div>
      </React.Fragment>
    );
  }
}

MenuBar.propTypes = {
  menuBar: PropTypes.object,
  route: PropTypes.object,
  login: PropTypes.object,
  handleChangeTabInHeader: PropTypes.func,
  handleChangeTab: PropTypes.func,
  vehicleInfo: PropTypes.object,
  handleLogOut: PropTypes.func,
};

export default MenuBar;
