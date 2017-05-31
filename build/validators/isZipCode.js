'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _lodash = require('lodash');

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  validator: function validator(_allValues, value) {
    (0, _invariant2.default)((0, _lodash.isString)(value) || (0, _lodash.isNil)(value), 'Zip code must be a string, was passed ' + value + ', a ' + (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)));
    return !value || /^\d{5}$/.test(value.trim());
  },
  errorMessage: 'Must be a valid zip code'
};