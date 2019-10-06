const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  hebrew: 'string',
  english: 'string',
  count: 'number',
  partOfSpeech: 'string'
});


let word;
if (mongoose.models.Word) {
  word = mongoose.model('Word');
} else {
  word = mongoose.model('Word', schema);
}

module.exports = word;