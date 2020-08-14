import { AsyncActionCreatorSuffix } from 'commons/constants';
import { toastr } from 'react-redux-toastr';
import qs from 'qs';

export const createAsyncTypes = typeString =>
  Object.values(AsyncActionCreatorSuffix).reduce((acc, curr) => {
    acc[curr] = `${typeString}_${curr}`;
    return acc;
  }, {});
export const createAction = (type, payload = {}) => ({ type, ...payload });

export const ShowNotify = (type, message) => {
  switch (type) {
    case 'success': {
      toastr.success(message);
      break;
    }

    case 'error': {
      toastr.error(message);
      break;
    }

    case 'warning': {
      toastr.warning(message);
      break;
    }

    case 'info': {
      toastr.info(message);
      break;
    }

    default:
      break;
  }
};

export const parseQuery = query => qs.parse(query, { ignoreQueryPrefix: true });
