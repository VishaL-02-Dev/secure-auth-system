const jwt = require('jsonwebtoken');

const generateToken = (payload, secret, expiresIn = '3d')=>{
    if(!secret) throw new Error('JWT secret is required');

    return jwt.sign(payload, secret, {expiresIn});
};

module.exports = generateToken;