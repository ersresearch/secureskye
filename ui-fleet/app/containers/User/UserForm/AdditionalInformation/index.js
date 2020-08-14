/*
 * @Author: NhuHH 
 * @Date: 2018-11-14 11:39:33 
 * @Last Modified by: DanND1
 * @Last Modified time: 2018-11-27 10:32:48
 */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import { makeAdditionalInformation } from './selectors';
import AdditionalInformation from './AdditionalInformation';
import {
  toggleAdditionalInformation,
  addKey,
  addValue,
  getDeleteList,
  getAdditionalInformation,
  getNewAdditionalInformation,
  displayError,
} from './actions';
import reducer from './reducer';

const mapStateToProps = createStructuredSelector({
  additionalInformation: makeAdditionalInformation(),
});

function mapDispatchToProps(dispatch) {
  return {
    toggleAdditionalInformation: (all, sec) =>
      dispatch(toggleAdditionalInformation(all, sec)),
    addKey: value => dispatch(addKey(value)),
    addValue: value => dispatch(addValue(value)),
    getAdditionalInformation: data => dispatch(getAdditionalInformation(data)),
    getDeleteList: list => dispatch(getDeleteList(list)),
    getNewAdditionalInformation: list =>
      dispatch(getNewAdditionalInformation(list)),
    displayError: content => dispatch(displayError(content)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'additionalInformation', reducer });

export default compose(
  withReducer,
  withConnect,
)(AdditionalInformation);
