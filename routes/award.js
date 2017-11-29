var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dSettings = require('../sqlsettings.js');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
var fs = require('fs');
const stream = require('stream');
var latex = require("gammalatex");
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
  '\\documentclass[fontsize=16pt]{scrartcl}',
  '\\usepackage[a4paper,left=2cm,right=2cm,top=2cm,bottom=2cm]{geometry}',
  '\\usepackage{pdflscape,setspace,amsmath,amssymb}',
  '\\usepackage[utf8]{inputenc}',
  '\\usepackage[T1]{fontenc}',
  '\\usepackage{calligra}',
  '\\usepackage{tgschola}',
  '\\usepackage{fourier-orns}',
  '\\usepackage{graphicx}',
  '\\usepackage{wallpaper}',
  '\\usepackage{multirow}',
  '\\usepackage{attachfile}',
  '\\usepackage[normalem]{ulem}',
  '\\usepackage{charter}',
  '\\usepackage{microtype}',
  '\\hyphenpenalty 100000',
  '%=============================',
  '\\input Zallman.fd',
  '\\newcommand*\\initfamily{\\usefont{U}{Zallman}{xl}{n}}',
  '%=============================',
  '\\def\\signature#1#2{\\parbox[b]{1in}{\\smash{#1}\\vskip12pt}',
  '\\hfill \\parbox[t]{2.8in}{\\shortstack{\\vrule width 2.8in height 0.4pt\\\\#2}}}',
  '\\def\\sigskip{\\vskip0.4in plus 0.1in}',
        '\\def\\beginskip{\\vskip0.5875in plus 0.1in}',
  '%=============================',
  '\\definecolor{title}{RGB}{180,0,0}',
  '\\definecolor{other}{RGB}{171,0,255}',
  '\\definecolor{name}{RGB}{255,0,0}',
  '\\definecolor{blue}{RGB}{0,0,240}',
  '%=============================',
  '\\begin{document}',
  '\\begin{landscape}',
  '\\linespread{2}\\selectfont',
  '\\pagestyle{empty}',
  '%=============================',
  '\\noindent',
  '\\begin{minipage}[l]{1.5in}',
  '\\end{minipage}',
  '\\hfill',
  '%=============================',
  '\\begin{minipage}[c]{6.5in}',
  '{\\centering',
  '{\\onehalfspacing',
      '{\\LARGE\\bfseries {\\color{blue}{{ ' + awardType + '}}}}\\',
      '\\vskip0.4em',
      '{\\calligra '+month+'} -- {\\calligra '+year+'\\\\}',
      '\\vskip0.4em',

      '{\\large This is to certify that the employees at large of\\\\}',
      '{\\Large\\bfseries\\color{blue}{Cassiopeia Industries \\\\}}',
      '{\\large have voted \\uline{\\MakeUppercase{' + rFirst + ' ' + rLast + '}}}}\\\\',
      '\\par}',
  '\\end{minipage}',
  '\\hfill',
  '%=============================',
  '\\begin{minipage}[r]{1.5in}',
  '\\end{minipage}',
  '\\vskip1em',
  '\\vskip3.4em',
  '%=============================',
  '\\begin{minipage}[l]{1.5in}',
  '\\end{minipage}',
  '\\hfill',
  '\\begin{minipage}[c]{6.5in}',
  '{\\centering',
  '{\\onehalfspacing',
    '{\\color{pink}\\Large\\decofourleft\\quad{\\color{blue}\\decoone}\\quad\\decofourright}',
    '\\vskip0.5em',    
      '{\\large\\bfseries \\color{title}{ ' + awardType + ' }}\\par',
      '\\vskip0.5em',
      '{\\color{pink}\\Large\\decofourright\\quad{\\color{blue}\\decoone}\\quad\\decofourleft}',
      '\\par}}',
  '\\end{minipage}',
  '\\hfill',
  '\\begin{minipage}[r]{1.5in}',
  '\\end{minipage}',
  '%=============================',
  '\\noindent',
  '\\vfil',
  '{\\singlespacing',
  '\\hfill',
  '\\begin{minipage}[c]{2.8in}',
  '\\sigskip \\signature{\\large}{Manager, Cassiopeia Industries}',
  '\\end{minipage}',
  '\\hfill}',
  '%=============================',
  '\\pagebreak',
  '\\end{landscape}',
  '\\end{document}',  
    ].join('\n');
  
  //parse the LaTeX
  latex.parse(string, function(err, readStream){
    if(err) throw err;
    
    //use nodemailer to email the parsed LaTeX PDF with a short message
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'cassiopeia.award@gmail.com',
        pass: 'themightyscot'
      }
    });

    var mailOptions = {
      from: 'themightyscot@gmail.com',
      to: rEmail,
      subject: 'Congratulations',
      text: 'You are the ' + awardType + '!',
      attachments: [
     
        {
            filename: 'award.pdf',
            content: readStream
        },
      ]

    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  });

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
