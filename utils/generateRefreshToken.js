const jwt = require('jsonwebtoken');

const generateRefreshToken = (payload, secret, expiresIn='7d')=>{
    if(!secret) throw new Error ('JWT refresh secret is required');

    return jwt.sign(payload, secret, {expiresIn});
};

module.exports = generateRefreshToken;