/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:01:31 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 09:01:31 
 */
/**
 *
 * Asynchronously loads the component for RiskLevelGaugeChart
 *
 */

import Loadable from 'react-loadable';
import Loading from 'components/CircularProgress';

export default Loadable({
  loader: () => import('./index'),
  loading: Loading,
});
