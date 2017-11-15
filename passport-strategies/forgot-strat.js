//Referenced: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
//Referenced: https://github.com/XBLDev/ReactJSNodejsAuthRouterv4
const jwt = require('jsonwebtoken');
const StrategyForgot = require('passport-local').Strategy;
var dSettings = require('../sqlsettings.js');
var mysql = require('mysql');

module.exports = new StrategyForgot({
          //Declared fields needed for passport middleware.
          usernameField: 'email',
          passwordField: 'password',
          session: false,
          passReqToCallback: true,
        },
    function (req, email, password, done) {
      console.log('In forgot strategy.');
      var instance = mysql.createConnection({
        host: dSettings.host,
        user: dSettings.user,
        password: dSettings.password,
        database: dSettings.database,
      });

      //Confirm that the username exists in the database
      instance.query("SELECT * FROM `user` WHERE `email` = '" + email + "'",
          function (err, rows) {
            if (err)
                return done(err);

            //If the query does not turn up any results.
            if (!rows.length) {
              console.log('No user found.');
              instance.end(function (err) {
                console.log('Connection MySQL is now closed in login-strat!');
              });

              return done(null, false, { message: 'No user found.' });
            }

            console.log(rows[0]);

            const additionalData = {
              id: rows[0].id,
            };

            instance.end(function (err) {
              console.log('Connection MySQL is now closed in login-strat!');
            });

            return done(null, true, additionalData);

          });
    });
