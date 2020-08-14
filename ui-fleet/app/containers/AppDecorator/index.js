/**
 *
 * AppDecorator
 *
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { checkSocketIOConnection, joinNotificationRoom } from './actions';
import makeSelectAppDecoratorDomain from './selectors';
import AppDecorator from './AppDecorator';

const mapStateToProps = createStructuredSelector({
  appDecorator: makeSelectAppDecoratorDomain(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleJoinNoticationRoom: () => dispatch(joinNotificationRoom()),
    handleCheckSocketIOConnection: () => dispatch(checkSocketIOConnection()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AppDecorator);
