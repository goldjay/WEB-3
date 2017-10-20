var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET users listing. */
router.post('/', function(req, res, next) {
  //res.send('respond with a resource');
  // console.log("HERE IS THE REQUEST: ");
  // console.log(req.body);

  var userType = req.body.userType.toLowerCase();
  console.log('YOUR USER TYPE: ' + userType);

  var instance = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Test123",
    database: "cassiopeia-db"
  });

  instance.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    var userType = req.body['userType'].toLowerCase();
    console.log("USERTYPE: " + userType);

    var sqlQuery = "SELECT * from `user`";

    if(userType !== 'all'){
      sqlQuery +=  "WHERE `type` =" + "'" + userType + "' ORDER BY `createDate` DESC";
    }

    instance.query(sqlQuery, function (err, result) {
       if (err) throw err;
       console.log("HERE ARE YOUR " + userType);
       console.log(result);
       res.json(result);
     });
  });
});

module.exports = router;
