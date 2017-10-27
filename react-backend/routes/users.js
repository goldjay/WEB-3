var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dSettings = require('../sqlsettings.js');

/* GET users listing. */
router.post('/', function(req, res, next) {

  var userType = req.body.userType.toLowerCase();
  console.log('YOUR USER TYPE: ' + userType);

  var instance = mysql.createConnection({
    host: dSettings.host,
    user: dSettings.user,
    password: dSettings.password,
    database: dSettings.database,
  });

  instance.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

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
  });
});

module.exports = router;
