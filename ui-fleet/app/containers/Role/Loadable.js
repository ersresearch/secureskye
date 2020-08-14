/*
 * @Author: DatNT62 
 * @Date: 2018-11-16 13:41:30 
 * @Last Modified by:   DatNT62 
 * @Last Modified time: 2018-11-16 13:41:30 
 */
/**
 *
 * Asynchronously loads the component for Role
 *
 */

import Loadable from 'react-loadable';
import Loading from 'components/CircularProgress';

export default Loadable({
  loader: () => import('./index'),
  loading: Loading,
});
