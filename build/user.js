"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _exam = _interopRequireDefault(require("./exam"));

var _result = _interopRequireDefault(require("./result"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Schema = _mongoose["default"].Schema;
var userSchema = new Schema({
  username: String,
  password: String,
  isAdmin: Boolean,
  email: String,
  results: [{
    type: Schema.Types.ObjectId,
    ref: 'Result'
  }]
});

userSchema.methods.createExam = function (exam) {
  if (this.isAdmin) {
    return _exam["default"].create(_objectSpread({}, exam, {
      creator: this._id
    }));
  }
};

userSchema.methods.getResult = function (result, exam) {
  var resultObject = {
    duration: result.duration,
    exam: result.examID,
    userAnswer: result.answers,
    sections: []
  };
  result.answers.forEach(function (section, index) {
    var maxPoint = 0,
        takenPoint = 0,
        name = exam.sections[index].name;
    exam.sections[index].questions.forEach(function (question, index) {
      if (question.multipleAnswer) {
        question.answers.forEach(function (answer) {
          if (answer.isCorrect) maxPoint += question.point;
        });
      } else {
        maxPoint += question.point;
      }

      if (section[index].length === 0) {
        return;
      } else if (section[index].length === 1) {
        if (question.answers[section[index][0]].isCorrect) takenPoint += question.point;
      } else {
        var point = 0;
        section[index].forEach(function (answer) {
          if (question.answers[answer].isCorrect) {
            point += question.point;
          } else {
            if (point > 0) point -= question.point;
          }
        });
        takenPoint += point;
      }
    });
    resultObject.sections.push({
      maxPoint: maxPoint,
      takenPoint: takenPoint,
      name: name
    });
  });
  return _result["default"].create(resultObject);
};

userSchema.methods.getHistory = function (_id) {
  return this.populate({
    path: 'results',
    populate: {
      path: 'exam',
      select: 'name'
    }
  }).execPopulate();
};

module.exports = _mongoose["default"].model('User', userSchema);