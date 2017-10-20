// config/passport.js

// load all the things we need
const jwt = require('jsonwebtoken');
const PassportLocalStrategy = require('passport-local').Strategy;

var mysql = require('mysql');

module.exports = new PassportLocalStrategy(
  {
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      session: false,
      passReqToCallback: true, // allows us to pass back the entire request to the callback
    },
  function (req, email, password, done) {

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    console.log('Made it into passport signup strategy!');
    console.log(req.body);

    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Test123',
      database: 'cassiopeia-db',
    });

    connection.query("select * from user where email = '" + email + "'", function (err, rows) {
      console.log(rows);
      console.log('above row object');
      if (err)
      return done(err);
      if (rows.length) {
        console.log('That email is already taken.');
        return done(null, false, { message: 'username already exists' });
      } else {

        user = req.body;
        var insertQuery = 'INSERT INTO `user` SET ?';
        console.log(insertQuery);
        connection.query(insertQuery, user, function (err, rows) {
          //newUserMysql.id = rows.insertId;

          return done(null);
        });
      }
    });
  });
