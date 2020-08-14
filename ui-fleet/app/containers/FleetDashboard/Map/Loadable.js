/*
 * @Author: DatNT62 
 * @Date: 2018-11-13 08:59:22 
 * @Last Modified by:   DatNT62 
 * @Last Modified time: 2018-11-13 08:59:22 
 */
/**
 *
 * Asynchronously loads the component for Map
 *
 */

import Loadable from 'react-loadable';
import Loading from 'components/CircularProgress';

export default Loadable({
  loader: () => import('./index'),
  loading: Loading,
});
