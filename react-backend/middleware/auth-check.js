const jwt = require('jsonwebtoken');

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Test123',
  database: 'cassiopeia-db',
});

/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }

    const userId = decoded.sub;

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
