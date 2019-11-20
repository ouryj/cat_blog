let express = require('express'),
    router  = express.Router(),
    passport = require('passport'),
    User    = require('../models/user');

    //routes 
    router.get('/',function(req,res){
        res.render('../views/cats/home');
    })
    //register route
    router.get('/register',function(req,res){
        res.render('../views/users/register');
    })
    //register route
    router.post('/register',function(req,res){
        let newUser = new User({username: req.body.username});
        User.register(newUser,req.body.password,function(err,user){
            if(err){
                console.log(err);
                // res.redirect('back');
                
            }else{
                passport.authenticate('local')(req,res,function(){
                   
                    res.redirect('/cats');
                    req.flash('success','welcome to cat page');
                })
            }
        })
    })
    //login route
    router.get('/login',function(req,res){
        res.render('../views/users/login');
    })
    //login logic
    router.post('/login',passport.authenticate('local',{
        successRedirect: '/cats',
        failureRedirect: '/login'
    }),function(req,res){});
    //log out route
    router.get('/logout',function(req,res){
        req.logOut;
        req.flash('error','you are loged out');
        res.redirect('/');
    })




    module.exports = router;