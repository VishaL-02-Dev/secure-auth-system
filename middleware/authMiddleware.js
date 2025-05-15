const jwt= require('jsonwebtoken');
const User = require('../model/userSchema');

const protect = async(req,res,next) => {
    let token; 
    
    //Check for token in Authorization header
    if(req.headers.authorization && 
    req.headers.authorization.startsWith('Bearer')
    ){
        try {
            //Get token from header
            token = req.headers.authorization.split(' ')[1];

            //Token verification
            const decoded=jwt.verify(token, process.env.JWT_SECRET);

            //Attach user to request (exclude password)
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            return res.status(400).json({
                message:'Not authorized, token failed'
            });
        }
    }

    if(!token){
        return res.status(400).json({
            message:'Not authorized, no token'
        })
    }
};

module.exports = protect;