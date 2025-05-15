const jwt = require('jsonwebtoken');

const verifyToken = (token,secret)=>{
    if(!token || !secret ) throw new Error('Token and secret are required');

    try {
        return jwt.verify(token,secret);
    } catch (error) {
        return error;
    }
};

module.exports = verifyToken;