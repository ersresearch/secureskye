/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 08:54:00 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-12 11:30:53
 */
import { fromJS } from 'immutable';
import { actionTypes } from './constants';

export const initialState = fromJS({
  data: [],
  currentId: '',
  dataCurrent: [],
  indexData: 0,
  ECUId: '',
  software: [],
});

function SoftwareUpdateDetailReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_DATA.SUCCESS:
      return state.merge({
        data: fromJS(action.payload),
        ECUId: fromJS(action.payload.id),
      });
    case actionTypes.GET_ALL_SOFTWARE.SUCCESS:
      return state.set('software', action.payload.data);
    case actionTypes.GET_LICENSE_UPDATE.REQUEST:
      return state.set('currentId', action.payload.id);
    case actionTypes.GET_DATA_CURRENT.REQUEST:
      return state.merge({
        dataCurrent: action.data || [],
        indexData: 1,
      });
    case actionTypes.RESET_DATA:
      return state.merge({
        data: [],
        ECUId: '',
      });
    case actionTypes.GET_DATA_SOFTWARE_VERSION:
      return state.merge({
        data: action.data,
        idButtonUpdate: -1,
        indexData: 0,
      });
    default:
      return state;
  }
}

export default SoftwareUpdateDetailReducer;
