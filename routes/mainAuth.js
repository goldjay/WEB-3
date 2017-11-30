//Referenced: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
//Referenced: https://github.com/XBLDev/ReactJSNodejsAuthRouterv4
const express = require('express');
const validator = require('validator');
const passport = require('passport');
var crypto = require('crypto');
var mysql = require('mysql');
var dSettings = require('../sqlsettings.js');
var nodemailer = require('nodemailer');
const router = new express.Router();

/*
 ** Description: a function called signupValidation that validates the contents
 of the request body for the signup form.
*/
function signupValidation(reqContents) {
  const returnErrs = {};
  let validFrom = true;
  let message = '';

  console.log('Validating signup right now!');

  console.log(reqContents);

  //Checks that the email field is valid.
  if (!reqContents || typeof reqContents.email !== 'string' ||
   !validator.isEmail(reqContents.email)) {
    validFrom = false;
    console.log('Didnt like the email.');
    returnErrs.email = 'Please provide a correct email address.';
  }

  //Checks if the password field is valid.
  if (!reqContents || typeof reqContents.password !== 'string' ||
   reqContents.password.trim().length < 1) {
    validFrom = false;
    console.log('Didnt like the password.');
    returnErrs.password = 'Password must have at least 1 character.';
  }

  //Returns message if there are any issues with the form.
  if (!validFrom) {
    message = 'Make sure both fields are completed.';
  }

  console.log('Made it through form validation.');

  return {
    success: validFrom,
    message,
    returnErrs,
  };
}

/*
 ** Description: a function called loginValidation that validates the contents
 of the request body for the login form.
*/
function loginValidation(reqContents) {
  const returnErrs = {};
  let validFrom = true;
  let message = '';

  console.log('Validating login right now!');

  //Checks if the username field is valid.
  if (!reqContents || typeof reqContents.email !== 'string' ||
   reqContents.email.trim().length === 0) {
    validFrom = false;
    returnErrs.email = 'Please provide your email address.';
  }

  //Checks if the password field is valid.
  if (!reqContents || typeof reqContents.password !== 'string' ||
   reqContents.password.trim().length === 0) {
    validFrom = false;
    returnErrs.password = 'Please provide your password.';
  }

  //Returns message if there is any issue with the form.
  if (!validFrom) {
    message = 'Make sure both fields are completed.';
  }

  console.log('Done validating login');

  return {
    success: validFrom,
    message,
    returnErrs,
  };
}

function forgotValidation(reqContents) {
  const returnErrs = {};
  let validFrom = true;
  let message = '';

  console.log('Validating forgot right now!');

  //Checks if the username field is valid.
  if (!reqContents || typeof reqContents.email !== 'string' ||
   reqContents.email.trim().length === 0) {
    validFrom = false;
    returnErrs.email = 'Please provide your email address.';
  }

  //Returns message if there is any issue with the form.
  if (!validFrom) {
    message = 'Make sure the username field is complete';
  }

  console.log('Done validating forgot');

  return {
    success: validFrom,
    message,
    returnErrs,
  };
}

function editValidation(reqContents){
  const returnErrs = {};
  let validFrom = true;
  let message = '';

  console.log('Validating edit right now!');

  // If there is an email field, check its validity
  if(reqContents.email){
    if(typeof reqContents.email !== 'string'){
      validFrom = false;
    }
  }

  // If there is a password, check it is valid
  if(reqContents.password){
    if(typeof reqContents.password !== 'string'){
      validFrom = false;
    }
  }

  //Returns message if there is any issue with the form.
  if (!validFrom) {
    message = 'Invalid edit form!';
  }

  console.log('Done validating edit');

  return {
    success: validFrom,
    message,
    returnErrs,
  };
}

function deleteValidation(reqContents){
  const returnErrs = {};
  let validFrom = true;
  let message = '';

  console.log('Validating delete right now!');

  //Returns message if there is any issue with the form.
  if (!validFrom) {
    message = 'Invalid edit form!';
  }

  console.log('Done validating delete');

  return {
    success: validFrom,
    message,
    returnErrs,
  };
}

