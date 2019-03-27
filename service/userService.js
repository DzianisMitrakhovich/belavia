const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const config = require('../config/config.json');
const jwt = require('jsonwebtoken');

module.exports = {
    create,
    validate,
    authenticate,
    getById};

const User = require('../models/user');

async function create({email, password, ...rest}) {
    // const email = userParam.email;
    // const password = userParam.password;
    if (await User.findOne({ email})) {
        throw new Error(`Email '${email}' is already taken`);
    }

    console.log(email);
    console.log(password);

    // const user = new User({
    //   email,
    //   password
    // });

    return bcrypt
        .hash(password, 10)
        .then(ecryptedPassword => new User({
            email, 
            ecryptedPassword
        }).save());

    // user.password = bcrypt.hashSync(password, 10);
    // // save user
    // return user.save();
};

function validate(req) {
    // input must be an email
 check('email').isEmail();
  // password must be at least 5 chars long
check('password').isLength({ min: 5 });
return validationResult(req);
// if (!errors.isEmpty()) {
//     throw new Error("Input is invalid");
//   }
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

//redundant
async function getById(id) {
    return await User.findById(id);
}

// Examples
// async function changeName(id) {
//     const user = await User.findById(id);
//     user.name = "John Doe";
//     await user.save();

//     return user;
// }

// function changeNamePromise(id) {
//     return User.findById(id).then(user => {
//         user.name = "John Doe";
//         return user.save().then(() => user);
//     })
// }


// changeNamePromise(123).then(u => {...changeNamePromise.})


