//Referenced: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
//Referenced: https://github.com/XBLDev/ReactJSNodejsAuthRouterv4
//Referenced: https://gist.github.com/manjeshpv/84446e6aa5b3689e8b84
const jwt = require('jsonwebtoken');
const StrategySignup = require('passport-local').Strategy;
var mysql = require('mysql');

module.exports = new StrategySignup({
      //Declared fields needed for passport middleware.
      usernameField: 'email',
      passwordField: 'password',
      session: false,
      passReqToCallback: true,
    },
  function (req, email, password, done) {

    console.log('Made it into passport signup strategy!');
    console.log(req.body);

    //Connects to SQL database
    var instance = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Test123',
      database: 'cassiopeia-db',
    });

    //Queries database to see if desired username already exists.
    instance.query("select * from user where email = '" + email + "'", function (err, rows) {
      console.log(rows);
      if (err)
      return done(err);

      //If there is a result from query there is already a user.
      if (rows.length) {
        console.log('That email is already taken.');
        return done(null, false, { message: 'username already exists' });
      } else {

        //Pulls user data from request body.
        user = req.body;

        //Inserts new user into database
        var insertQuery = 'INSERT INTO `user` SET ?';
        console.log(insertQuery);
        instance.query(insertQuery, user, function (err, rows) {

          return done(null);
        });
      }
    });
  });
