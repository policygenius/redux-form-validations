'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('../helpers');

exports.default = {
  errorMessage: 'Required',
  validator: function validator(allValues, value) {
    return !(0, _helpers.isEmpty)(value);
  }
};