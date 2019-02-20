const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

let User = require('../models/user');

router.get('/test', (req, res) => {
    res.send("Test router worked");
});

// Register user
router.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    let errors = req.validationErrors();

    if(!errors) {
        let newUser = new User({
            email,
            password
        })
    }

    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
          if(err){
            console.log(err);
          }
          newUser.password = hash;
          newUser.save(function(err){
            if(err){
              console.log(err);
              return;
            } else {
              req.flash('success','You are now registered and can log in');
              res.redirect('/login');
            }
          })
        });
      });
    });

    module.exports = router;



