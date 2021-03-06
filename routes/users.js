var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dSettings = require('../sqlsettings.js');
var db = require('../dbConnect.js');

/* GET users listing. */
router.post('/', function(req, res, next) {

  var userType = req.body.userType.toLowerCase();
  console.log('INSIDE USERS ROUTE: ' + userType);

  var instance = mysql.createConnection({
    host: dSettings.host,
    user: dSettings.user,
    password: dSettings.password,
    database: dSettings.database,
    debug: true,
  });

  var userType = req.body['userType'].toLowerCase();
  console.log("USERTYPE: " + userType);

  var sqlQuery = "SELECT * from `user`";

  if(userType !== 'all'){
    sqlQuery +=  "WHERE `type` =" + "'" + userType + "' ORDER BY `createDate` DESC";
  }

  instance.query(sqlQuery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });

  instance.end(function (err) {
      console.log('Connection MySQL is now closed in the users endpoint!');
    });

});

module.exports = router;
