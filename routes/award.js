var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dSettings = require('../sqlsettings.js');
const jwt = require('jsonwebtoken');

router.post('/', function (req, res, next) {

  var awardBody = req.body;
  console.log(awardBody);

  var awardType = '';
  var rFirst = req.body.receiverFirstName;
  var rLast = req.body.receiverLastName;
  var rEmail = req.body.receiverEmail;
  var rDate = req.body.timeGiven;
  var sEmail = '';

  if (req.body.type == 'empWeek')
  {
    awardType = 'Employee of the Week';
  } else if (req.body.type == 'empMonth')
  {
    awardType = 'Employee of the Month';
  }

  var queryArray = [awardType, rFirst, rLast, rEmail, rDate];

  //Pulls the payload portion of the token.
  const tokenPayload = req.headers.authorization.split(' ')[1];

  var userId = '';
  console.log('Just about to verify and get userId');
  //Verifies and decodes sent token.
  jwt.verify(tokenPayload, 'secretphrase123', (err, decoded) => {
    if (err) { return res.status(401).end(); }

    //Reassigns decoded user ID and account type.
    userId = decoded.sub;
    console.log('In award getting userID');
    console.log(userId);

  });

  console.log('Made it at least here!');
  var instance = mysql.createConnection({
    host: dSettings.host,
    user: dSettings.user,
    password: dSettings.password,
    database: dSettings.database,
  });

  var userQuery = instance.query('SELECT * FROM `user` WHERE `id`= ?', userId, function (err, result) {
      if (err) throw err;
      console.log('Queried user');
      console.log(result[0].email);
      sEmail = result[0].email;

      console.log('This is the email to query');
      console.log(sEmail);

      console.log('About to send!');
      var queryArray = [awardType, rFirst, rLast, rEmail, rDate, sEmail];
      var query = instance.query("INSERT INTO `award`(`creatorId`, `type`, `receiverFirstName`, `receiverLastName`, `receiverEmail`, `timeGiven`)SELECT id, ?, ?, ?, ?, ? FROM user WHERE user.email = ?", queryArray, function (err, result) {
          if (err) throw err;
          console.log('Inserted award successfully');
        });

      instance.end(function (err) {
        console.log('Connection MySQL is now closed in award endpoint!');
      });

        res.send(true);
    });

});

module.exports = router;
