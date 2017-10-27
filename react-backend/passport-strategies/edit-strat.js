const jwt = require('jsonwebtoken');
const StrategySignup = require('passport-local').Strategy;
var dSettings = require('../sqlsettings.js');
var mysql = require('mysql');

module.exports = new StrategySignup({
      //Declared fields needed for passport middleware.
      usernameField: 'email',
      passwordField: 'password',
      session: false,
      passReqToCallback: true,
    },
  function (req, email, password, done) {

    console.log('Made it into passport edit strategy!');
    console.log(req.body);

    //Connects to SQL database
    var instance = mysql.createConnection({
      host: dSettings.host,
      user: dSettings.user,
      password: dSettings.password,
      database: dSettings.database,
    });

    // If the email has changed, check for an existing user with that email
    if(req.body.userName !== req.body.email){
      //Queries database to see if desired username already exists.
      instance.query("select * from user where email = '" + email + "'", function (err, rows) {
        console.log(rows);
        if (err)
        return done(err);

        if (rows.length) {
          console.log('The new email is already taken.');
          return done(null, false, { message: 'username already exists' });
        }
      });
    }

    var userName = req.body['userName'].toLowerCase();
    var email = req.body['email'].toLowerCase();
    var password = req.body['password'].toLowerCase();
    var firstName = req.body['firstName'].toLowerCase();
    var lastName = req.body['lastName'].toLowerCase();
    //var signature = req.body['signature'].toLowerCase();

          // TO DO: ADD SIGNATURE
           var sqlQuery = "UPDATE user SET firstName = '" + firstName + "', lastName = '" +lastName+ "', password = '" +password+ "', email = '" +email+ "' WHERE email = '" + userName + "'";
           instance.query(sqlQuery, function (err, result) {
              if (err) throw err;
              console.log("RESULT");
              console.log(result);
              return done(null,result);
              // return done(null);
              // res.send(result);

            });
  });
