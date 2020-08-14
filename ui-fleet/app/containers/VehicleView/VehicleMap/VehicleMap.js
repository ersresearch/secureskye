/*
 * @Author: DatNT62 
 * @Date: 2018-11-13 09:04:57 
 * @Last Modified by: DanND1
 * @Last Modified time: 2018-12-05 14:58:36
 */
import React from 'react';
import qs from 'qs';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import mapboxgl from 'components/MapComponent/index';
import classNames from 'classnames';
import { List, ListItem, Divider, withStyles, Button } from '@material-ui/core';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import styles from 'styles/jss/containers/vehicleMap';

import Item from './Item';
import message from './messages';

/* eslint-disable react/prefer-stateless-function */

let map;
let check = false;
let checkNode = false;
let theFirstTime = true;
let classNameForNav = 'navContainver';
let showList = true;
export class VehicleMap extends React.PureComponent {
  componentDidMount() {
    const vehicleId = qs.parse(this.props.location.search)['?id'] || '';
    setTimeout(() => {
      // console.log('join rooom');
      this.props.handleJoinDeviceDataRoom(vehicleId);
    }, 3000);
    this.props.handleGetAllMarkers(vehicleId);
    this.props.handleGetTheLatestPoint(vehicleId);
    const lng = 106.693980400000001;
    const lat = 10.8058294999999998;

    map = new mapboxgl.Map({
      container: this.mapContainerVehicleView,
      style: 'mapbox://styles/mapbox/dark-v9?optimize=true',
      center: [lng, lat],
      zoom: 18,
    });
  }
  componentWillUnmount() {
    const vehicleId = qs.parse(this.props.location.search)['?id'] || '';
    this.props.handleleaveDeviceDataRoom(vehicleId);
  }
  flyToMarker = (longitude, latitude, mapZoom) => {
    map.flyTo({
      center: [longitude, latitude],
      zoom: mapZoom,
    });
  };
  showOrHideList = () => {
    if (showList) {
      classNameForNav = 'hiddenNav';
    } else {
      classNameForNav = 'navContainver';
    }
    this.props.changeClassNameForNav(classNameForNav);
    showList = !showList;
  };
  render() {
    /* eslint arrow-body-style: ["error", "always"] */
    /* eslint-env es6 */
    const { classes, vehiclemap, vehicleView } = this.props;
    const returnCssForMarker = status => {
      let className;
      switch (status) {
        case 'WARNING':
          className = 'circle-marker-ripple-alert animation-alert-marker';
          break;
        case 'CRITICAL':
          className = 'circle-marker-ripple-critical animation-critical-marker';
          break;
        default:
          break;
      }
      return className;
    };

    if (vehiclemap.markers !== undefined) {
      if (vehiclemap.markers.length !== 0) {
        const arrayMarker = vehiclemap.markers.map(marker => {
          const { longitude, latitude } = marker.ecuAlertLocation;
          if (
            longitude > -180 &&
            longitude < 180 &&
            latitude > -90 &&
            latitude < 90
          ) {
            return {
              type: 'Feature',
              status: marker.alertType,
              geometry: {
                type: 'Point',
                coordinates: [
                  marker.ecuAlertLocation.longitude,
                  marker.ecuAlertLocation.latitude,
                ],
              },
            };
          }
          return null;
        });

        if (theFirstTime) {
          const theLastMarker =
            vehiclemap.markers[vehiclemap.markers.length - 1];
          const { longitude, latitude } = theLastMarker.ecuAlertLocation;
          if (
            longitude > -180 &&
            longitude < 180 &&
            latitude > -90 &&
            latitude < 90
          ) {
            this.flyToMarker(
              theLastMarker.ecuAlertLocation.longitude,
              theLastMarker.ecuAlertLocation.latitude,
              12,
            );
          }
          theFirstTime = false;
        }
        arrayMarker.map(marker => {
          const el = document.createElement('div');
          if (!_isEmpty(marker)) {
            el.className = returnCssForMarker(marker.status);
            const newMarker = new mapboxgl.Marker(el).setLngLat(
              marker.geometry.coordinates,
            );
            newMarker.addTo(map);
          }
          return null;
        });
      }
      if (vehiclemap.routes.length !== 0) {
        const { longitude, latitude } = vehiclemap.routes[
          vehiclemap.routes.length - 1
        ];
        if (
          longitude > -180 &&
          longitude < 180 &&
          latitude > -90 &&
          latitude < 90
        ) {
          if (!document.getElementById('last')) {
            const el = document.createElement('div');
            el.className = 'circle-marker-ripple-last animation-last-marker';
            el.setAttribute('id', 'last');
            const newMarker = new mapboxgl.Marker(el).setLngLat([
              longitude,
              latitude,
            ]);
            newMarker.addTo(map);
            this.flyToMarker(longitude, latitude, 12);
          } else {
            const el = document.getElementById('last');
            const newMarker = new mapboxgl.Marker(el).setLngLat([
              longitude,
              latitude,
            ]);
            newMarker.addTo(map);
            this.flyToMarker(longitude, latitude, 12);
          }
        }
      }

      const arrayCoordinates = vehiclemap.routes.map(marker => {
        return [marker.longitude, marker.latitude];
      });
      if (arrayCoordinates.length > 1) {
        if (map.isStyleLoaded()) {
          if (map.getLayer('route')) {
            const newData = {
              type: 'Feature',
              geometry: {
                coordinates: arrayCoordinates,
                type: 'LineString',
              },
            };
            map.getSource('route').setData(newData);
          } else {
            map.addLayer({
              id: 'route',
              type: 'line',
              source: {
                type: 'geojson',
                data: {
                  type: 'Feature',
                  geometry: {
                    coordinates: arrayCoordinates,
                    type: 'LineString',
                  },
                },
              },
              paint: {
                'line-width': 2,
                'line-color': '#0BD0FF',
              },
            });
          }
        }
      }
    }
    if (vehicleView.status !== undefined) {
      const Result = vehicleView.status;
      check = !Result.ROUTE;
      checkNode = Result.ALERT_NODE;
    }
    if (check) {
      return (
        <div className="mapContainerVehicleView">
          <div
            ref={el => {
              this.mapContainerVehicleView = el;
            }}
          />
          <div className="overlay">
            <div className="text">
              <FormattedMessage {...message.trackingMapIsNotAvailable} />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="mapContainerVehicleView">
        <div
          ref={el => {
            this.mapContainerVehicleView = el;
          }}
        />
        <Button
          variant="fab"
          mini
          className={classNames(classes.button, {
            [classes.buttonAfter]: vehiclemap.classNameForNav === 'hiddenNav',
          })}
          onClick={this.showOrHideList}
        >
          <ViewHeadlineIcon className={classes.buttonIcon} />
        </Button>
        {!check && checkNode ? (
          <div className={vehiclemap.classNameForNav}>
            <List component="nav" className={classes.nav}>
              {vehiclemap.markers &&
                vehiclemap.markers.map(marker => {
                  if (
                    marker.ecuAlertLocation.longitude > -180 &&
                    marker.ecuAlertLocation.longitude < 180 &&
                    marker.ecuAlertLocation.latitude > -90 &&
                    marker.ecuAlertLocation.latitude < 90
                  ) {
                    return (
                      <div key={marker.id}>
                        <ListItem
                          button
                          classes={{
                            root: classes.root,
                          }}
                          onClick={() => {
                            this.flyToMarker(
                              marker.ecuAlertLocation.longitude,
                              marker.ecuAlertLocation.latitude,
                              18,
                            );
                          }}
                        >
                          <Item
                            dateAndTime={marker.timestamp}
                            address={marker.address}
                          />
                        </ListItem>
                        <Divider className={classes.divider} />
                      </div>
                    );
                  }
                  return null;
                })}
            </List>
          </div>
        ) : (
          <div className="overlay-alert">
            <div className="text-alert">
              <FormattedMessage {...message.alertIsNotAvailable} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

VehicleMap.propTypes = {
  changeClassNameForNav: PropTypes.func,
  classes: PropTypes.object,
  vehicleInfo: PropTypes.object,
  handleGetAllMarkers: PropTypes.func,
  joinNotificationRoom: PropTypes.func,
  leaveNotificationRoom: PropTypes.func,
  vehiclemap: PropTypes.object,
  handleJoinDeviceDataRoom: PropTypes.func,
  handleleaveDeviceDataRoom: PropTypes.func,
  vehicleView: PropTypes.object,
  handleJoinNoticationRoom: PropTypes.func,
  location: PropTypes.object,
  handleLeaveNotificationRoom: PropTypes.func,
  handleGetTheLatestPoint: PropTypes.func,
};

export default withStyles(styles)(VehicleMap);
