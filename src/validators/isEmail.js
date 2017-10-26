import invariant from 'invariant';
import isNil from 'lodash/isNil';
import { isEmpty } from '../helpers';

/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
const EMAIL_REGEX = /.+@.+\..+/;
/* eslint-disable */

export default {
  errorMessage: 'Must be a valid email',
  validator: (_allValues, value) => {
    invariant(
      typeof value === 'string' || isNil(value),
      `Argument must be a string or nil value, received ${value}, a ${typeof value}`
    )
    return isEmpty(value) ? true : EMAIL_REGEX.test(value.trim());
  }
};
