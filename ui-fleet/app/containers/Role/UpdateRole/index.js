import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import UpdateRole from './UpdateRole';
import makeSelectRole from '../selectors';
import { updateRole } from '../actions';

const mapStateToProps = createStructuredSelector({
  role: makeSelectRole(),
});

function mapDispatchToProps(dispatch) {
  return { onUpdateRole: (id, data) => dispatch(updateRole(id, data)) };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(UpdateRole);
