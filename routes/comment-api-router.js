const express  = require("express");
const router   = express.Router();
const mongoose = require('mongoose');
const Comment  = require('../models/commentModel');


// POST   /api/comments
router.post("/comments", (req, res, next) =>{
  const { comment, week } = req.body;
  const user = req.user;

  Comment.find({week: week}).then(comments => {
    if (!comments.length) {
      Comment.create({ comment, week, user })
      .then((newComment)=>{
        res.json(newComment);
      })
      .catch((err)=>{
        next(err);
      })
    }
    else {
      const existingComment = comments[0]
      Comment.update({_id: existingComment._id}, {$push: {comment: comment}}).then(() => {
        res.json({message: "updated comment success!"})
      })
    }
  })


});


// GET    
router.get("/comments", (req, res, next)=>{
  // console.log(req.user);
  Comment
    .find({user: req.user})
    .limit(20)
    .sort({createdAt: -1})
    .then((comments)=>{
      res.json(comments);
    })
    .catch((err)=>{
      next(err);
    });
});

// GET    
router.get("/comment/:commentId", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.commentId)){
    next(); //show 404
    return;
  }
  Comment.findById(req.params.commentId)
    .then((comment) => {
      if (!comment){
        next();//show 404 if no phone was found
        return;
      }
      res.json(comment);
    })
    .catch((err)=>{
      next(err);
    });
});



// PUT    
router.put("/comment/:commentId", (req, res, next)=>{
  if (!mongoose.Types.ObjectId.isValid(req.params.commentId)){
    next();//show 404
    return;
  }
  const { comment, week, user } = req.body;

  Comment.findByIdAndUpdate(
    req.params.phoneId,
    { comment, week, user }, //it's what we want to edit
    { runValidators: true, new: true } //run the validation, "new" gets us the updated version
  )
  .then((updatedComment)=>{
    res.json(updatedComment);
  })
  .catch((err)=>{
    next(err)
  });
});

// DELETE 
router.delete("/comment/:commentId", (req, res, next)=>{
  if (!mongoose.Types.ObjectId.isValid(req.params.commentId)){
    next();//show 404
    return;
  }
  Comment.findByIdAndRemove(req.params.commentId)
    .then((removedComment)=>{
      if (!removedComment){
        next();
        return;
      }
      res.json(removedComment);
    })
    .catch((err)=>{
      next(err);
    });
});


module.exports = router;