import isNil from 'lodash/isNil';
import format from 'date-fns/format';
import isAfter from 'date-fns/is_after';

export default date => ({
  errorMessage: `Must be after ${format(date, 'MMMM Do YYYY')}`,
  validator: (allValues, value) => (isNil(value) || isAfter(value, date)),
});
