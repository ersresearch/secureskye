/*
 * @Author: DatNT62 
 * @Date: 2018-11-13 08:59:06 
 * @Last Modified by:   DatNT62 
 * @Last Modified time: 2018-11-13 08:59:06 
 */
import React from 'react';
import PropTypes from 'prop-types';
import _isUndefined from 'lodash/isUndefined';
import _isEqual from 'lodash/isEqual';
import { mapStyle } from 'commons/constants';
import mapboxgl from 'components/MapComponent/index';
let map;
let firstTime = true;

class Map extends React.PureComponent {
  componentDidMount() {
    this.props.handleGetAllMarkers();
    const lng = 106.79815;
    const lat = 10.85429;
    const zoom = 13.5;

    map = new mapboxgl.Map({
      container: this.mapContainer,
      style: mapStyle,
      center: [lng, lat],
      zoom,
    });
  }
  render() {
    const { mapObject, alertDashboard } = this.props;
    const returnCssForMarker = status => {
      let className;
      switch (status) {
        case 0:
          className = 'circle-marker-ripple-alert animation-alert-marker';
          break;
        case 1:
          className = 'circle-marker-ripple-critical animation-critical-marker';
          break;
        case 2:
          className = 'circle-marker-ripple-location animation-location-marker';
          break;
        default:
          break;
      }
      return className;
    };
    const arrDiff = (array1, array2) => {
      const array = [];
      const diff = [];
      for (let i = 0; i < array1.length; i += 1) {
        array[array1[i]] = true;
      }
      for (let i = 0; i < array2.length; i += 1) {
        if (array[array2[i]]) {
          array.splice(i, 1);
        } else {
          array[array2[i]] = true;
        }
      }

      Object.keys(array).forEach(key => {
        diff.push(key);
      });
      return diff;
    };
    if (!_isUndefined(map) && !_isUndefined(mapObject)) {
      if (!_isEqual(mapObject.markers.length, 0)) {
        const arrayMarker = mapObject.markers.map(marker => ({
          type: 'Feature',
          status: marker.type,
          ecuId: marker.ecuId,
          dateTime: marker.dateTime,
          geometry: {
            type: 'Point',
            coordinates: [marker.location.longitude, marker.location.latitude],
          },
        }));

        if (firstTime) {
          // add markers to map
          arrayMarker.map(marker => {
            const Id = marker.ecuId + marker.dateTime;

            if (!document.getElementById(Id)) {
              const el = document.createElement('div');
              el.className = returnCssForMarker(marker.status);
              el.setAttribute('id', Id);
              // make a marker for each feature and add to the map
              new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .addTo(map);
            } else {
              const el = document.getElementById(Id);
              el.style.display = 'block';
              const newMarker = new mapboxgl.Marker(el).setLngLat(
                marker.geometry.coordinates,
              );
              newMarker.addTo(map);
            }
            return false;
          });
          firstTime = false;
        } else {
          const arrayAllDateTime = alertDashboard.data.map(
            element => element.ecuId + element.dateTime,
          );
          const arrayDateTimeMarker = mapObject.markers.map(
            element => element.ecuId + element.dateTime,
          );

          const dateTimeDirr = arrDiff(arrayAllDateTime, arrayDateTimeMarker);
          const arrayDifferent = alertDashboard.data.map(marker => {
            for (let i = 0; i < dateTimeDirr.length; i += 1) {
              const Id = marker.ecuId + marker.dateTime;
              if (Id === dateTimeDirr[i]) {
                return marker;
              }
            }
            return null;
          });

          // add markers to map
          arrayMarker.map(marker => {
            const Id = marker.ecuId + marker.dateTime;

            if (!document.getElementById(Id)) {
              const el = document.createElement('div');
              el.className = returnCssForMarker(marker.status);
              el.setAttribute('id', Id);
              // make a marker for each feature and add to the map
              new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .addTo(map);
            } else {
              const el = document.getElementById(Id);
              el.style.display = 'block';
              const newMarker = new mapboxgl.Marker(el).setLngLat(
                marker.geometry.coordinates,
              );
              newMarker.addTo(map);
            }
            return false;
          });

          arrayDifferent.map(marker => {
            if (marker !== null) {
              const Id = marker.ecuId + marker.dateTime;
              if (document.getElementById(Id)) {
                const el = document.getElementById(Id);
                el.style.display = 'none';
                const newMarker = new mapboxgl.Marker(el).setLngLat([
                  marker.location.longitude,
                  marker.location.latitude,
                ]);
                newMarker.addTo(map);
              }
            }
            return false;
          });
        }
      }
    }
    return (
      <div className="mapContainer">
        <div
          ref={el => {
            this.mapContainer = el;
          }}
        />
      </div>
    );
  }
}

Map.propTypes = {
  handleGetAllMarkers: PropTypes.func,
  alertDashboard: PropTypes.object,
  mapObject: PropTypes.object,
};

export default Map;
