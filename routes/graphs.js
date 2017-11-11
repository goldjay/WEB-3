var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dSettings = require('../sqlsettings.js');
const jwt = require('jsonwebtoken');

router.post('/', function (req, res, next) {

  console.log("INSIDE OF THE GRAPH ROUTE!!");

  var instance = mysql.createConnection({
    host: dSettings.host,
    user: dSettings.user,
    password: dSettings.password,
    database: dSettings.database,
  });

  console.log('Made it at least here!');
//SELECT receiverFirstName, receiverLastName, COUNT(*) FROM award GROUP BY receiverFirstName, receiverLastName ORDER BY COUNT(*)

var sqlQuery = 'SELECT receiverFirstName, receiverLastName, COUNT(*) FROM `award` GROUP BY receiverFirstName, receiverLastName ORDER BY COUNT(*)';

instance.query(sqlQuery, function (err, result) {
  if (err) throw err;
  console.log(result);
  res.json(result);
});

instance.end(function (err) {
    console.log('Connection MySQL is now closed in the users endpoint!');
  });


 });

module.exports = router;
