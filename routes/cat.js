let express = require('express'),
    router  = express.Router(),
    func    = require('../midlleware/index'),
    Cat     = require('../models/cat');

    //index route
    router.get('/cats',(req,res)=>{
        Cat.find({},(err,cats)=>{
            if(err){
                console.log(err);
            }else{
                res.render('../views/cats/index',{cats:cats});
            }
        })
        
    })
    //new route 
    router.get('/cats/new',func.isAuth,function(req,res){
        res.render('../views/cats/new');
    })
    //create route
    router.post('/cats',func.isAuth,function(req,res){
        let author = {id:req.user._id,username:req.user.username};
        let newCat = {name: req.body.name,image:req.body.image,habbit:req.body.habbit,author:author};
        Cat.create(newCat,(err,cat)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/cats');
            }
        })
    })
    //show route
    router.get('/cats/:id',function(req,res){
        Cat.findById(req.params.id).populate('comments').exec(function(err,cat){
            if(err){
                console.log(err);
                res.redirect('back');
            }else{
                res.render('../views/cats/show',{cat:cat});
            }
        })
    })
    //edit route
    router.get('/cats/:id/edit',func.catOwner,function(req,res){
        Cat.findById(req.params.id,(err,cat)=>{
            if(err){
                console.log(err);
                req.flash('error',err.message);
                res.redirect('back');
            }else{
                res.render('../views/cats/edit',{cat:cat});
            }
        })
    })
    //update route
    router.put('/cats/:id',func.catOwner,function(req,res){
        Cat.findByIdAndUpdate(req.params.id,req.body.cat,function(err,newcat){
            if(err){
                console.log(err);
                req.flash('error',err.message);
                res.redirect('back');
            }else{
                res.redirect('/cats/'+req.params.id);
            }
        })
    })
    //delete route
    router.delete('/cats/:id',func.catOwner,function(req,res){
        Cat.findByIdAndDelete(req.params.id,function(err){
            if(err){ 
            console.log(err);
            req.flash('error',err.message);
            res.redirect('back');
            }else{
                res.redirect('/cats');
            }
        })
    })


    module.exports = router;
