/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:04:20 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 09:04:20 
 */
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import Vehicle from './Vehicle';

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
const withConnect = connect(mapDispatchToProps);
export default compose(
  withConnect,
  withRouter,
)(Vehicle);
