import invariant from 'invariant';
import trim from 'lodash/trim';
import isNil from 'lodash/isNil';
import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';

export default {
  validator: (_allValues, value) => {
    invariant(
      isString(value) || isNil(value),
      `Phone number must be a string or nil value, received ${value}, a ${typeof value}`,
    );
    return isEmpty(value) ? true : !!value && /^\d{10}$/.test(trim(value));
  },
  errorMessage: 'Must be a valid phone number',
};
