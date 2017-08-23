import { isEmpty } from '../helpers';
import isEmail from './isEmail';

const PG_EMAIL_REGEX = /@policygenius.com$/;

export default {
  errorMessage: 'Must be a PolicyGenius email',
  validator: (_allValues, value) => (isEmpty(value) ? true : isEmail.validator(_allValues, value) && PG_EMAIL_REGEX.test(value.trim())),
};
