import { isNil } from 'lodash';
import moment from 'moment';

export default {
  errorMessage: 'Must be a date in the past',
  validator: (allValues, value) => {
    const today = moment().format('YYYY-MM-DD');

    return isNil(value) || moment(value).isBefore(today);
  },
};
