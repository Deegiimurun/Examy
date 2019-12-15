"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.token = exports.register = exports.login = void 0;

var _expressValidator = require("express-validator");

var login = [(0, _expressValidator.check)('username', 'username field is required').exists().trim(), (0, _expressValidator.check)('password', 'password field is required').exists(), (0, _expressValidator.sanitize)('username').customSanitizer(function (value) {
  return value.toLowerCase();
}), function (req, res, next) {
  var errors = (0, _expressValidator.validationResult)(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'Error',
      message: errors.array().map(function (error) {
        return {
          parameter: error.param,
          error: error.msg
        };
      })
    });
  }

  next();
}];
exports.login = login;
var register = [(0, _expressValidator.check)('username', 'username field is required').exists().trim(), (0, _expressValidator.check)('password', 'password field is required').exists(), (0, _expressValidator.check)('isAdmin', 'isAdmin field is required').exists(), (0, _expressValidator.check)('email', 'isAdmin field is required').exists().bail().isEmail().withMessage('Email is wrong'), (0, _expressValidator.sanitize)('username').customSanitizer(function (value) {
  return value.toLowerCase();
}), (0, _expressValidator.sanitize)('isAdmin').toBoolean(), function (req, res, next) {
  var errors = (0, _expressValidator.validationResult)(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'Error',
      message: errors.array().map(function (error) {
        return {
          parameter: error.param,
          error: error.msg
        };
      })
    });
  }

  next();
}];
exports.register = register;
var token = [(0, _expressValidator.check)('authorization', 'Bearer token is required').exists().bail().custom(function (value, _ref) {
  var req = _ref.req;

  if (value.startsWith('Bearer ')) {
    req.token = value.substring(7, value.length);
    return true;
  }

  throw new Error('Bearer token is required');
}), function (req, res, next) {
  var errors = (0, _expressValidator.validationResult)(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'Error',
      message: errors.array().map(function (error) {
        return {
          parameter: error.param,
          error: error.msg
        };
      })
    });
  }

  next();
}];
exports.token = token;