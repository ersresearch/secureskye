import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  getAuthorityConfig,
  changeAuthoritiesList,
} from 'containers/Role/actions';
import makeSelectRole from 'containers/Role/selectors';
import AuthorityConfiguration from './AuthorityConfiguration';

const mapStateToProps = createStructuredSelector({
  role: makeSelectRole(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetAuthorities: () => dispatch(getAuthorityConfig()),
    onChangeAuthoritiesList: authList =>
      dispatch(changeAuthoritiesList(authList)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AuthorityConfiguration);
