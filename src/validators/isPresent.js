import { isEmpty } from '../helpers';

export default {
  errorMessage: 'Required',
  validator: (allValues, value) => !isEmpty(value),
};
