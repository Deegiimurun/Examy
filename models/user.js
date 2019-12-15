import mongoose from 'mongoose';

import Exam from './exam';
import Result from './result';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  isAdmin: Boolean,
  email: String,
  results: [{ type: Schema.Types.ObjectId, ref: 'Result' }]
});

userSchema.methods.createExam = function(exam) {
  if (this.isAdmin) {
    return Exam.create({ ...exam, creator: this._id });
  }
};

userSchema.methods.getResult = function(result, exam) {
  let resultObject = {
    duration: result.duration,
    exam: result.examID,
    userAnswer: result.answers,
    sections: []
  };

  result.answers.forEach((section, index) => {
    let maxPoint = 0,
      takenPoint = 0,
      name = exam.sections[index].name;

    exam.sections[index].questions.forEach((question, index) => {
      if (question.multipleAnswer) {
        question.answers.forEach(answer => {
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
        let point = 0;
        section[index].forEach(answer => {
          if (question.answers[answer].isCorrect) {
            point += question.point;
          } else {
            if (point > 0) point -= question.point;
          }
        });
        takenPoint += point;
      }
    });

    resultObject.sections.push({ maxPoint, takenPoint, name });
  });

  return Result.create(resultObject);
};

userSchema.methods.getHistory = function(_id) {
  return this.populate({
    path: 'results',
    populate: { path: 'exam', select: 'name' }
  }).execPopulate();
};

module.exports = mongoose.model('User', userSchema);
