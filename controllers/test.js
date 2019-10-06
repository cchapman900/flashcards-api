'use strict';

const Helper = require('./_helper');
const Test = require('../services/test');

module.exports.hello = async event => {

  const response = Test.hello();

  return Helper.createResponse(200, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};