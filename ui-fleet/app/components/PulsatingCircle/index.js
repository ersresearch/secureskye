/**
 *
 * Marker
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  getEcuId,
  getVehicleAlertsFilterEcu,
  getClickButton,
  getAlertInfor,
} from 'containers/VehicleAlert/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';

/* eslint-disable react/prefer-stateless-function */
class PulsatingCircle extends React.PureComponent {
  constructor(props) {
    super(props);
    this.alert = React.createRef();
  }
  componentDidMount() {
    const { position } = this.props;
    this.alert.current.style.top = `${position[0]}%`;
    this.alert.current.style.left = `${position[1]}%`;
  }
  filterAlertEcu = ecuId => {
    const {
      onGetEcuId,
      onGetVehicleAlertsFilterEcu,
      onGetAlertInfor,
      onGetClickButton,
    } = this.props;
    onGetEcuId(ecuId);
    onGetVehicleAlertsFilterEcu(ecuId);
    onGetAlertInfor('');
    onGetClickButton('');
  };
  render() {
    const { type, status, className, active, id } = this.props;
    let classCirle;
    switch (type) {
      case 'marker':
        switch (status) {
          case 'WARNING':
            classCirle = active
              ? 'circle-marker-ripple-alert animation-alert-marker'
              : 'circle-marker-ripple-alert';
            break;
          case 'CRITICAL':
            classCirle = active
              ? 'circle-marker-ripple-critical animation-critical-marker'
              : 'circle-marker-ripple-critical';
            break;
          case 'location':
            classCirle = active
              ? 'circle-marker-ripple-location animation-location-marker'
              : 'circle-marker-ripple-location';
            break;
          case 'route':
            classCirle = active
              ? 'circle-marker-ripple-route animation-route-marker'
              : 'circle-marker-ripple-route';
            break;
          default:
            break;
        }
        break;
      case 'point':
        switch (status) {
          case 'NORMAL':
            classCirle = active
              ? 'circle-point-ripple-normal animation-normal-point'
              : 'circle-point-ripple-normal';
            break;
          case 'WARNING':
            classCirle = active
              ? 'circle-point-ripple-alert animation-alert-point'
              : 'circle-point-ripple-alert';
            break;
          case 'CRITICAL':
            classCirle = active
              ? 'circle-point-ripple-critical animation-critical-point'
              : 'circle-point-ripple-critical';
            break;
          case 'INFORMATION':
            classCirle = active
              ? 'circle-point-ripple-info animation-info-point'
              : 'circle-point-ripple-info';
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }

    return (
      <div
        role="presentation"
        onClick={() => this.filterAlertEcu(id)}
        ref={this.alert}
        className={`${classCirle} ${className}`}
      />
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    onGetEcuId: ecuId => dispatch(getEcuId(ecuId)),
    onGetVehicleAlertsFilterEcu: ecuId =>
      dispatch(getVehicleAlertsFilterEcu(ecuId)),
    onGetAlertInfor: data => dispatch(getAlertInfor(data)),
    onGetClickButton: status => dispatch(getClickButton(status)),
  };
}
const withConnect = connect(
  null,
  mapDispatchToProps,
);
PulsatingCircle.propTypes = {
  active: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  position: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  onGetEcuId: PropTypes.func.isRequired,
  onGetVehicleAlertsFilterEcu: PropTypes.func.isRequired,
  onGetAlertInfor: PropTypes.func.isRequired,
  onGetClickButton: PropTypes.func.isRequired,
};
export default compose(withConnect)(PulsatingCircle);
