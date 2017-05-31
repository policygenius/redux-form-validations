import { isEmpty } from '../helpers';

export default {
  errorMessage: 'Required',
  validator: (allValues, value) => {
    return !isEmpty(value);
  }
};
