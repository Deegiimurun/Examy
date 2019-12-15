"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var examSchema = new Schema({
  category: [String],
  name: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  duration: Number,
  sections: [{
    name: String,
    description: String,
    questions: [{
      question: String,
      image: [String],
      point: Number,
      answers: [{
        answer: String,
        isCorrect: Boolean,
        _id: false
      }],
      multipleAnswer: Boolean,
      _id: false
    }],
    _id: false
  }]
});
module.exports = _mongoose["default"].model('Exam', examSchema);