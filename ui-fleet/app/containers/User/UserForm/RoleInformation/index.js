/*
 * @Author: NhuHH 
 * @Date: 2018-11-14 11:38:16 
 * @Last Modified by: LoiDT2
 * @Last Modified time: 2018-11-23 09:44:07
 */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import { makeRoleInformation, makeUser } from './selectors';
import RoleInformation from './RoleInformation';
import {
  getRoleSelection,
  toggleRoleInformation,
  getDeleteList,
  getRoleInformation,
  getNewRoleInformation,
} from './actions';
import reducer from './reducer';

const mapStateToProps = createStructuredSelector({
  roleInformation: makeRoleInformation(),
  user: makeUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetRoleSelection: role => dispatch(getRoleSelection(role)),
    toggleRoleInformation: (selectAll, selection) =>
      dispatch(toggleRoleInformation(selectAll, selection)),
    getRoleInformation: data => dispatch(getRoleInformation(data)),
    getDeleteList: list => dispatch(getDeleteList(list)),
    getNewRoleInformation: data => dispatch(getNewRoleInformation(data)),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'roleInformation', reducer });

export default compose(
  withReducer,
  withConnect,
)(RoleInformation);
