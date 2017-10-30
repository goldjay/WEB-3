var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dSettings = require('../sqlsettings.js');
const jwt = require('jsonwebtoken');

router.post('/', function (req, res, next) {

      console.log('In the awardReturn section');

      //Pulls the payload portion of the token.
      const tokenPayload = req.headers.authorization.split(' ')[1];

      var userId = '';
      console.log('Just about to verify and get userId');
      jwt.verify(tokenPayload, 'secretphrase123', (err, decoded) => {
        if (err) { return res.status(401).end(); }

        //Reassigns decoded user ID and account type.
        userId = decoded.sub;
        console.log('In awardReturn getting userID');
        console.log(userId);

      });

      console.log('Made it at least here!');
      var instance = mysql.createConnection({
        host: dSettings.host,
        user: dSettings.user,
        password: dSettings.password,
        database: dSettings.database,
      });

      var userQuery = instance.query('SELECT * FROM `award` WHERE `creatorId`= ?', userId, function (err, result) {
          if (err) throw err;
          console.log('Queried award');

          instance.end(function (err) {
            console.log('Connection MySQL is now closed in awardReturn endpoint!');
          });

          res.send(result);
        });

    });

module.exports = router;
