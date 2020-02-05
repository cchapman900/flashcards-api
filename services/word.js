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

      return await this.db.query(
        'SELECT w.id, hebrew, english, part_of_speech, count, session_confidence, overall_confidence ' +
        'FROM words w ' +
        'LEFT JOIN confidence c ' +
        'ON w.id = c.word_id ' +
        'AND c.user_id = ? ' +
        'WHERE w.id = ?',
        [userId, wordId]
      );

    } catch (e) {
      console.error(e)
    }
  }

  /**
   * UPDATE WORD CONFIDENCE
   * @param wordId
   * @param userId
   * @param value
   * @returns {Promise<void>}
   */
  async updateWordConfidence(wordId, userId, value) {
    try {

      return await this.db.query(
        'INSERT INTO confidence(user_id, word_id, session_confidence, overall_confidence) ' +
        'VALUES (?, ?, ?, ?) ' +
        'ON DUPLICATE KEY UPDATE session_confidence = ?, overall_confidence = ?',
        [userId, wordId, value, value, value, value]
      );

    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = WordService;