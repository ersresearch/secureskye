import moment from 'moment';
import {
  dateTimeFormat,
  dateFormat,
  dateFormatSoftware,
} from 'commons/constants';
export const DateFormat = date =>
  date !== null ? moment(date / 1000000).format(dateTimeFormat) : null;

export const BirthDateFormat = date =>
  date !== null ? moment(date / 1000000).format(dateFormat) : null;

export const DateFromNow = date =>
  date !== null ? moment(date / 1000000).fromNow(1) : null;

export const DataToTimestamp = data =>
  data !== null ? moment(data).format('X') : null;

export const DateFormatSoftware = date =>
  date !== null ? moment(date / 1000000).format(dateFormatSoftware) : null;
