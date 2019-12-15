'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.result = exports.exam = void 0;

var _expressValidator = require('express-validator');

var _mongoose = _interopRequireDefault(require('mongoose'));

var _exam = _interopRequireDefault(require('./exam'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var exam = [
  (0, _expressValidator.check)('id', 'id is wrong').custom(function(value) {
    if (value) {
      if (_mongoose['default'].Types.ObjectId.isValid(value)) {
        return true;
      }
    } else return true;
  }),
  function(req, res, next) {
    var errors = (0, _expressValidator.validationResult)(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'Error',
        message: errors.array().map(function(error) {
          return {
            parameter: error.param,
            error: error.msg
          };
        })
      });
    }

    next();
  }
];
exports.exam = exam;
var result = [
  (0, _expressValidator.check)('examID', 'examID is required')
    .exists()
    .bail()
    .custom(function(value, _ref) {
      var req = _ref.req;

      if (_mongoose['default'].Types.ObjectId.isValid(value)) {
        return _exam['default']
          .findById(value)
          .then(function(exam) {
            if (exam) {
              req.exam = exam;
            } else {
              return Promise.reject('examID is wrong');
            }
          })
          ['catch'](function(err) {
            return Promise.reject('examID is wrong');
          });
      }

      throw new Error('examID is wrong');
    }),
  (0, _expressValidator.check)('duration', 'duration is required')
    .exists()
    .bail()
    .custom(function(value, _ref2) {
      var req = _ref2.req;

      if (req.exam.duration < Math.ceil(value / 60)) {
        throw new Error('Duration is wrong');
      }

      return true;
    }),
  (0, _expressValidator.check)('answers', 'answers is required')
    .exists()
    .bail()
    .custom(function(value, _ref3) {
      var req = _ref3.req;

      if (req.exam) {
        if (value.length === req.exam.sections.length) {
          var hasError = false;
          value.forEach(function(section, index) {
            if (section.length !== req.exam.sections[index].questions.length) hasError = true;
          });
          if (hasError) throw new Error('Answer number is wrong');
          else return true;
        } else {
          throw new Error('Section number is wrong');
        }
      }

      return true;
    }),
  function(req, res, next) {
    var errors = (0, _expressValidator.validationResult)(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'Error',
        message: errors.array().map(function(error) {
          return {
            parameter: error.param,
            error: error.msg
          };
        })
      });
    }

    next();
  }
];
exports.result = result;
