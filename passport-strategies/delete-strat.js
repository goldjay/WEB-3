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

    console.log('Made it into passport delete strategy!');
    console.log(req.body);

    //Connects to SQL database
    var instance = mysql.createConnection({
      host: dSettings.host,
      user: dSettings.user,
      password: dSettings.password,
      database: dSettings.database,
    });

    console.log("HERE IS THE REQUEST: ");
    console.log(req.body);

    instance.connect(function(err) {
      if (err) console.log("ERROR CONNECTING TO DB FROM EDIT");
      var email = req.body['email'].toLowerCase();



      var deleteQuery = "DELETE from `user` WHERE email = " + "'" +email+ "'";

      // BUG: DELETE ERRORS OUT WHEN THE USER HAS CREATED AWARDS

      instance.query(deleteQuery, function (err, result) {
         if (err) throw err;
         console.log("RESULT FROM DELETE");
         console.log(result);
         instance.end(function (err) {
             console.log('Connection MySQL is now closed in delete-strat');
           });

         return done(null,result);
      });
  });
});
