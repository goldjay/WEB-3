var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dSettings = require('../sqlsettings.js');

router.post('/', function (req, res, next) {

  var awardBody = req.body;
  console.log(awardBody);

  var awardType = '';
  var rFirst = req.body.receiverFirstName;
  var rLast = req.body.receiverLastName;
  var rEmail = req.body.receiverEmail;
  var rDate = req.body.timeGiven;

  if (req.body.type == 'empWeek')
  {
    awardType = 'Employee of the Week';
  } else if (req.body.type == 'empMonth')
  {
    awardType = 'Employee of the Month';
  }

  var queryArray = [awardType, rFirst, rLast, rEmail, rDate];

  console.log('Made it at least here!');
  var instance = mysql.createConnection({
    host: dSettings.host,
    user: dSettings.user,
    password: dSettings.password,
    database: dSettings.database,
  });

  console.log('About to send!');
  var query = instance.query("INSERT INTO `award`(`creatorId`, `type`, `receiverFirstName`, `receiverLastName`, `receiverEmail`, `timeGiven`)SELECT id, ?, ?, ?, ?, ? FROM user WHERE user.firstName = 'Sally' AND user.lastName = 'Jones'", queryArray, function (err, result) {
      if (err) throw err;
      console.log('Inserted user successfully');
    });

  instance.end(function (err) {
    console.log('Connection MySQL is now closed in award endpoint!');
  });

  res.send(true);

});

module.exports = router;
