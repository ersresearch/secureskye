/*
 * @Author: DatNT62 
 * @Date: 2018-11-13 09:00:38 
 * @Last Modified by:   DatNT62 
 * @Last Modified time: 2018-11-13 09:00:38 
 */
/*
 *
 * AnomaliesChart constants
 *
 */
import { createAsyncTypes } from 'utils/actionUtils';
const PREFIX = 'ANOMALY_';
const actionTypes = {
  CHANGE_DURATION: `${PREFIX}CHANGE_DURATION}`,
  GET_ANOMALIES: createAsyncTypes(`${PREFIX}GET_ANOMALIES`),
  GET_ANOMALIES_CURRENT: createAsyncTypes(`${PREFIX}GET_ANOMALIES_CURRENT`),
};
export default actionTypes;
