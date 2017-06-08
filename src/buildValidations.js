import { pickBy, get, startCase, forEach } from 'lodash';
import isPresent from './validators/isPresent';

const labelFor = (schema, fieldName) => schema[fieldName].label || startCase(fieldName);

const errorMessageFor = ({ schema, fieldName, type }) => {
  if (get(schema[fieldName], `${type}.errorMessage`)) {
    return schema[fieldName][type].errorMessage;
  }
  return `${labelFor(schema, fieldName)} is not valid`;
};

const buildValidators = (schema, type) => (values) => {
  const errors = {};
  const validatedFields = Object.keys(pickBy(schema, obj => get(obj, `${type}.validator`)));

  forEach(validatedFields, (field) => {
    const validateCondition = schema[field][type].validateIf;
    const isRequired = schema[field][type].required;

    if (isRequired && !isPresent.validator(values, values[field])) {
      errors[field] = 'Required';
    } else if (!validateCondition || validateCondition(values, values[field])) {
      if (!schema[field][type].validator(values, values[field])) {
        errors[field] = errorMessageFor({ schema, type, fieldName: field });
      }
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
