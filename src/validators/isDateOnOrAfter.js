import isNil from 'lodash/isNil';
import format from 'date-fns/format';
import isAfter from 'date-fns/is_after';
import isEqual from 'date-fns/is_equal';

export default date => ({
  errorMessage: `Must be on or after ${format(date, 'MMMM Do YYYY')}`,
  validator: (allValues, value) => (isNil(value) || isAfter(value, date) || isEqual(value, date)),
});
