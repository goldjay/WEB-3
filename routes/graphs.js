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

if(req.body.type === 'receiver'){
  var sqlQuery = 'SELECT receiverFirstName, receiverLastName, COUNT(*) as count FROM `award` GROUP BY receiverFirstName, receiverLastName ORDER BY count LIMIT 10';

  console.log("RECEIVER QUERY!!!");

  instance.query(sqlQuery, function (err, result) {
    if (err) throw err;

    var resObj = [];
    result.forEach((item, idx) => {
       resObj.push({x: resObj.length + 1, y: parseInt(item['count']), name: (item['receiverFirstName'] + ' ' + item['receiverLastName'])});
    });

    res.json(resObj);
  });
  instance.end(function (err) {
      console.log('Connection MySQL is now closed in the users endpoint!');
    });
}else if(req.body.type === 'giver'){
  var sqlQuery = 'SELECT Y.firstName, Y.lastName, X.count FROM (SELECT creatorID, COUNT(*) as count FROM `award` GROUP BY creatorId ORDER BY count) AS X INNER JOIN (SELECT * FROM `user`) AS Y WHERE X.creatorID = Y.id';

  console.log("GIVER QUERY");

  instance.query(sqlQuery, function (err, result) {
    if (err) throw err;
    console.log(result);
    var resObj = [];
    result.forEach((item, idx) => {
       resObj.push({x: resObj.length + 1, y: parseInt(item['count']), name: (item['firstName'] + ' ' + item['lastName'])});
    });

    console.log(resObj);

    res.json(resObj);
  });

  instance.end(function (err) {
      console.log('Connection MySQL is now closed in the users endpoint!');
    });
}





 });

module.exports = router;
