const Word = require('../models/word');

class WordService {
  constructor(db) {
    this.db = db;
  }

  async getWords() {
    const words = await Word.find();

    return words;
  }

  async getWord(id) {
    return await Word.findOne({firstNumber: id});
  }
}

module.exports = WordService;