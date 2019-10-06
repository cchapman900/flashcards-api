const Word = require('../models/word');
const WordConfidence = require('../models/wordConfidence');

class WordService {
  constructor(db) {
    this.db = db;
  }

  async getWords(partOfSpeech) {
    let query = partOfSpeech ? {partOfSpeech: partOfSpeech} : {};

    console.log(query);

    const words = await Word.find(query);

    return words;
  }

  async getWord(wordId) {

    const word = await Word.findById(wordId);
    console.log(word);

    return word;
  }

  async updateWordConfidence(wordId, userId, direction, value) {

    const update = direction === 'hebrewToEnglish' ? {hebrewToEnglish: value} : {englishToHebrew: value};

    console.log(update);

    try {
      const updatedWordConfidence = await WordConfidence.findOneAndUpdate(
        {_id: wordId, user: userId},
        update,
        {upsert: true, new: true}
      );

      return updatedWordConfidence;
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = WordService;