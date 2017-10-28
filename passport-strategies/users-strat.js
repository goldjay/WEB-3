//Referenced: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
//Referenced: https://github.com/XBLDev/ReactJSNodejsAuthRouterv4
//Referenced: https://gist.github.com/manjeshpv/84446e6aa5b3689e8b84
const jwt = require('jsonwebtoken');
const StrategySignup = require('passport-local').Strategy;
var dSettings = require('../sqlsettings.js');
var mysql = require('mysql');
var db = require('../dbConnect.js');

module.exports = new StrategySignup({
      //Declared fields needed for passport middleware.
      usernameField: 'email',
      passwordField: 'password',
      session: false,
      passReqToCallback: true,
    },
  function (req, email, password, done) {

    console.log('Made it into passport users strategy!');
    console.log(req.body);

    //Connects to SQL database
    // var instance = mysql.createConnection({
    //   host: dSettings.host,
    //   user: dSettings.user,
    //   password: dSettings.password,
    //   database: dSettings.database,
    // });
    //
    var instance = db.getPool();

    var userType = req.body['userType'].toLowerCase();
    console.log("USERTYPE: " + userType);

    var sqlQuery = "SELECT * from `user`";

    if(userType !== 'all'){
      sqlQuery +=  "WHERE `type` =" + "'" + userType + "' ORDER BY `createDate` DESC";
    }

    instance.query(sqlQuery, function (err, result) {
       if (err) throw err;
       instance.release();
       res.json(result);
     });
  });
