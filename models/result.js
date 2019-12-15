import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const resultSchema = new Schema({
  sections: [
    {
      maxPoint: Number,
      takenPoint: Number,
      name: String,
      _id: false
    }
  ],
  date: { type: Date, default: Date.now },
  duration: Number,
  userAnswer: Array,
  exam: { type: Schema.Types.ObjectId, ref: 'Exam' }
});

module.exports = mongoose.model('Result', resultSchema);
