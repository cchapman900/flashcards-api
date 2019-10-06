'use strict';

const ObjectId = require('mongoose').Types.ObjectId;

const createResponse = require('./_helper').createResponse;

const WordService = require('../services/word');
const db = require('../utils/db').connect();
const wordService = new WordService(db);


/**
 * GET WORDS
 *
 * @param {{
 *  queryStringParameters: {
 *    partOfSpeech: string
 *  }
 * }} event
 * @returns {Promise<{headers, statusCode}>}
 */
module.exports.getWords = async event => {
  try {
    const queryStringParameters = event.queryStringParameters;
    let partOfSpeech;

    if (queryStringParameters) {
      partOfSpeech = queryStringParameters.partOfSpeech;
    }

    const words = await wordService.getWords(partOfSpeech);

    return createResponse(200, words);
  } catch (e) {
    return createResponse(500, e);
  }

};

/**
 * GET WORD BY ID
 *
 * @param {{
 *  pathParameters: {
 *    wordId: string
 *  }
 * }} event
 * @returns {Promise<{headers, statusCode}>}
 */
module.exports.getWord = async event => {
  try {
    // Get the path parameters
    const pathParams = event.pathParameters;
    const wordId = pathParams.wordId;

    if (!wordId || !ObjectId.isValid(wordId)) {
      return createResponse(400, 'Word ID not valid');
    }

    const word = await wordService.getWord(wordId);

    if (word) {
      return createResponse(200, word);
    } else {
      console.error('Could not find word');
      return createResponse(404, 'Could not find word');
    }
  } catch (e) {
    return createResponse(500, e);
  }
};