/**
 * Create a response
 * @param statusCode: number
 * @param message: string - Optional
 */
module.exports.createResponse = (statusCode, message) => {
  let response = {
    statusCode: statusCode,
    headers: {"content-type": "application/json"},
  };

  if (message) {
    response.body = JSON.stringify(message);
  }

  return response
};