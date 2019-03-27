const express = require('express');
const router = express.Router();
const userService = require('../service/userService');

module.exports = router;

// routes
router.post('/register', register);
router.post('/login', authenticate);
router.get('/logout', logout);
// router.post('/login', login);

function register(req, res, next) {
    return userService.validate(req).then(validationresult =>{
        if(!validationresult.isEmpty()) {
            return next(new Error("Validation Error"))
        }
        return userService.create(req.body).then(() => res.json({message: "success"}));
    }).catch(e => next(e));
    // userService.validate(req)
    //     .catch(err => next(err));

    // userService.create(req.body)
    //     .then(() => res.json({}))
    //     .catch(err => next(err));
};

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.status(200).send() : res.status(204).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
};

function getById(req, res, next) {
    return userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
};

function logout(req, res, next) {
    return userService.logout()
}