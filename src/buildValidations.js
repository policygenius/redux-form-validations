import isArray from 'lodash/isArray';
import pickBy from 'lodash/pickBy';
import get from 'lodash/get';
import startCase from 'lodash/startCase';
import forEach from 'lodash/forEach';
import isPresent from './validators/isPresent';

const labelFor = (schema, fieldName) => schema[fieldName].label || startCase(fieldName);

const errorMessageFor = ({ schema, fieldName, errors, rule, values }) => {
  if (get(rule, 'errorMessage') && !errors[fieldName]) {
    if (typeof rule.errorMessage === 'function') {
      return rule.errorMessage(values, values[fieldName]);
    }
    return rule.errorMessage;
  }
  return `${labelFor(schema, fieldName)} is not valid`;
};

const isRequiredAndNotPresent = ({ values, field, rule }) => rule.required && !isPresent.validator(values, values[field]);

const isValid = ({ values, field, rule }) => {
  const validateCondition = rule.validateIf;

  if (!validateCondition || validateCondition(values, values[field])) {
    return rule.validator(values, values[field]);
  }
  return true;
};

const buildValidators = (schema, type) => (values) => {
  const errors = {};
  const validatedFields = Object.keys(pickBy(schema, obj => get(obj, type)));

  forEach(validatedFields, (field) => {
    if (!isArray(schema[field][type])) {
      const rule = schema[field][type];
      const requiredAndNotPresent = isRequiredAndNotPresent({ values, field, rule });
      const valid = isValid({ values, field, rule });

      if (requiredAndNotPresent) {
        errors[field] = 'Required';
      } else if (!valid) {
        errors[field] = errorMessageFor({ schema, fieldName: field, errors, rule, values });
      }
    } else {
      const rules = schema[field][type];

      forEach(rules, (rule) => {
        const requiredAndNotPresent = isRequiredAndNotPresent({ values, field, rule });
        const valid = isValid({ values, field, rule });

        if (requiredAndNotPresent) {
          errors[field] = 'Required';
        } else if (!valid) {
          errors[field] = errorMessageFor({ schema, fieldName: field, errors, rule, values });
        }
      },
      );
    }
  });

  if (schema._fieldArrays) {
    forEach(schema._fieldArrays, (validations, field) => {
      /* eslint-disable no-use-before-define */
      const nestedErrors = validateNested({ validations, type, nestedItems: values[field] });
      /* eslint-disable */

      if (nestedErrors.length) {
        errors[field] = nestedErrors;
      }
    });
  }

  return errors;
};

const buildValidations = (schema) => {
  const validate = buildValidators(schema, 'validate');
  const warn = buildValidators(schema, 'warn');

  return { validate, warn };
};

const validateNested = ({ validations, nestedItems, type }) => {
  const nestedErrors = [];
  const schema = buildValidations(validations);

  forEach(nestedItems, (item, index) => {
    const itemErrors = schema[type](item);
    nestedErrors[index] = itemErrors;
  });

  return nestedErrors;
};

export default buildValidations;
