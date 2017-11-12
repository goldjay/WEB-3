var express = require('express');
var app = express();
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var mysql = require('mysql');
var passport = require('passport');
var bodyParser = require('body-parser');
var dSettings = require('./sqlsettings.js');
var db = require('./dbConnect.js');

var index = require('./routes/index');
var users = require('./routes/users');
var edit = require('./routes/edit');
var signupRoute = require('./routes/signupRoute.js');
var remove = require('./routes/delete');
var award = require('./routes/award');
var awardReturn = require('./routes/awardReturn');
var graphs = require('./routes/graphs');

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'client/build')));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

//app.use(express.static(path.join(__dirname, 'public')));

//Referenced: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
//Referenced: https://github.com/XBLDev/ReactJSNodejsAuthRouterv4
//Initialize passport middleware and defines strategies to use throughout authentication.
app.use(passport.initialize());
const passportSignupStrat = require('./passport-strategies/signup-strat');
const passportLoginStrat = require('./passport-strategies/login-strat');
const passportLoginStratAdmin = require('./passport-strategies/login-admin-strat');
const passportEditStratAdmin = require('./passport-strategies/edit-strat');
const passportDeleteStratAdmin = require('./passport-strategies/delete-strat');
// const passportUsersStratAdmin = require('./passport-strategies/users-strat');

passport.use('signup-strat', passportSignupStrat);
passport.use('login-strat', passportLoginStrat);
passport.use('login-admin-strat', passportLoginStratAdmin);
passport.use('edit-strat', passportEditStratAdmin);
passport.use('delete-strat', passportDeleteStratAdmin);
// passport.use('users-strat', passportUsersStratAdmin);

/*Defines endpoint verification middleware and declares which routes need to first be verified by
 middleware.*/
const endpointAuthCheck = require('./endpoint-check/endpoint-auth');
const endpointAuthCheckAdmin = require('./endpoint-check/endpoint-auth-admin');
app.use('/users', endpointAuthCheckAdmin);
app.use('/delete', endpointAuthCheckAdmin);
app.use('/award', endpointAuthCheck);
app.use('/awardReturn', endpointAuthCheck);
app.use('/graphs', endpointAuthCheckAdmin);

//Defines the main authentication route for account signup and login.
const mainAuth = require('./routes/mainAuth');
app.use('/auth', mainAuth);

//Defines routes to be used after middleware verification has taken place.

// app.use('/', index);

app.use('/users', users);
app.use('/signup', signupRoute);
app.use('/edit', edit);
app.use('/delete', remove);
app.use('/award', award);
app.use('/awardReturn', awardReturn);
app.use('/graphs', graphs);
app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


//Database setup code
//Referenced: https://www.w3schools.com/nodejs/nodejs_mysql.asp

var connection = mysql.createConnection({
  host: dSettings.host,
  user: dSettings.user,
  password: dSettings.password,
  database: dSettings.database,
  debug: true,
});

/*
function handleDisconnect(conn) {
  conn.on('error', function(err) {
    if (!err.fatal) {
      return;
    }

    if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
      throw err;
    }

    console.log('Re-connecting lost connection: ' + err.stack);

    instance = mysql.createConnection({
      host: dSettings.host,
      user: dSettings.user,
      password: dSettings.password,
      database: dSettings.database,
      debug: true
    });
    handleDisconnect(instance);
    instance.connect();
  });
}

var instance = db.getPool();
*/

//Database Setup queires

var sqlQuery = "DROP TABLE IF EXISTS `award`;";
connection.query(sqlQuery, function (err, result) {
  if (err) throw err;
  console.log("Dropped award table if it exists.");});

sqlQuery = "DROP TABLE IF EXISTS `user`;";
connection.query(sqlQuery, function (err, result) {
  if (err) throw err;
  console.log("Dropped user table if it exists.");});

sqlQuery = "CREATE TABLE `user` (`id` int(11) NOT NULL AUTO_INCREMENT, `type` varchar(255), `email` varchar(255),`password` varchar(20),`firstName` varchar(50),`lastName` varchar(50),`createDate` datetime,`signature` MEDIUMBLOB,PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=latin1;";
connection.query(sqlQuery, function (err, result) {
  if (err) throw err;
  console.log("Created user table!");});

sqlQuery = "CREATE TABLE `award` (`id` int(11) NOT NULL AUTO_INCREMENT,`creatorId` int(11),`type` varchar(50),`receiverFirstName` varchar(50),`receiverLastName` varchar(50), `receiverEmail` varchar(50),`timeGiven` datetime,PRIMARY KEY (`id`), FOREIGN KEY (creatorId) REFERENCES user(id) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=latin1;";
connection.query(sqlQuery, function (err, result) {
  if (err) throw err;
  console.log("Created award table!");});

sqlQuery = "INSERT INTO `user`(`type`, `email`, `password`, `firstName`, `lastName`) VALUES ('generic', 'test@gmail.com', 'Test123', 'John', 'Smith');";
connection.query(sqlQuery, function (err, result) {
  if (err) throw err;
  console.log("Inserted test user 1");});

