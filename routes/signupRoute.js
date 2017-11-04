var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dSettings = require('../sqlsettings.js');
var db = require('../dbConnect.js');

router.post('/', function(req, res, next) {

  var user = req.body;
  console.log(user);

  var instance = mysql.createConnection({
    host: dSettings.host,
    user: dSettings.user,
    password: dSettings.password,
    database: dSettings.database,
  });

//console.log(reg);
// var instance = db.getPool();

instance.connect(function(err) {
    if (err) throw err;
    console.log("Connected to signupRoute!!!!!!!!!!!!!");

    // Get sent data.

    // Check if the email is already being used
    var checkQuery = "SELECT * from `user` WHERE email = " + "'" +user.email+ "'";

    instance.query(checkQuery, function (err, result) {
       if (err) throw err;
       // If nothing is found, make the update
       if(result.length === 0){
         // Do a MySQL query.
         var query = instance.query("INSERT INTO `user` SET ?", user, function(err, result) {
           if (err) throw err;
           console.log("Inserted user successfully");
         });
         res.send(true);
       }else{
         res.send(false);
       }
    });
});

});

module.exports = router;
