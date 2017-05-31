import { isNil } from 'lodash';
import moment from 'moment';
import invariant from 'invariant';

export default {
  errorMessage: 'Must be a date in the past',
  validator: (allValues, value) => {
    invariant(
      isNil(value) || moment(value).isValid(),
      'Argument must be a parsable date or null value'
    );

    const today = moment().format('YYYY-MM-DD');

    return isNil(value) || moment(value).isBefore(today);
  }
};
