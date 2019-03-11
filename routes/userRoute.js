const express = require('express');
const { check, validationResult } = require('express-validator/check');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

let User = require('../models/user');

router.get('/test', (req, res) => {
  res.send("Test router worked");
});

// Register user
router.post('/register', [
  // username must be an email
  check('email').isEmail(),
  // password must be at least 5 chars long
  check('password').isLength({ min: 5 })]
  , (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const email = req.body.email;
    const password = req.body.password;

    console.log(email);
    console.log(password);

    let newUser = new User({
      email,
      password
    });

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(newUser.password, salt, function (err, hash) {
        if (err) {
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function (err) {
          if (err) {
            res.status(500).send("Error registering new user please try again");
            console.log(err);
            return;
          } else {
            res.status(200).send(newUser);
          }
        })
      });
    });
  });

// User login
router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, isUserFound, info) {
    if (err) {
      console.log(err);
      res.status(500).send();
    };
    if (isUserFound) {
      console.log(info);
      res.status(200).send();
    } else {
      res.status(204).send();
    }
  }
  )(req, res, next)
}
);

// User logout
router.get('/logout', function(req, res) {
  console.log("Logging out...");
  req.logout();
  res.status(200).send();
})

module.exports = router;



