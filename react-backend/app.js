var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mysql = require('mysql');
var passport = require('passport');
var bodyParser = require('body-parser');

//Database setup code
//Referenced: https://www.w3schools.com/nodejs/nodejs_mysql.asp
var instance = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Test123',
  database: 'cassiopeia-db',
});

//require('./config/passport')(passport);


var index = require('./routes/index');
var users = require('./routes/users');
var edit = require('./routes/edit');
var signupRoute = require('./routes/signupRoute.js');
var remove = require('./routes/delete.js');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Referenced: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
app.use(passport.initialize());
const localSignupStrategy = require('../react-backend/passport/local-signup');
const localLoginStrategy = require('../react-backend/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

const authCheckMiddleware = require('../react-backend/middleware/auth-check');
app.use('/api', authCheckMiddleware);

const authRoutes = require('../react-backend/routes/auth');
const apiRoutes = require('../react-backend/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

//Database setup code
//Referenced: https://www.w3schools.com/nodejs/nodejs_mysql.asp
var instance = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Test123',
  database: 'cassiopeia-db',
});

//Database Setup queires
instance.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  var sqlQuery = "DROP TABLE IF EXISTS `award`;";
  instance.query(sqlQuery, function (err, result) {
    if (err) throw err;
    console.log("Dropped award table if it exists.");});

  sqlQuery = "DROP TABLE IF EXISTS `user`;";
  instance.query(sqlQuery, function (err, result) {
    if (err) throw err;
    console.log("Dropped user table if it exists.");});

  sqlQuery = "CREATE TABLE `user` (`id` int(11) NOT NULL AUTO_INCREMENT, `type` varchar(255), `email` varchar(255),`password` varchar(20),`firstName` varchar(50),`lastName` varchar(50),`createDate` datetime,`signature` blob,PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=latin1;";
  instance.query(sqlQuery, function (err, result) {
    if (err) throw err;
    console.log("Created user table!");});

  sqlQuery = "CREATE TABLE `award` (`id` int(11) NOT NULL AUTO_INCREMENT,`creatorId` int(11),`type` varchar(50),`receiverFirstName` varchar(50),`receiverLastName` varchar(50), `receiverEmail` varchar(50),`timeGiven` datetime,PRIMARY KEY (`id`), FOREIGN KEY (creatorId) REFERENCES user(id)) ENGINE=InnoDB DEFAULT CHARSET=latin1;";
  instance.query(sqlQuery, function (err, result) {
    if (err) throw err;
    console.log("Created award table!");});

  sqlQuery = "INSERT INTO `user`(`type`, `email`, `password`, `firstName`, `lastName`) VALUES ('generic', 'test@gmail.com', 'Test123', 'John', 'Smith');";
  instance.query(sqlQuery, function (err, result) {
    if (err) throw err;
    console.log("Inserted test user 1");});

  sqlQuery = "INSERT INTO `user`(`type`, `email`, `password`, `firstName`, `lastName`) VALUES ('admin', 'testAdmin@gmail.com', 'Test123Admin', 'Sally', 'Jones');";
  instance.query(sqlQuery, function (err, result) {
    if (err) throw err;
    console.log("Inserted test user 2");});

  sqlQuery = "INSERT INTO `award`(`creatorId`, `type`, `receiverFirstName`, `receiverLastName`, `receiverEmail`)SELECT id, 'Retirement Award', 'Michael', 'Jones', 'mjonestest@gmail.com' FROM user WHERE user.firstName = 'Sally' AND user.lastName = 'Jones';";
  instance.query(sqlQuery, function (err, result) {
    if (err) throw err;
    console.log("Inserted test award 1");});

  sqlQuery = "INSERT INTO `award`(`creatorId`, `type`, `receiverFirstName`, `receiverLastName`, `receiverEmail`) SELECT id, 'Graduation Award', 'Burt', 'Smith', 'bSmithTest@gmail.com' FROM user WHERE user.firstName = 'John' AND user.lastName = 'Smith';";
  instance.query(sqlQuery, function (err, result) {
    if (err) throw err;
    console.log("Inserted test award 2");});
});

//End of Database Setup code

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
