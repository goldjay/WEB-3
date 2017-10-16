var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.post('/', function(req, res, next) {

  var user = req.body;
  console.log(user);


  var instance = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Test123",
    database: "cassiopeia-db"
  });

//console.log(reg);

  instance.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");});

    // Get sent data.


    // Do a MySQL query.
    var query = instance.query("INSERT INTO `user` SET ?", user, function(err, result) {
      if (err) throw err;
      console.log("Inserted test user");
      // Neat!

    });

    // TO DO: Send response based on success of request
    res.send(true);

});

router.get('/', function(req, res, next) {
  console.log("Here on Signup page!");
});

module.exports = router;
