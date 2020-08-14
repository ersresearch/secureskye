/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:13:35 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 09:13:35 
 */
import Loadable from 'react-loadable';
import Loading from 'components/CircularProgress';

export default Loadable({
  loader: () => import('./index'),
  loading: Loading,
});
