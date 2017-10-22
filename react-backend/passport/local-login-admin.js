// config/passport.js

// load all the things we need
const jwt = require('jsonwebtoken');
const PassportLocalStrategy = require('passport-local').Strategy;

var mysql = require('mysql');

module.exports = new PassportLocalStrategy({
          // by default, local strategy uses username and password, we will override with email
          usernameField: 'email',
          passwordField: 'password',
          session: false,
          passReqToCallback: true, // allows us to pass back the entire request to the callback
        },
    function (req, email, password, done) { // callback with email and password from our form
      console.log('In admin login strategy.');
      var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Test123',
        database: 'cassiopeia-db',
      });

      connection.query("SELECT * FROM `user` WHERE `email` = '" + email + "'",
          function (err, rows) {
            if (err)
                return done(err);
            if (!rows.length) {
              console.log('No user found.');
              return done(null, false, { message: 'No user found.' });
            }

            console.log(rows[0]);
            console.log(rows[0].password);

            // if the user is found but the password is wrong
            if (!(rows[0].password == password)) {
              console.log('Oops! Wrong password.');
              return done(null, false, { message: 'Wrong Password' });
            }

            if ((rows[0].type != 'admin')) {
              console.log('This is a generic user account');
              return done(null, false, { message: 'Wrong type of an account.' });
            }

            console.log('Password is a match!');

            // create the loginMessage and save it to session as flashdata
            const payload = {
              sub: rows[0].id,
            };

            const token = jwt.sign(payload, 'secretphrase123');
            const data = {
              name: rows[0].firstName,
            };

            return done(null, token, data);

          });
    });
