import invariant from 'invariant';
import { isNil } from 'lodash';
import { isEmpty } from '../helpers';

/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
const EMAIL_REGEX = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
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
