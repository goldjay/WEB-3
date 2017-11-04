//Referenced: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
//Referenced: https://github.com/XBLDev/ReactJSNodejsAuthRouterv4
//Referenced: https://gist.github.com/manjeshpv/84446e6aa5b3689e8b84
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

    console.log('Made it into passport signup strategy!');
    console.log(req.body);

    //Connects to SQL database
    var instance = mysql.createConnection({
      host: dSettings.host,
      user: dSettings.user,
      password: dSettings.password,
      database: dSettings.database,
    });

    //Queries database to see if desired username already exists.
    instance.query("select * from user where email = '" + email + "'", function (err, rows) {
      console.log(rows);
      if (err) {
        return done(err);
      }

      //If there is a result from query there is already a user.
      if (rows.length) {
        console.log('That email is already taken.');
        instance.end(function (err) {
          console.log('Connection MySQL in signup strat is now closed!');
        });

        return done(null, false, { message: 'username already exists' });
      } else {

        //Pulls user data from request body.
        user = req.body;

        //Inserts new user into database
        var insertQuery = 'INSERT INTO `user` SET ?';
        console.log(insertQuery);
        instance.query(insertQuery, user, function (err, rows) {
          if(err){
            console.log(err);
          }else{
            console.log("SUCESSFULLY INSERTED!");
            console.log('Inside insertQuery');
            console.log(err);
            console.log(rows);
            instance.end(function (err) {
              if(err) console.log(err);
              console.log('Connection MySQL in signup strat is now closed!');
            });
          }


          return done(null);
        });
      }
    });
  });
