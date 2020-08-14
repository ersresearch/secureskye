import React from 'react';
import PropTypes from 'prop-types';

export class AppDecorator extends React.PureComponent {
  componentWillMount() {
    // console.log('check socket.io connection here');
    const {
      handleCheckSocketIOConnection,
      handleJoinNoticationRoom,
    } = this.props;
    handleCheckSocketIOConnection();

    // waiting for init connection
    setTimeout(() => {
      // console.log('join rooom');
      handleJoinNoticationRoom();
    }, 3000);
  }
  render() {
    return <div className="appdecorator">{this.props.children}</div>;
  }
}

AppDecorator.propTypes = {
  children: PropTypes.object,
  handleCheckSocketIOConnection: PropTypes.func,
  handleJoinNoticationRoom: PropTypes.func,
};

export default AppDecorator;