sqlQuery = "INSERT INTO `user`(`type`, `email`, `password`, `firstName`, `lastName`) VALUES ('admin', 'testAdmin@gmail.com', 'Test123Admin', 'Sally', 'Jones');";
connection.query(sqlQuery, function (err, result) {
  if (err) throw err;
  console.log("Inserted test user 2");});

sqlQuery = "INSERT INTO `user`(`type`, `email`, `password`, `firstName`, `lastName`) VALUES ('generic', 'guy@gmail.com', 'guy123', 'guy', 'dude');";
connection.query(sqlQuery, function (err, result) {
  if (err) throw err;
  console.log("Inserted test user 3");});

sqlQuery = "INSERT INTO `user`(`type`, `email`, `password`, `firstName`, `lastName`) VALUES ('generic', 'brit@gmail.com', 'brit123', 'brit', 'parket');";
connection.query(sqlQuery, function (err, result) {
  if (err) throw err;
  console.log("Inserted test user 4");});

sqlQuery = "INSERT INTO `user`(`type`, `email`, `password`, `firstName`, `lastName`) VALUES ('generic', 'colette@gmail.com', 'colette123', 'colette', 'parket');";
connection.query(sqlQuery, function (err, result) {
  if (err) throw err;
  console.log("Inserted test user 5");});

sqlQuery = "INSERT INTO `user`(`type`, `email`, `password`, `firstName`, `lastName`) VALUES ('generic', 'cranston@gmail.com', 'cranston123', 'cran', 'berry');";
connection.query(sqlQuery, function (err, result) {
  if (err) throw err;
  console.log("Inserted test user 6");});

sqlQuery = "INSERT INTO `user`(`type`, `email`, `password`, `firstName`, `lastName`) VALUES ('generic', 'babel@gmail.com', 'babel123', 'babe', 'lestrat');";
connection.query(sqlQuery, function (err, result) {
  if (err) throw err;
  console.log("Inserted test user 7");});

sqlQuery = "INSERT INTO `award`(`creatorId`, `type`, `receiverFirstName`, `receiverLastName`, `receiverEmail`)SELECT id, 'Employee of the Month', 'Michael', 'Jones', 'mjonestest@gmail.com' FROM user WHERE user.firstName = 'Sally' AND user.lastName = 'Jones';";
connection.query(sqlQuery, function (err, result) {
  if (err) throw err;
  console.log("Inserted test award 1");});

sqlQuery = "INSERT INTO `award`(`creatorId`, `type`, `receiverFirstName`, `receiverLastName`, `receiverEmail`) SELECT id, 'Employee of the Week', 'Burt', 'Smith', 'bSmithTest@gmail.com' FROM user WHERE user.firstName = 'John' AND user.lastName = 'Smith';";
connection.query(sqlQuery, function (err, result) {
  if (err) throw err;
  console.log("Inserted test award 2");});

sqlQuery = "INSERT INTO `award`(`creatorId`, `type`, `receiverFirstName`, `receiverLastName`, `receiverEmail`) SELECT id, 'Employee of the Week', 'chad', 'wonder', 'chaddy@gmail.com' FROM user WHERE user.firstName = 'Sally' AND user.lastName = 'Jones';";
connection.query(sqlQuery, function (err, result) {
  if (err) throw err;
  console.log("Inserted test award 3");});

sqlQuery = "INSERT INTO `award`(`creatorId`, `type`, `receiverFirstName`, `receiverLastName`, `receiverEmail`) SELECT id, 'Employee of the Month', 'Goat', 'papadopolis', 'thegoat@gmail.com' FROM user WHERE user.firstName = 'Sally' AND user.lastName = 'Jones';";
connection.query(sqlQuery, function (err, result) {
  if (err) throw err;
  console.log("Inserted test award 4");});

  sqlQuery = "INSERT INTO `award`(`creatorId`, `type`, `receiverFirstName`, `receiverLastName`, `receiverEmail`) SELECT id, 'Employee of the Week', 'Goat', 'papadopolis', 'thegoat@gmail.com' FROM user WHERE user.firstName = 'Sally' AND user.lastName = 'Jones';";
  connection.query(sqlQuery, function (err, result) {
    if (err) throw err;
    console.log("Inserted test award 5");});

    sqlQuery = "INSERT INTO `award`(`creatorId`, `type`, `receiverFirstName`, `receiverLastName`, `receiverEmail`) SELECT id, 'Employee of the Month', 'Jill', 'coleman', 'jillcole@gmail.com' FROM user WHERE user.firstName = 'Sally' AND user.lastName = 'Jones';";
    connection.query(sqlQuery, function (err, result) {
      if (err) throw err;
      console.log("Inserted test award 6");});

      sqlQuery = "INSERT INTO `award`(`creatorId`, `type`, `receiverFirstName`, `receiverLastName`, `receiverEmail`) SELECT id, 'Employee of the Week', 'Jill', 'coleman', 'jillcole@gmail.com' FROM user WHERE user.firstName = 'Sally' AND user.lastName = 'Jones';";
      connection.query(sqlQuery, function (err, result) {
        if (err) throw err;
        console.log("Inserted test award 7");});

connection.end(function (err) {
  console.log('Connection is now closed!');
});

//End of Database Setup code

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
