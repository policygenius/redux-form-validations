'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEmpty = undefined;

var _lodash = require('lodash');

var isEmpty = exports.isEmpty = function isEmpty(value) {
  return (0, _lodash.isNil)(value) || value === '';
};