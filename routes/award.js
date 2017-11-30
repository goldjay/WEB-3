var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dSettings = require('../sqlsettings.js');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
var fs = require('fs');
const stream = require('stream');
var latex = require('gammalatex');
var path = require('path');

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

  //get the month and year in proper format
  var date = rDate.substring(5,7);
  var year = rDate.substring(0,4);
  var month;
  if (date == '01')
    month = 'January';
  if (date == '02')
    month = 'February';
  if (date == '03')
    month = 'March';
  if (date == '04')
    month = 'April';
  if (date == '05')
    month = 'May';
  if (date == '06')
    month = 'June';
  if (date == '07')
    month = 'July';
  if (date == '08')
    month = 'August';
  if (date == '09')
    month = 'September';
  if (date == '10')
    month = 'October';
  if (date == '11')
    month = 'November';
  if (date == '12')
    month = 'December';

  //LaTeX for the award certificate
  var string = [
              '\\documentclass{article}',
              '\\begin{document}',
              'This is some test text',
              '\\end{document}',
            ].join('\n');

  console.log('Made it pass wrapper');

  //parse the LaTeX
  latex.parse(string, function (err, readStream) {
    if (err) {
      console.log('Looks like there is an error with latex parse');
      throw err;
    }

    console.log('in latex parser');

    //use nodemailer to email the parsed LaTeX PDF with a short message
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'cassiopeia.awards@gmail.com',
        pass: 'themightyscot',
      },
    });

    var mailOptions = {
      from: 'cassiopeia.awards@gmail.com',
      to: rEmail,
      subject: 'Congratulations',
      text: 'You are the ' + awardType + '!',
      attachments: [

        {
            filename: 'award.pdf',
            content: readStream,
          },
        ],
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log('Looks like there is an error with sendMail');
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);

        //Pulls the payload portion of the token.
        const tokenPayload = req.headers.authorization.split(' ')[1];

        var userId = '';
        console.log('Just about to verify and get userId');

        //Verifies and decodes sent token.
        jwt.verify(tokenPayload, 'secretphrase123', (err, decoded) => {
          if (err) {
            console.log('Looks like there is an error with jwt verify');
            return res.status(401).end();
          }

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
            if (err) {
              console.log('Looks like there is an error with award query');
              throw err;
            }

            console.log('Queried user');
            console.log(result[0].email);
            sEmail = result[0].email;

            console.log('This is the email to query');
            console.log(sEmail);

            console.log('About to send!');
            var queryArray = [awardType, rFirst, rLast, rEmail, rDate, sEmail];
            var query = instance.query("INSERT INTO `award`(`creatorId`, `type`, `receiverFirstName`, `receiverLastName`, `receiverEmail`, `timeGiven`)SELECT id, ?, ?, ?, ?, ? FROM user WHERE user.email = ?", queryArray, function (err, result) {
                if (err) {
                  console.log('Error found in insertion query in award.');
                  throw err;
                }

                console.log('Inserted award successfully');
              });

            instance.end(function (err) {
              console.log('Connection MySQL is now closed in award endpoint!');
            });

            res.send(true);
          });
      }
    });
  });

});

module.exports = router;
