const express = require('express');
const router = express.Router();

const User = require("../config/models/user")

router.post('/register', (req,res,next)=> {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })

    User.addUser(newUser, (err, user) =>{
        if (err){
            res.send({success: false, msg: 'failed to register'})
        } else {
            res.send({success: true, msg: 'user registered'})
        }
    })
})

router.get('/profile', (req,res,next)=> {
    res.send("PROFILE")
})

router.get('/authenticate', (req,res,next)=> {
    res.send("AUTH")
})

router.get('/validate', (req,res,next)=> {
    res.send("Validate")
})

module.exports = router;