import { isString, isNil } from 'lodash';
import invariant from 'invariant';

export default {
  validator: (_allValues, value) => {
    invariant(
      isString(value) || isNil(value),
      `Zip code must be a string, was passed ${value}, a ${typeof value}`
    );
    return !value || /^\d{5}$/.test(value.trim());
  },
  errorMessage: 'Must be a valid zip code'
};
