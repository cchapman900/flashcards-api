const Word = require('../models/word');

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
}

module.exports = WordService;