router.post('/delete', (req, res, next) => {
  //First validates the request body.
  const validResults = deleteValidation(req.body);

  //If there is an issue with the validation.
  if (!validResults.success) {
    console.log('Something screwed up in validation :-(');
    return res.status(400).json({
      success: false,
      message: validResults.message,
      returnErrs: validResults.returnErrs,
    });
  }

  console.log('Made it past delete validation.');

  //Run request through passport middleware.
  return passport.authenticate('delete-strat', (err, user, info) => {
    console.log('In passport delete function.');

    //If errors are generated from passport function.
    if (err) {
      console.log('There was an error generated from passport during editing.');
      return res.status(400).json({
        success: false,
        message: 'Could not process the form.',
      });
    }

    //If there is a generated message from a passport error.
    if (info)
    {
      console.log("THERE IS AN INFO ERROR");
      console.log(info);
      return res.status(400).json({
        success: false,
        message: info.message,
      });
    }

    //If passport processed signup succesfully!
    return res.status(200).json({
      success: true,
      message: 'You have successfully deleted!',
    });
  })(req, res, next);
});
//
// function usersValidation(reqContents){
//   const returnErrs = {};
//   let validFrom = true;
//   let message = '';
//
//   console.log('Validating delete right now!');
//
//   //Returns message if there is any issue with the form.
//   if (!validFrom) {
//     message = 'Invalid edit form!';
//   }
//
//   console.log('Done validating delete');
//
//   return {
//     success: validFrom,
//     message,
//     returnErrs,
//   };
// }
//
//
// router.post('/users', (req, res, next) => {
//   //First validates the request body.
//   const validResults = usersValidation(req.body);
//
//   //If there is an issue with the validation.
//   if (!validResults.success) {
//     console.log('Something screwed up in validation :-(');
//     return res.status(400).json({
//       success: false,
//       message: validResults.message,
//       returnErrs: validResults.returnErrs,
//     });
//   }
//
//   console.log('Made it past users validation.');
//
//   //Run request through passport middleware.
//   return passport.authenticate('users-strat', (err, user, info) => {
//     console.log('In passport users function.');
//
//     //If errors are generated from passport function.
//     if (err) {
//       console.log('There was an error generated from passport during user query.');
//       return res.status(400).json({
//         success: false,
//         message: 'Could not process the form.',
//       });
//     }
//
//     //If there is a generated message from a passport error.
//     if (info)
//     {
//       return res.status(400).json({
//         success: false,
//         message: info.message,
//       });
//     }
//
//     //If passport processed signup succesfully!
//     return res.status(200).json({
//       success: true,
//       message: 'You have successfully edited!',
//     });
//   })(req, res, next);
// });


router.post('/edit', (req, res, next) => {
  //First validates the request body.
  const validResults = editValidation(req.body);

  //If there is an issue with the validation.
  if (!validResults.success) {
    console.log('Something screwed up in validation :-(');
    return res.status(400).json({
      success: false,
      message: validResults.message,
      returnErrs: validResults.returnErrs,
    });
  }

  console.log('Made it past edit validation.');

  //Run request through passport middleware.
  return passport.authenticate('edit-strat', (err, user, info) => {
    console.log('In passport edit function.');

    //If errors are generated from passport function.
    if (err) {
      console.log('There was an error generated from passport during editing.');
      console.log(err);
      return res.status(400).json({
        success: false,
        message: 'Could not process the form.',
      });
    }

    //If there is a generated message from a passport error.
    if (info)
    {
      return res.status(400).json({
        success: false,
        message: info.message,
      });
    }

    //If passport processed signup succesfully!
    return res.status(200).json({
      success: true,
      message: 'You have successfully edited!',
    });
  })(req, res, next);
});

// Handles routing for signup endpoint.
router.post('/signup', (req, res, next) => {
  //First validates the request body.
  const validResults = signupValidation(req.body);

  //If there is an issue with the validation.
  if (!validResults.success) {
    console.log('Something screwed up in validation :-(');
    return res.status(400).json({
      success: false,
      message: validResults.message,
      returnErrs: validResults.returnErrs,
    });
  }

  console.log('Made it past validation.');

  //Run request through passport middleware.
  return passport.authenticate('signup-strat', (err, user, info) => {
    console.log('In passport signup function.');

    //If errors are generated from passport function.
    if (err) {
      console.log('There was an error generated from passport during signup.');
      return res.status(400).json({
        success: false,
        message: 'Could not process the form.',
      });
    }

    //If there is a generated message from a passport error.
    if (info)
    {
      return res.status(400).json({
        success: false,
        message: info.message,
      });
    }

    //If passport processed signup succesfully!
    return res.status(200).json({
      success: true,
      message: 'You have successfully signed up! Now you should be able to log in.',
    });
  })(req, res, next);

});

