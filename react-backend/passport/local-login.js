// config/passport.js

// load all the things we need
const jwt = require('jsonwebtoken');
var LocalStrategy   = require('passport-local').Strategy;

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Test123',
  database: 'cassiopeia-db',
});

// expose this function to our app using module.exports
module.exports = function (passport) {

        passport.use('local-login', new LocalStrategy({
          // by default, local strategy uses username and password, we will override with email
          usernameField: 'email',
          passwordField: 'password',
          session: false,
          passReqToCallback: true, // allows us to pass back the entire request to the callback
        },
    function (req, email, password, done) { // callback with email and password from our form

          connection.query("SELECT * FROM `user` WHERE `email` = '" + email + "'",
          function (err, rows) {
            if (err)
                return done(err);
            if (!rows.length) {
              return done(null, false, console.log('No user found.'));

              // req.flash is the way to set flashdata using connect-flash
            }

            // if the user is found but the password is wrong
            if (!(rows[0].password == password))
                return done(null, false, console.log('Oops! Wrong password.'));

            // create the loginMessage and save it to session as flashdata
            const payload = {
              sub: rows[0],
            };

            const token = jwt.sign(payload, 'secretphrase123');
            const data = {
              name: rows[4],
            };

            return done(null, token, data);

          });
        }));

      };
