const jwt = require('jsonwebtoken');

var mysql = require('mysql');

/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    console.log('No Authrization headers!');
    return res.status(401).end();
  }

  console.log('Checking authorization using middleware!');
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Test123',
    database: 'cassiopeia-db',
  });

  console.log('Splitting the authorization header.');

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  console.log('Verifying the secret token.');
  return jwt.verify(token, 'secretphrase123', (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }

    const userId = decoded.sub;
    const accountType = decoded.type;
    console.log(userId);
    console.log(accountType);
    if (accountType != 'admin')
    {
      console.log('Not an admin request!');
      return res.status(401).end();
    }

    console.log('Performing user query!');
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
