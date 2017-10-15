var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET users listing. */
router.post('/', function(req, res, next) {
  //res.send('respond with a resource');
  console.log("HERE IS THE REQUEST: ");
  console.log(req.body);

  // var userType = req.body.userType.toLowerCase();

  var instance = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Test123",
    database: "cassiopeia-db"
  });

  instance.connect(function(err) {
    if (err) console.log("ERROR CONNECTING TO DB FROM EDIT");

    console.log("Connected in edit!");

    //console.log(this.props.originalState);

    // TO DO: Add conditional based on userType

    var email = req.body['email'].toLowerCase();
    //var password = req.body['password'].toLowerCase();
    var firstName = req.body['firstName'].toLowerCase();
    //var lastName = req.body['lastName'].toLowerCase();
    //var signature = req.body['signature'].toLowerCase();

    // TO DO: change query to not update when fields are empty
    // QUERY FOR UPDATING THE USER'S INFORMATION
    //var sqlQuery = "UPDATE `user` SET firstName =" + "'"+ firstName+ "'"+ "WHERE email=" + 'test@gmail.com';

    var sqlQuery = "UPDATE user SET firstName = '" + firstName + "' WHERE email = '" + email + "'";

    instance.query(sqlQuery, function (err, result) {
       if (err) throw err;
       console.log("RESULT");
       console.log(result);
       res.json(result);
     });
  });
});

module.exports = router;
