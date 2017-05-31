'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _lodash = require('lodash');

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable max-len */
var EMAIL_REGEX = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
/* eslint-disable */

exports.default = {
  errorMessage: 'Must be a valid email',
  validator: function validator(_allValues, value) {
    (0, _invariant2.default)(typeof value === 'string' || (0, _lodash.isNil)(value), 'Argument must be a string or nil value, received ' + value + ', a ' + (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)));
    return (0, _helpers.isEmpty)(value) ? true : EMAIL_REGEX.test(value.trim());
  }
};