var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dSettings = require('../sqlsettings.js');
const jwt = require('jsonwebtoken');

router.post('/', function (req, res, next) {

      console.log('In the edit pass section');

      var updatedPass = req.body.password;
      var passCode = req.body.passReset;

      console.log('Made it at least here!');
      var instance = mysql.createConnection({
        host: dSettings.host,
        user: dSettings.user,
        password: dSettings.password,
        database: dSettings.database,
      });

      console.log(updatedPass);
      console.log(passCode);
      var queryArray = [updatedPass, passCode];

      var userQuery = instance.query('UPDATE `user` SET `password`= ?, `passReset`= null WHERE `passReset`= ?;', queryArray, function (err, result) {
          if (err) {
            throw err;
          } else {
            console.log('Updated Password!');

            instance.end(function (err) {
              console.log('Connection MySQL is now closed in editPass endpoint!');
            });

            res.send(true);
          }

        });

    });

module.exports = router;
