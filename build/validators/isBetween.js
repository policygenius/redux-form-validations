'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (min, max) {
  (0, _invariant2.default)((0, _lodash.isFinite)(min) && (0, _lodash.isFinite)(max), 'The min and max values must be finite numbers');
  return {
    errorMessage: 'Must be between ' + min + ' and ' + max,
    validator: function validator(_allValues, value) {
      (0, _invariant2.default)((0, _lodash.isFinite)(value) || (0, _lodash.isNil)(value), 'Field value must be a finite number or nil');

      return !value || value >= min && value <= max;
    }
  };
};