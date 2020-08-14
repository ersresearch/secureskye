/*
 * @Author: DatNT62 
 * @Date: 2018-11-16 13:41:06 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-06 15:36:15
 */
/**
 *
 * Role
 *
 */

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import injectReducer from 'utils/injectReducer';
import makeSelectRole from './selectors';
import reducer from './reducer';
import Role from './Role';

const mapStateToProps = createStructuredSelector({
  role: makeSelectRole(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'role', reducer });

export default compose(
  withReducer,
  withRouter,
  withConnect,
)(Role);
