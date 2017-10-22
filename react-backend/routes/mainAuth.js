//Referenced: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
//Referenced: https://github.com/XBLDev/ReactJSNodejsAuthRouterv4
const express = require('express');
const validator = require('validator');
const passport = require('passport');
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
    message = 'Check the form for errors.';
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
    message = 'Check the form for returnErrs.';
  }

  console.log('Done validating login');

  return {
    success: validFrom,
    message,
    returnErrs,
  };
}

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

module.exports = router;