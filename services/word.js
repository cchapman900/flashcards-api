class WordService {
  constructor(db) {
    this.db = db;
  }

  /**
   * GET WORDS
   * @param partOfSpeech
   * @param confidenceMax
   * @param limit
   * @returns {Promise<void>}
   */
  async getWords(userId, partOfSpeech, confidenceMax, limit) {
    try {

      // Get the basic assessment content
      const response = await this.db.query(
        'SELECT id, hebrew, english, part_of_speech, count ' +
        'FROM words ' +
        'ORDER BY count DESC',
        [partOfSpeech]
      );

      console.log(response)
      return response;

    } catch (e) {
      console.log(e);
    }
  }


  /**
   * GET WORD
   * @param wordId
   * @param userId
   * @returns {Promise<*>}
   */
  async getWord(wordId, userId) {
    try {
      return await WordConfidence
        .findOneAndUpdate(
        {word: wordId, user: userId},
        {},
        {upsert: true, new: true}
        )
        .populate('word');
    } catch (e) {
      console.error(e)
    }
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
        {word: wordId, user: userId},
        update,
        {upsert: true, new: true}
      );
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = WordService;