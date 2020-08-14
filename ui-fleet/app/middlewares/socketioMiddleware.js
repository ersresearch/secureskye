export default function socketMiddleware(socket) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    const { promise, type, types, ...rest } = action;
    if (type !== 'socket' || !promise) {
      return next(action);
    }
    const [REQUEST, SUCCESS, FAILURE] = types;
    next({ ...rest, type: `${REQUEST}_SOCKET` });

    return promise(socket)
      .then(result => next({ ...rest, result, type: `${SUCCESS}_SOCKET` }))
      .catch(error => next({ ...rest, error, type: `${FAILURE}_SOCKET` }));
  };
}
