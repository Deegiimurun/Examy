'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.historyController = exports.resultController = exports.examDeleteController = exports.examController = void 0;

var validator = _interopRequireWildcard(require('./apiValidator'));

var _exam = _interopRequireDefault(require('./exam'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _getRequireWildcardCache() {
  if (typeof WeakMap !== 'function') return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  if (obj != null) {
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
  }
  newObj['default'] = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

var examController = [
  validator.exam,
  function(req, res, next) {
    if (!req.query.id) {
      _exam['default']
        .find({}, 'name category duration sections')
        .then(function(exams) {
          if (exams) return res.status(200).json(exams);
          else
            return res.status(401).json({
              status: 'Error',
              message: 'No exam found'
            });
        })
        ['catch'](next);
    } else {
      _exam['default']
        .findById(req.query.id, '-sections.questions.answers.isCorrect')
        .then(function(exam) {
          if (exam) return res.status(200).json(exam);
          else
            return res.status(401).json({
              status: 'Error',
              message: 'Exam not found'
            });
        })
        ['catch'](next);
    }
  }
];
exports.examController = examController;
var examDeleteController = [
  validator.exam,
  function(req, res, next) {
    if (req.query.id) {
      _exam['default']
        .deleteOne({
          _id: req.query.id
        })
        .then(function(exams) {
          return res.status(200).json({
            status: 'OK',
            message: 'Deleted succesfully'
          });
        })
        ['catch'](next);
    }
  }
];
exports.examDeleteController = examDeleteController;
var resultController = [
  validator.result,
  function(req, res, next) {
    req.user
      .getResult(req.body, req.exam)
      .then(function(result) {
        req.user.results.push(result);
        req.user.save();
        return res.status(200).json(result);
      })
      ['catch'](next);
  }
];
exports.resultController = resultController;
var historyController = [
  function(req, res, next) {
    req.user
      .getHistory()
      .then(function(history) {
        return res.status(200).json(history.results);
      })
      ['catch'](next);
  }
];
exports.historyController = historyController;
