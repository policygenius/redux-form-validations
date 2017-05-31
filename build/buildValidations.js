'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateNested = function validateNested(_ref) {
  var validations = _ref.validations,
      nestedItems = _ref.nestedItems,
      type = _ref.type;

  var nestedErrors = [];
  var schema = buildValidations(validations);

  (0, _lodash.forEach)(nestedItems, function (item, index) {
    var itemErrors = schema[type](item);
    nestedErrors[index] = itemErrors;
  });

  return nestedErrors;
};

var buildValidators = function buildValidators(schema, type) {
  return function (values) {
    var errors = {};
    var validatedFields = (0, _keys2.default)((0, _lodash.pickBy)(schema, function (obj) {
      return (0, _lodash.get)(obj, type + '.validator');
    }));

    (0, _lodash.forEach)(validatedFields, function (field) {
      var validateCondition = schema[field][type].validateIf;
      var isRequired = schema[field][type].required;

      if (isRequired) {
        errors[field] = 'Required';
      } else if (!validateCondition || validateCondition(values, values[field])) {
        if (!schema[field][type].validator(values, values[field])) {
          errors[field] = errorMessageFor({ schema: schema, type: type, fieldName: field });
        }
      }
    });

    if (schema._fieldArrays) {
      (0, _lodash.forEach)(schema._fieldArrays, function (validations, field) {
        var nestedErrors = validateNested({ validations: validations, type: type, nestedItems: values[field] });
        if (nestedErrors.length) {
          errors[field] = nestedErrors;
        }
      });
    }

    return errors;
  };
};

var errorMessageFor = function errorMessageFor(_ref2) {
  var schema = _ref2.schema,
      fieldName = _ref2.fieldName,
      type = _ref2.type;

  if ((0, _lodash.get)(schema[fieldName], type + '.errorMessage')) {
    return schema[fieldName][type].errorMessage;
  } else {
    return labelFor(schema, fieldName) + ' is not valid';
  }
};

var labelFor = function labelFor(schema, fieldName) {
  return schema[fieldName].label || (0, _lodash.startCase)(fieldName);
};

var buildValidations = function buildValidations(schema) {
  var validate = buildValidators(schema, 'validate');
  var warn = buildValidators(schema, 'warn');

  return { validate: validate, warn: warn };
};

exports.default = buildValidations;