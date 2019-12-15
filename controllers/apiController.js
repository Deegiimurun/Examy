import * as validator from './apiValidator';
import Exam from '../models/exam';

export const examController = [
  validator.exam,
  (req, res, next) => {
    if (!req.query.id) {
      Exam.find({}, 'name category duration sections')
        .then(exams => {
          if (exams) return res.status(200).json(exams);
          else
            return res.status(401).json({
              status: 'Error',
              message: 'No exam found'
            });
        })
        .catch(next);
    } else {
      Exam.findById(req.query.id, '-sections.questions.answers.isCorrect')
        .then(exam => {
          if (exam) return res.status(200).json(exam);
          else
            return res.status(401).json({
              status: 'Error',
              message: 'Exam not found'
            });
        })
        .catch(next);
    }
  }
];

export const examDeleteController = [
  validator.exam,
  (req, res, next) => {
    if (req.query.id) {
      Exam.deleteOne({ _id: req.query.id })
        .then(exams => {
          return res.status(200).json({
            status: 'OK',
            message: 'Deleted succesfully'
          });
        })
        .catch(next);
    }
  }
];

export const resultController = [
  validator.result,
  (req, res, next) => {
    req.user
      .getResult(req.body, req.exam)
      .then(result => {
        req.user.results.push(result);
        req.user.save();
        return res.status(200).json(result);
      })
      .catch(next);
  }
];

export const historyController = [
  (req, res, next) => {
    req.user
      .getHistory()
      .then(history => {
        return res.status(200).json(history.results);
      })
      .catch(next);
  }
];
