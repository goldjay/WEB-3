var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dSettings = require('../sqlsettings.js');

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

  instance.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");});

    // Get sent data.

    // Check if the email is already being used
    var checkQuery = "SELECT * from `user` WHERE email = " + "'" +user.email+ "'";

    instance.query(checkQuery, function (err, result) {
       if (err) throw err;
       console.log("RESULT");
       console.log(result);
       // If nothing is found, make the update
       if(result.length === 0){
         // Do a MySQL query.
         var query = instance.query("INSERT INTO `user` SET ?", user, function(err, result) {
           if (err) throw err;
           console.log("Inserted test user");
         });
         res.send(true);
       }else{
         res.send(false);
       }
    });




});

router.get('/', function(req, res, next) {
  console.log("Here on Signup page!");
});

module.exports = router;
