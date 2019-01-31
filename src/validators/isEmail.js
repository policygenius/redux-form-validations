import invariant from 'invariant';
import isNil from 'lodash/isNil';
import { isEmpty } from '../helpers';

/* eslint-disable max-len */
/* eslint-disable no-useless-escape */

// pulled from https://emailregex.com/, adhering to the RFC 5322 Official Standard
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/* eslint-disable */

export default {
  errorMessage: 'Must be a valid email',
  validator: (_allValues, value) => {
    invariant(
      typeof value === 'string' || isNil(value),
      `Argument must be a string or nil value, received ${value}, a ${typeof value}`
    )
    return isEmpty(value) || EMAIL_REGEX.test(value.trim());
  }
};
