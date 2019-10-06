const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
  word: { type: Schema.Types.ObjectId, ref: 'Word' },
  user: { type: String, ref: 'User' },
  hebrewToEnglish: {
    type: Number,
    min: 1,
    max: 5
  },
  englishToHebrew: {
    type: Number,
    min: 1,
    max: 5
  }
});

let wordConfidence;
if (mongoose.models.WordConfidence) {
  wordConfidence = mongoose.model('WordConfidence');
} else {
  wordConfidence = mongoose.model('WordConfidence', schema);
}

module.exports = wordConfidence;