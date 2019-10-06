const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;

const mongoString = process.env.DB_CONNECTION_STRING;

module.exports.connect = () => {
  return mongoose.connect(mongoString, {useNewUrlParser: true});
};