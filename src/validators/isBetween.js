import { isFinite, isNil } from 'lodash';
import invariant from 'invariant';

export default (min, max) => {
  invariant(
    isFinite(min) && isFinite(max),
    'The min and max values must be finite numbers'
  )
  return {
    errorMessage: `Must be between ${min} and ${max}`,
    validator: (_allValues, value) => {
      invariant(
        isFinite(value) || isNil(value),
        'Field value must be a finite number or nil'
      )

      return !value || (value >= min && value <= max);
    }
  };
};
