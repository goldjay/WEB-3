//Referenced: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
//Referenced: https://github.com/XBLDev/ReactJSNodejsAuthRouterv4
const jwt = require('jsonwebtoken');
var mysql = require('mysql');
var dSettings = require('../sqlsettings.js');

//This function checks all endpoints handled by an admin user.
module.exports = (req, res, next) => {

  //If the user does not provide an authroization header in their request
  if (!req.headers.authorization) {
    console.log('No Authorization headers!');
    return res.status(401).end();
  }

  console.log('Checking authorization using middleware!');

  //Connects to SQL database.
  var connection = mysql.createConnection({
    host: dSettings.host,
    user: dSettings.user,
    password: dSettings.password,
    database: dSettings.database,
  });

  console.log('Splitting the authorization header.');

  //Pulls the payload portion of the token.
  const tokenPayload = req.headers.authorization.split(' ')[1];

  console.log('Verifying the secret token.');

  //Verifies and decodes sent token.
  return jwt.verify(tokenPayload, 'secretphrase123', (err, decoded) => {
    if (err) { return res.status(401).end(); }

    //Reassigns decoded user ID and account type.
    const userId = decoded.sub;
    const accountType = decoded.type;
    console.log(userId);
    console.log(accountType);

    //If the user token is not signed as admin deny the request.
    if (accountType != 'admin')
    {
      console.log('Not an admin request!');
      return res.status(401).end();
    }

    console.log('Performing user query!');

    //Searches database for user id to verify that the user exists.
    connection.query("SELECT * FROM `user` WHERE `id` = '" + userId + "'", function (err, rows) {
        console.log(rows);
        console.log('above row object');
        if (err)
        return res.status(401).end();
      });

    console.log('Made it past user query!');
    return next();
  });
};
