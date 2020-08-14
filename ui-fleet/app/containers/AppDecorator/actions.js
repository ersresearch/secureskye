const checkSocketIOConnection = () => ({
  type: 'socket',
  types: ['INIT_SOCKETIO', 'INIT_SOCKETIO_SUCCESS', 'INIT_SOCKETIO_FAILURE'],
  promise: socket =>
    new Promise((resolve, reject) => {
      console.log(socket.status());
      if (!socket.status()) {
        socket.connect().then(() => {
          const instance = socket.getInstance();
          if (instance.connected) {
            console.log('inited connection');
            return resolve();
          }
          console.log('fail to init connection');
          return reject();
        });
      }
      return resolve();
    }),
});

const joinNotificationRoom = () => dispatch =>
  dispatch({
    type: 'socket',
    types: [
      'JOIN_NOTIFICAITON_ROOM',
      'JOIN_NOTICAITON_ROOM_SUCCESS',
      'JOIN_NOTICAITON_ROOM_FAILURE',
    ],
    promise: socket =>
      new Promise(resolve => {
        console.log('try to join notification room');
        console.log(socket.status());
        dispatch(checkSocketIOConnection());
        // get socket instance for work
        const instance = socket.getInstance();

        // join room "admin" --> change it by replacing current username from state
        instance.on('infor', data => {
          console.log('checkdata', data);
        });
        return resolve();
      }),
  });

export { checkSocketIOConnection, joinNotificationRoom };
