import isNil from 'lodash/isNil';

export const isEmpty = value => isNil(value) || value === '';
