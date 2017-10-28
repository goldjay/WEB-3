var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dSettings = require('../sqlsettings.js');
var db = require('../dbConnect.js');

/* GET users listing. */
router.post('/', function(req, res, next) {

  var userType = req.body.userType.toLowerCase();
  console.log('YOUR USER TYPE: ' + userType);

  // var instance = mysql.createConnection({
  //   host: dSettings.host,
  //   user: dSettings.user,
  //   password: dSettings.password,
  //   database: dSettings.database,
  //   debug: true
  // });

  var instance = db.getPool();

  instance.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("Connected!");

    var userType = req.body['userType'].toLowerCase();
    console.log("USERTYPE: " + userType);

    var sqlQuery = "SELECT * from `user`";

    if(userType !== 'all'){
      sqlQuery +=  "WHERE `type` =" + "'" + userType + "' ORDER BY `createDate` DESC";
    }

    connection.query(sqlQuery, function (err, result) {
       if (err) throw err;
       connection.release();
       res.json(result);
     });
  });
});



module.exports = router;
