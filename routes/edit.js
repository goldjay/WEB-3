var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dSettings = require('../sqlsettings.js');

/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log("IN THE EDIT ROUTE!!!!!!: ");
  console.log(req.body);

  var instance = mysql.createConnection({
    host: dSettings.host,
    user: dSettings.user,
    password: dSettings.password,
    database: dSettings.database,
  });

  instance.connect(function(err) {
    if (err) console.log("ERROR CONNECTING TO DB FROM EDIT");

    // TO DO: Add conditional based on userType

    var userName = req.body['userName'].toLowerCase();
    var email = req.body['email'].toLowerCase();
    var password = req.body['password'].toLowerCase();
    var firstName = req.body['firstName'].toLowerCase();
    var lastName = req.body['lastName'].toLowerCase();
    //var signature = req.body['signature'].toLowerCase();

    // If the user changes the email, check to see if the email is already taken
    if(email !== userName){
      var checkQuery = "SELECT * from `user` WHERE email = " + "'" +email+ "'";

      instance.query(checkQuery, function (err, result) {
         if (err) throw err;
         console.log("RESULT");
         console.log(result);
         // If nothing is found, make the update
         if(result.length === 0){
           var sqlQuery = "UPDATE user SET firstName = '" + firstName + "', lastName = '" +lastName+ "', password = '" +password+ "', email = '" +email+ "' WHERE email = '" + userName + "'";
           instance.query(sqlQuery, function (err, result) {
              if (err) throw err;
              console.log("RESULT");
              console.log(result);
              res.json(result);
            });
         }else{
           res.send(false);
         }
       });
    }
  });
});

module.exports = router;
