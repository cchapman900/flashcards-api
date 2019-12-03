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
    let limit = 10;

    if (queryStringParameters) {
      partOfSpeech = queryStringParameters.partOfSpeech;
      limit = queryStringParameters.limit;
    }

    const words = await wordService.getWords(partOfSpeech, limit);

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
    const userId = process.env.CHRIS_USER_ID; // Temporary until set up Auth0

    if (!wordId || !ObjectId.isValid(wordId)) {
      return createResponse(400, 'Word ID not valid');
    }

    const word = await wordService.getWord(wordId, userId);

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

/**
 * UPDATE WORD CONFIDENCE
 *
 * @param {{
 *  pathParameters: {
 *    wordId: string
 *  },
 *  body: {
 *    direction: string,
 *    value: number
 *  }
 * }} event
 * @returns {Promise<{headers, statusCode}>}
 */
module.exports.updateWordConfidence = async event => {
  try {
    // Get the path parameters
    const pathParams = event.pathParameters;
    const wordId = pathParams.wordId;

    // Get the request body
    const request = JSON.parse(event.body);
    const userId = process.env.CHRIS_USER_ID; // Temporary until set up Auth0
    const direction = request.direction;
    const value = request.value;

    if (!wordId || !ObjectId.isValid(wordId) || !userId || !direction || !value) {
      return createResponse(400, 'Invalid request');
    }

    const updateResponse = await wordService.updateWordConfidence(wordId, userId, direction, value);

    if (updateResponse) {
      return createResponse(200, updateResponse);
    } else {
      console.error('Could not find word');
      return createResponse(404, 'Could not find word');
    }
  } catch (e) {
    return createResponse(500, e);
  }
};
