import { isNil } from 'lodash';

export const isEmpty = (value) => {
  return isNil(value) || value === '';
};
