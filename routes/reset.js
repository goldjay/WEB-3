var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dSettings = require('../sqlsettings.js');
const jwt = require('jsonwebtoken');

router.post('/', function (req, res, next) {

      console.log('In the reset section');

      var userCode = req.body.code;

      console.log('Made it at least here!');
      var instance = mysql.createConnection({
        host: dSettings.host,
        user: dSettings.user,
        password: dSettings.password,
        database: dSettings.database,
      });

      console.log(userCode);

      var userQuery = instance.query('SELECT * FROM `user` WHERE `passReset`= ?', userCode, function (err, result) {
          if (err) throw err;
          console.log('Queried user for reset pass.');
          console.log(result);
          if (result.length)
          {
            console.log('Found a password to reset');
            instance.end(function (err) {
              console.log('Connection MySQL is now closed in reset endpoint!');
            });

            res.status(200).send('Success!');
          } else {
            console.log('No reset code found.');

            instance.end(function (err) {
              console.log('Connection MySQL is now closed in reset endpoint!');
            });

            res.status(400).send('No password reset code in DB');
          }
        });

    });

module.exports = router;
