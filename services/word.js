const Word = require('../models/word');
const WordConfidence = require('../models/wordConfidence');

class WordService {
  constructor(db) {
    this.db = db;
  }

  /**
   * GET WORDS
   * @param partOfSpeech
   * @param limit
   * @returns {Promise<void>}
   */
  async getWords(partOfSpeech, limit) {
    let query = {};

    if (partOfSpeech) {
      query.partOfSpeech = partOfSpeech
    }

    return await Word.find(query)
      .limit(limit)
      .sort('-count');
  }


  /**
   * GET WORD
   * @param wordId
   * @returns {Promise<*>}
   */
  async getWord(wordId) {
    return await Word.findById(wordId);
  }

  /**
   * UPDATE WORD CONFIDENCE
   * @param wordId
   * @param userId
   * @param direction
   * @param value
   * @returns {Promise<void>}
   */
  async updateWordConfidence(wordId, userId, direction, value) {

    const update = direction === 'hebrewToEnglish' ? {hebrewToEnglish: value} : {englishToHebrew: value};

    console.log(update);

    try {
      return await WordConfidence.findOneAndUpdate(
        {_id: wordId, user: userId},
        update,
        {upsert: true, new: true}
      );
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = WordService;