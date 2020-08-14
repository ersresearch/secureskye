/**
 *
 * Asynchronously loads the component for VehicleSoftwareUpdate
 *
 */

import Loadable from 'react-loadable';
import Loading from 'components/CircularProgress';

export default Loadable({
  loader: () => import('./index'),
  loading: Loading,
});
