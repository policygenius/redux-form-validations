import invariant from 'invariant';
import { isNil } from 'lodash';

export default {
  errorMessage: 'Must be a number',
  validator: (_allValues, value) => {
    invariant(
      typeof value === 'string' || isNil(value),
      `Argument must be a string or nil value, received ${value}, a ${typeof value}`,
    );

    return !value || !isNaN(parseInt(value, 10));
  },
};
