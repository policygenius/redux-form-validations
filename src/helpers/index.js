import { isNil } from 'lodash';

export const isEmpty = value => isNil(value) || value === '';
