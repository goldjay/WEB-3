var mysql = require('mysql');
var dSettings = require('./sqlsettings.js');

var pool;
var config = {
  user: 'foo',
  database: 'my_db',
  password: 'secret',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
};

module.exports = {
    getPool: function () {
      // if it is already there, grab it here
      if (pool){
        return pool;
      }
      pool = mysql.createPool({
        connectionLimit : 10,
        host: dSettings.host,
        user: dSettings.user,
        password: dSettings.password,
        database: dSettings.database,
        debug: true
      });
      return pool;
}
};

// var mysql = require('mysql');
// var pool  = mysql.createPool({
//   connectionLimit : 10,
//   host            : 'example.org',
//   user            : 'bob',
//   password        : 'secret',
//   database        : 'my_db'
// });
//
// pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
