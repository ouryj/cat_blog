let express = require('express'),
    router  = express.Router(),
    func     = require('../midlleware/index'),
    Cat      = require('../models/cat');
let Comment  = require('../models/comment');

    //new comment route
    router.get('/cats/:id/comments/new',function(req,res){
        Cat.findById(req.params.id,function(err,cat){
            if(err){
                console.log(err);
                res.redirect('back');
            }else{
                res.render('../views/comments/new',{cat:cat});
            }
        })
    })
    //comments create
    router.post('/cats/:id/comments',func.isAuth,(req,res)=>{
        Cat.findById(req.params.id,(err,cat)=>{
            if(err){
                console.log(err);
                res.redirect('back');
            } else{
                let author = { id: req.user._id, username: req.user.username};
                let newComment = new Comment({text: req.body.text, author:author});
                Comment.create(newComment,(err,comment)=>{
                    if(err){
                        console.log(err);
                        res.redirect('back');
                    }else{
                        cat.comments.push(comment);
                        cat.save();
                        res.redirect('/cats/'+req.params.id);
                    }
                })
            }
        })
    })
    // edit comment
    router.get('/cats/:id/comments/:comment_id/edit',func.commentOwner,(req,res)=>{
      Cat.findById(req.params.id,(err,cat)=>{
          if(err){
              console.log(err);
              res.redirect('back');
          }else{
              Comment.findById(req.params.comment_id,(err,comment)=>{
                  if(err){
                      console.log(err);
                      res.redirect('back');
                  }else{
                      res.render('../views/comments/edit',{cat:cat,comment:comment});
                  }
              })
          }
      })
    })
    // update comment
    router.put('/cats/:id/comments/:comment_id',func.commentOwner,(req,res)=>{
        Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,(err)=>{
            if(err){
                console.log(err);
                res.redirect('back');
            }else{
                res.redirect('/cats/'+req.params.id);
            }
        })
    })
    //delete comment 
    router.delete('/cats/:id/comments/:comment_id',func.commentOwner,(req,res)=>{
        Comment.findByIdAndDelete(req.params.comment_id,(err)=>{
            if(err){
                console.log(err);
                res.redirect('back');
            }else{
                res.redirect('/cats/'+req.params.id);
            }
        })
    })


       
     
    

    module.exports = router