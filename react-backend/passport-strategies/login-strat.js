//Referenced: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
//Referenced: https://github.com/XBLDev/ReactJSNodejsAuthRouterv4
const jwt = require('jsonwebtoken');
const StrategyLogin = require('passport-local').Strategy;
var dSettings = require('../sqlsettings.js');
var mysql = require('mysql');

module.exports = new StrategyLogin({
          //Declared fields needed for passport middleware.
          usernameField: 'email',
          passwordField: 'password',
          session: false,
          passReqToCallback: true,
        },
    function (req, email, password, done) {
      console.log('In login strategy.');
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
              return done(null, false, { message: 'No user found.' });
            }

            console.log(rows[0]);
            console.log(rows[0].password);

            //Checks if the password matches the given password.
            if (!(rows[0].password == password)) {
              console.log('Oops! Wrong password.');
              return done(null, false, { message: 'Wrong Password' });
            }

            //Checks to make sure the account is an admin account.
            if ((rows[0].type != 'generic')) {
              console.log('This is an admin account');
              return done(null, false, { message: 'Wrong type of an account.' });
            }

            console.log('Password is a match!');

            //Contents of the JSON Web Token payload
            const payloadContents = {
              sub: rows[0].id,  //Used for further endpoint verification
            };

            //Creates a JWT using secret phrase
            const jwToken = jwt.sign(payloadContents, 'secretphrase123');

            var fullName = rows[0].firstName + ' ' + rows[0].lastName;

            //Additional user data for header population.
            const additionalData = {
              name: fullName,
            };

            return done(null, jwToken, additionalData);

          });
    });
