const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const config = require('../config/config.json');
const jwt = require('jsonwebtoken');

module.exports = {
    create,
    validate,
    authenticate,
    getById};

let User = require('../models/user');

async function create(userParam) {
    const email = userParam.email;
    const password = userParam.password;
    if (await User.findOne({ email})) {
        throw new Error(`Email '${email}' is already taken`);
    }

    console.log(email);
    console.log(password);

    let user = new User({
      email,
      password
    });

    // hash password
    if (password) {
        user.password = bcrypt.hashSync(password, 10);
    }
    // save user
    await user.save();
};

async function validate(req) {
    // input must be an email
 check('email').isEmail();
  // password must be at least 5 chars long
check('password').isLength({ min: 5 });
const errors = await validationResult(req);
if (!errors.isEmpty()) {
    throw new Error("Input is invalid");
  }
};

async function authenticate({ email, password }) {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getById(id) {
    return await User.findById(id);
}


