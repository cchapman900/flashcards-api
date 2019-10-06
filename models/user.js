const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  _id: 'string',
  email: 'string',
  name: 'string',
  picture: 'string',
});

module.exports = mongoose.model('User', schema);