//Handles routing for generic login endpoint
router.post('/login', (req, res, next) => {
  console.log('I made it into login post!');

  //First validates the request body.
  const validResults = loginValidation(req.body);

  //If there was an issue from validation
  if (!validResults.success) {
    console.log('There was an issue validating login.');
    return res.status(400).json({
      success: false,
      message: validResults.message,
      returnErrs: validResults.returnErrs,
    });
  }

  //Runs request through passport middleware
  return passport.authenticate('login-strat', (err, token, userData) => {
    if (err) {

      //Error generated from passport strategy.
      return res.status(400).json({
        success: false,
        message: 'Could not process the form.',
      });
    }

    //If there is no token generated from passport
    if (!token)
    {
      return res.status(400).json({
        success: false,
        message: userData.message,
      });
    }

    //If the passport strategy was a success!
    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: userData,
    });
  })(req, res, next);
});

//Handles routing for admin login endpoint.
router.post('/adminLogin', (req, res, next) => {
  console.log('I made it into login post!');

  //First validates the request body.
  const validResults = loginValidation(req.body);

  //If request body is not valid.
  if (!validResults.success) {
    console.log('There was an issue validating login.');
    return res.status(400).json({
      success: false,
      message: validResults.message,
      returnErrs: validResults.returnErrs,
    });
  }

  //Runs request through passport middleware.
  return passport.authenticate('login-admin-strat', (err, token, userData) => {
    if (err) {

      // If there was an error generated from passport middleware.
      return res.status(400).json({
        success: false,
        message: 'Could not process the form.',
      });
    }

    //If no token was generated from passport strategy.
    if (!token)
    {
      return res.status(400).json({
        success: false,
        message: userData.message,
      });
    }

    //If passport strategy was successful.
    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: userData,
    });
  })(req, res, next);
});

//Handles routing for forgot endpoint
router.post('/forgot', (req, res, next) => {
  console.log('I made it into login post!');

  //First validates the request body.
  const validResults = forgotValidation(req.body);

  //If there was an issue from validation
  if (!validResults.success) {
    console.log('There was an issue validating login.');
    return res.status(400).json({
      success: false,
      message: validResults.message,
      returnErrs: validResults.returnErrs,
    });
  }

  //Runs request through passport middleware
  return passport.authenticate('forgot-strat', (err, token, userData) => {
    if (err) {

      //Error generated from passport strategy.
      return res.status(400).json({
        success: false,
        message: 'Could not process the form.',
      });
    }

    //If user is not found in passport
    if (!token)
    {
      return res.status(400).json({
        success: false,
        message: userData.message,
      });
    } else {
      //If the passport strategy was a success!
      crypto.randomBytes(30, (err, buf) => {
        if (err) throw err;
        var resetToken = buf.toString('hex');
        console.log(resetToken);
        console.log(resetToken.length);

        var instance = mysql.createConnection({
          host: dSettings.host,
          user: dSettings.user,
          password: dSettings.password,
          database: dSettings.database,
        });

        var queryArray = [resetToken, userData.id];

        var userQuery = instance.query('UPDATE `user` SET `passReset`= ? WHERE `id`= ?;', queryArray, function (err, result) {
            if (err) {
              throw err;
            } else {
              console.log('Updated User with passReset');

              instance.end(function (err) {
                console.log('Connection MySQL is now closed in forget endpoint');
              });

              //Referenced: https://www.w3schools.com/nodejs/nodejs_email.asp
              var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'passcode.reset.cassiopeia@gmail.com',
                  pass: 'cassiopeia123!',
                },
              });

              var mailOptions = {
                from: 'passcode.reset.cassiopeia@gmail.com',
                to: req.body.email,
                subject: 'Password Reset Request',
                text: 'You are receiving this because you have requested to reset your account password.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'https://' + req.headers.host + '/reset?code=' + resetToken + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n',
              };

              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  throw error;
                } else {
                  console.log('Email sent: ' + info.response);
                  return res.json({
                    success: true,
                  });
                }
              });
            }

          });

      });
    }
  })(req, res, next);
});

module.exports = router;
