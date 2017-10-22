//Referenced: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
//Referenced: https://github.com/XBLDev/ReactJSNodejsAuthRouterv4
const jwt = require('jsonwebtoken');
const StrategyLoginAdmin = require('passport-local').Strategy;
var mysql = require('mysql');

module.exports = new StrategyLoginAdmin({
          //Declared fields needed for passport middleware.
          usernameField: 'email',
          passwordField: 'password',
          session: false,
          passReqToCallback: true,
        },
    function (req, email, password, done) {

      console.log('In admin login strategy.');

      var instance = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Test123',
        database: 'cassiopeia-db',
      });

      //Confirm that the username exists in database
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
              console.log('Wrong password.');
              return done(null, false, { message: 'Wrong Password' });
            }

            //Checks to make sure the account is an admin account.
            if ((rows[0].type != 'admin')) {
              console.log('This is a generic user account');
              return done(null, false, { message: 'Wrong type of an account.' });
            }

            console.log('Password is a match!');

            //Contents of the JSON Web Token payload
            const payloadContents = {
              sub: rows[0].id,  //Used for further endpoint verification
              type: 'admin',    //Used for endpoint admin verificaiton
            };

            //Creates a JWT using secret phrase
            const jwToken = jwt.sign(payloadContents, 'secretphrase123');

            //Additional user data for header population.
            const additionalData = {
              name: rows[0].firstName,
            };

            return done(null, jwToken, additionalData);

          });
    });
