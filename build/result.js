"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var resultSchema = new Schema({
  sections: [{
    maxPoint: Number,
    takenPoint: Number,
    name: String,
    _id: false
  }],
  date: {
    type: Date,
    "default": Date.now
  },
  duration: Number,
  userAnswer: Array,
  exam: {
    type: Schema.Types.ObjectId,
    ref: 'Exam'
  }
});
module.exports = _mongoose["default"].model('Result', resultSchema);