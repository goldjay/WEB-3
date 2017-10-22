const jwt = require('jsonwebtoken');

var mysql = require('mysql');

/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Test123',
    database: 'cassiopeia-db',
  });

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  // decode the token using a secret key-phrase
  return jwt.verify(token, 'secretphrase123', (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }

    const userId = decoded.sub;
    const accountType = decoded.type;

    if (accountType != 'admin')
    {
      return res.status(401).end();
    }

    return function (userId) {

      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      connection.query("select * from user where id = '" + userID + "'", function (err, rows) {
        console.log(rows);
        console.log('above row object');
        if (err)
        return res.status(401).end();
      });

      return next();
    };

  });
};
