const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken');
const passport = require('passport');
const passportConfig = require('../passport');
//User model
const User = require('../models/User');
const Chat = require('../models/Chat');

const signToken = userId =>{
    return JWT.sign({
        iss: "SonaAgrawal",
        sub: userId
    }, "SonaAgrawal", {expiresIn: "1h"});
}

//Register Handle
router.post('/register', (req, res) =>{
    //console.log(req.body);
    //res.send('Hello');
    const {username, password, role } = req.body;
    User.findOne({username}, (err, user)=>{
        if(err)
            res.status(500).json({message: {msgBody : "Error has Occured", msgError: true }});
        if(user)
            res.status(400).json({message: {msgBody : "Username is already taken", msgError: true }});
        else{
            const newUser = new User({username, password, role});

            newUser.save(err =>{
                if(err)
                 res.status(500).json({message: {msgBody : "Error has Occured", msgError: true }});
                else{
                    res.status(201).json({message: {msgBody : "Account Successfully Created", msgError: false }});
                } 
            });
        }        
    });
});

router.post('/login', passport.authenticate('local',{session: false}),(req, res)=>{
    if(req.isAuthenticated()){
        const {_id, username, role} = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, {httpOnly: true, sameSite: true});
        res.status(201).json({isAuthenticated: true, user: {username, role}});
    }
});

router.get('/logout', passport.authenticate('jwt',{session: false}),(req, res)=>{
    res.clearCookie('access_token');
    res.json({user:{username: "", role:""}, success: true});
});

router.post('/chat', passport.authenticate('jwt',{session: false}),(req, res)=>{
    const chat = new Chat(req.body);
    chat.save(err =>{
        if(err)
          res.status(500).json({message: {msgBody : "List of Registered User", msgError: false }});
        else{
            req.user.chats.push(chat);
            req.user.save(err =>{
                if(err)
                    res.status(500).json({message: {msgBody : "Error has Occured xyz", msgError: true }});
                else
                    res.status(200).json({message: {msgBody : "Sccessfully send a chat", msgError: false}});   

            });
        }  
    })
});

router.get('/chats', passport.authenticate('jwt',{session: false}),(req, res)=>{
    User.findById({_id : req.user._id}).populate('chats').exec((err, document) =>{
        if(err)
            res.status(500).json({message: {msgBody : "Error has Occured", msgError: true }});
        else{
            User.find({}, 'username').then(function (products) {
                //res.send();
                res.status(200).json({chats: document.chats, user: req.user.username, list: products, authenticated: true});
                });
        
         
        }   

    });
});

router.get('/admin', passport.authenticate('jwt',{session: false}),(req, res)=>{
    if(req.user.role === 'admin'){
        res.status(200).json({message: {msgBody : "You are an admin", msgError: false}}); 
    }
    else{
        res.status(403).json({message: {msgBody : "You are not an admin", msgError: true}});
    }
});


router.get('/authenticated', passport.authenticate('jwt',{session: false}),(req, res)=>{
   
    const {username, role} = req.user;
    res.status(200).json({isAuthenticated: true, user: {username, role}});
});

module.exports = router;