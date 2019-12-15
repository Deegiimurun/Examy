import { check, validationResult, sanitize } from 'express-validator';

export const login = [
  check('username', 'username field is required')
    .exists()
    .trim(),
  check('password', 'password field is required').exists(),
  sanitize('username').customSanitizer(value => {
    return value.toLowerCase();
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'Error',
        message: errors.array().map(error => {
          return { parameter: error.param, error: error.msg };
        })
      });
    }
    next();
  }
];

export const register = [
  check('username', 'username field is required')
    .exists()
    .trim(),
  check('password', 'password field is required').exists(),
  check('isAdmin', 'isAdmin field is required').exists(),
  check('email', 'isAdmin field is required')
    .exists()
    .bail()
    .isEmail()
    .withMessage('Email is wrong'),
  sanitize('username').customSanitizer(value => {
    return value.toLowerCase();
  }),
  sanitize('isAdmin').toBoolean(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'Error',
        message: errors.array().map(error => {
          return { parameter: error.param, error: error.msg };
        })
      });
    }
    next();
  }
];

export const token = [
  check('authorization', 'Bearer token is required')
    .exists()
    .bail()
    .custom((value, { req }) => {
      if (value.startsWith('Bearer ')) {
        req.token = value.substring(7, value.length);
        return true;
      }
      throw new Error('Bearer token is required');
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'Error',
        message: errors.array().map(error => {
          return { parameter: error.param, error: error.msg };
        })
      });
    }
    next();
  }
];
