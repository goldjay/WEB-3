var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dSettings = require('../sqlsettings.js');
const jwt = require('jsonwebtoken');

router.post('/', function (req, res, next) {

      console.log('In the edit user section');

      var updatedFirst = req.body.firstName;
      var updatedLast = req.body.lastName;

      //Pulls the payload portion of the token.
      const tokenPayload = req.headers.authorization.split(' ')[1];

      var userId = '';
      console.log('Just about to verify and get userId');
      jwt.verify(tokenPayload, 'secretphrase123', (err, decoded) => {
        if (err) { return res.status(401).end(); }

        //Reassigns decoded user ID and account type.
        userId = decoded.sub;
        console.log('In editUser getting userID');
        console.log(userId);

      });

      console.log('Made it at least here!');
      var instance = mysql.createConnection({
        host: dSettings.host,
        user: dSettings.user,
        password: dSettings.password,
        database: dSettings.database,
      });

      console.log(updatedFirst);
      console.log(updatedLast);
      console.log(userId);
      var queryArray = [updatedFirst, updatedLast, userId];

      var userQuery = instance.query('UPDATE `user` SET `firstName`= ?, `lastName`= ? WHERE `id`= ?;', queryArray, function (err, result) {
          if (err) {
            throw err;
          } else {
            console.log('Updated User');

            instance.end(function (err) {
              console.log('Connection MySQL is now closed in editUser endpoint!');
            });

            res.send(true);
          }

        });

    });

module.exports = router;
