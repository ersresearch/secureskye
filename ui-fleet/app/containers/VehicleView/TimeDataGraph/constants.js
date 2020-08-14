/*
 *
 * TimeDataGraph constants
 *
 */
import { createAsyncTypes } from 'utils/actionUtils';
const PREFIX = 'TIME_DATA_GRAPH_';
const ActionTypes = {
  ADD_DATA: `${PREFIX}ADD_DATA`,
  CHANGE_TAB: `${PREFIX}CHANGE_TAB`,
  CHANGE_DURATION: `${PREFIX}CHANGE_DURATION`,
  GET_DATA_SPEED: createAsyncTypes(`${PREFIX}GET_DATA_SPEED`),
  GET_DATA_RPM: createAsyncTypes(`${PREFIX}GET_DATA_RPM`),
  GET_DATA_SPEED_FIVE: createAsyncTypes(`${PREFIX}GET_DATA_SPEED_FIVE`),
  GET_DATA_RPM_FIVE: createAsyncTypes(`${PREFIX}GET_DATA_RPM_FIVE`),
};
export default ActionTypes;
