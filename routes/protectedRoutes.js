const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const allowRoles = require('../middleware/roleMiddleware');


//Public route
router.get('/public',(req,res)=>{
    res.json({
        message:'This route is public'
    });
});


//User authenticated only
router.get('/user',protect,(req,res)=>{
    res.json({
        message:`Welcome ${req.user.name}, you are authenticated`
    });
});


//Admin authenticated only
router.get('/admin',protect,allowRoles('admin'),(req,res)=>{
    res.json({
        message:'Welcome Admin!'
    });
});

module.exports = router;