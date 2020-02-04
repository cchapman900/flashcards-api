class WordService {
  constructor(db) {
    this.db = db;
  }

  /**
   * GET WORDS
   * @param userId
   * @param partOfSpeech
   * @param sessionConfidenceMax
   * @param overallConfidenceMax
   * @param limit
   * @returns {Promise<void>}
   */
  async getWords(userId, partOfSpeech, sessionConfidenceMax, overallConfidenceMax, limit) {
    try {

      // Get the basic assessment content
      return await this.db.query(
        'SELECT w.id, hebrew, english, part_of_speech, count, session_confidence, overall_confidence ' +
        'FROM words w ' +
        'LEFT JOIN confidence c ' +
        'ON w.id = c.word_id ' +
        'AND c.user_id = ? ' +
        'WHERE part_of_speech in (?) ' +
        'AND (session_confidence < ? OR session_confidence IS NULL) ' +
        'AND (overall_confidence < ? OR overall_confidence IS NULL) ' +
        'ORDER BY count DESC ' +
        'LIMIT ?',
        [userId, partOfSpeech, sessionConfidenceMax, overallConfidenceMax, limit]
      );

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