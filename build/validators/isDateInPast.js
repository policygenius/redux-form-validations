'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  errorMessage: 'Must be a date in the past',
  validator: function validator(allValues, value) {
    (0, _invariant2.default)((0, _lodash.isNil)(value) || (0, _moment2.default)(value).isValid(), 'Argument must be a parsable date or null value');

    var today = (0, _moment2.default)().format('YYYY-MM-DD');

    return (0, _lodash.isNil)(value) || (0, _moment2.default)(value).isBefore(today);
  }
};