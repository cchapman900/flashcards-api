const mysql = require('mysql');
const { promisify } = require('util');

const pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'hebrew',
  port     : '8889'
});

exports.query = promisify(pool.query).bind(pool);