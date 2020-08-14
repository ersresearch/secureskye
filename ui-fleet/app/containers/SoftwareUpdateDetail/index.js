/**
 *
 * Software Update Detail
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import qs from 'qs';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { withStyles } from '@material-ui/core/styles';
import Footer from 'components/Footer';
import AppDecorator from 'containers/AppDecorator';
import styles from 'styles/jss/containers/swUpdate';
import { makeSelectSoftwareUpdateDetail } from './selectors';
import reducer from './reducer';
import ECUSidebar from './ECUSidebar/Loadable';
import ECUSoftwareUpdate from './ECUSoftwareUpdate/Loadable';
import { getData } from './actions';
import saga from './saga';

export class SoftwareUpdateDetail extends React.Component {
  componentDidMount() {
    const { location } = this.props;
    const ecuId = qs.parse(location.search)['?id'] || '';
    if (ecuId) {
      this.props.getData(ecuId);
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <AppDecorator>
        <div className={classes.root}>
          <ECUSidebar />
          <div className={classes.ecuSWDetail}>
            <div className={classes.panel}>
              <ECUSoftwareUpdate />
            </div>
            <Footer />
          </div>
        </div>
      </AppDecorator>
    );
  }
}

SoftwareUpdateDetail.propTypes = {
  classes: PropTypes.object,
  location: PropTypes.object.isRequired,
  getData: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  SWUpdateDetail: makeSelectSoftwareUpdateDetail(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getData: ecuId => dispatch(getData(ecuId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'SWUpdate', reducer });
const withSaga = injectSaga({ key: 'SWUpdate', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(SoftwareUpdateDetail);
