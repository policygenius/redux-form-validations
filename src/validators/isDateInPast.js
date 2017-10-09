import isNil from 'lodash/isNil';
import isPast from 'date-fns/is_past';

export default {
  errorMessage: 'Must be a date in the past',
  validator: (allValues, value) => (isNil(value) || isPast(value)),
};
