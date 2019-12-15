import { check, validationResult } from 'express-validator';
import mongoose from 'mongoose';

import Exam from '../models/exam';

export const exam = [
    check('id', 'id is wrong').custom(value => {
        if (value) {
            if (mongoose.Types.ObjectId.isValid(value)) {
                return true;
            }
        } else return true;
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

export const result = [
    check('examID', 'examID is required')
        .exists()
        .bail()
        .custom((value, { req }) => {
            if (mongoose.Types.ObjectId.isValid(value)) {
                return Exam.findById(value)
                    .then(exam => {
                        if (exam) {
                            req.exam = exam;
                        } else {
                            return Promise.reject('examID is wrong');
                        }
                    })
                    .catch(err => Promise.reject('examID is wrong'));
            }
            throw new Error('examID is wrong');
        }),
    check('duration', 'duration is required')
        .exists()
        .bail()
        .custom((value, { req }) => {
            if (req.exam.duration < Math.ceil(value / 60)) {
                throw new Error('Duration is wrong');
            }
            return true;
        }),
    check('answers', 'answers is required')
        .exists()
        .bail()
        .custom((value, { req }) => {
            if (req.exam) {
                if (value.length === req.exam.sections.length) {
                    let hasError = false;
                    value.forEach((section, index) => {
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
