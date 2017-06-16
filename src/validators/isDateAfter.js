import { isNil } from 'lodash';
import moment from 'moment';

export default date => ({
  errorMessage: `Must be after ${moment(date).format('MMMM Do YYYY')}`,
  validator: (allValues, value) => {
    const validAfterDate = moment(date).format('YYYY-MM-DD');

    return isNil(value) || moment(value).isAfter(validAfterDate);
  },
});
