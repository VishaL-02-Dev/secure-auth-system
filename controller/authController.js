const User= require('../model/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken=(id,role)=>{
    return jwt.sign({id, role}, process.env.JWT_SECRET,{expiresIn: '2d'});
};


exports.registerUser= async(req,res)=>{
    const {name, email, password}=req.body;

    try {
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message:'User already exists'
            });
        }
        const hashedPassword=await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password:hashedPassword
        });

        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:generateToken(user._id,user.role)
        });
    } catch (error) {
        res.status(500).json({
            message:'Server error'
        });
    }
};


exports.loginUser=async (req,res)=>{
    const{email, password}=req.body;

    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:'Invalid credentials'
            });
        }
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:generateToken(user.id,user.role)
        });
    } catch (error) {
        res.status(500).json({
            message:'Server error'
        });
    }
}