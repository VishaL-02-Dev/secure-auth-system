const jwt= require('jsonwebtoken');
const verifyToken= require('../utils/verifyToken');

const protect = (secret)=>{
    return (req,res,next)=>{
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({
                message:'Not authorized, no token'
        });
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token,secret);

        if(!decoded){
            return res.status(401).json({
                message:'Not authorized, token failed'
            });
        }
        req.user = decoded;
        next();
    };
};

module.exports = protect;