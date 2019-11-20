let User = require('../models/user'),
    Cat  = require('../models/cat'),
    Comment = require('../models/comment');


    let check = {};
    check.isAuth = function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }else{
            res.redirect('/login');
        }
    }
    check.catOwner = function(req,res,next){
        if(req.isAuthenticated()){
            Cat.findById(req.params.id,function(err,cat){
                if(err){
                    console.log(err);
                    res.redirect('back');
                }else{
                    if(cat.author.id.equals(req.user._id)){
                        return next();
                    }else{
                        req.flash('error','permission denied');
                        res.redirect('back');
                    }
                }
            })
        }else{
            res.redirect('/login')
        }
    }
    check.commentOwner = function(req,res,next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id,(err,comment)=>{
                if(err){
                    console.log(err);
                    res.redirect('back');
                }else{
                    if(comment.author.id.equals(req.user._id)){
                        return next();
                    }else{
                        req.flash('error','it doesnt belong to you');
                        res.redirect('/');
                    }
                }
            })

        }else{
            res.redirect('/login')
        }
    }

    module.exports = check;