'use strict';

const createResponse = require('./_helper').createResponse;

const WordService = require('../services/word');
const db = require('../utils/db').connect();
const wordService = new WordService(db);


/**
 * GET WORDS
 *
 * @param {{
 *
 * }} event
 * @returns {Promise<{headers, statusCode}>}
 */
module.exports.getWords = async event => {

  const words = await wordService.getWords();

  return createResponse(200, words);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

/**
 * GET WORD BY ID
 *
 * @param {{
 *
 * }} event
 * @returns {Promise<{headers, statusCode}>}
 */
module.exports.getWord = async event => {

  const word = await wordService.getWord();

  return createResponse(200, word);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};