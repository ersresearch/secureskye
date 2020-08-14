/*
 * @Author: DatNT62 
 * @Date: 2018-11-16 13:40:42 
 * @Last Modified by:   DatNT62 
 * @Last Modified time: 2018-11-16 13:40:42 
 */
import Loadable from 'react-loadable';
import Loading from 'components/CircularProgress';

export default Loadable({
  loader: () => import('./index'),
  loading: Loading,
});
