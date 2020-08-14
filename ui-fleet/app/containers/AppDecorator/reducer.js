import { fromJS } from 'immutable';

export const initialState = fromJS({ noti: {} });

export default function reducer(state = initialState, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case 'WS_GET_NOTI': {
      newState.noti = action.payload;
      return newState;
    }

    default:
      return state;
  }
}
