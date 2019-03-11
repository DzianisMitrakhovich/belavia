const expressJwt = require('express-jwt');
const config = require('../config/config.json');
const userService = require('../service/userService');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    console.log("In jwt middleware");
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/api/login',
            '/api/register'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};