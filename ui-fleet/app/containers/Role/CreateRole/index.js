import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import CreateRole from './CreateRole';
import makeSelectRole from '../selectors';
import { createRole } from '../actions';

const mapStateToProps = createStructuredSelector({
  role: makeSelectRole(),
});

function mapDispatchToProps(dispatch) {
  return { onCreateRole: data => dispatch(createRole(data)) };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CreateRole);
