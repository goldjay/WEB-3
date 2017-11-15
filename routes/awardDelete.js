var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dSettings = require('../sqlsettings.js');
const jwt = require('jsonwebtoken');

router.post('/', function (req, res, next) {

  console.log(req.body);

  var deleteID = req.body.id;

  console.log(deleteID);

  var instance = mysql.createConnection({
    host: dSettings.host,
    user: dSettings.user,
    password: dSettings.password,
    database: dSettings.database,
  });

  var userQuery = instance.query('DELETE FROM `award` WHERE `id`= ?', deleteID, function (err, result) {
      if (err) throw err;
      console.log('Delete Award');

      instance.end(function (err) {
        console.log('Connection MySQL is now closed in awardDelete endpoint!');
      });

      res.send(result);
    });
});

module.exports = router;
