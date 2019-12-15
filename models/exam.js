import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const examSchema = new Schema({
    category: [String],
    name: String,
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    duration: Number,
    sections: [
        {
            name: String,
            description: String,
            questions: [
                {
                    question: String,
                    image: [String],
                    point: Number,
                    answers: [
                        {
                            answer: String,
                            isCorrect: Boolean,
                            _id: false
                        }
                    ],
                    multipleAnswer: Boolean,
                    _id: false
                }
            ],
            _id: false
        }
    ]
});

module.exports = mongoose.model('Exam', examSchema);
