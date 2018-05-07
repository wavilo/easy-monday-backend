const express  = require("express");
const router   = express.Router();
const mongoose = require('mongoose');
const Comment  = require('../models/commentModel');


// POST   /api/comments
router.post("/comments", (req, res, next) =>{
  const { comment, week, user } = req.body;
  Comment.create({ comment, week, user })
    .then((newComment)=>{
      res.json(newComment);
    })
    .catch((err)=>{
      next(err);
    })
  //res.json(req.body);
});

//une fois avec les 2 lignes const {blah...} et res.json(req.body) on va sur postman pour voir si c'est connecté en faisant POST - localhost:3000/api/phones et en retrant dans Body et json(application).
//si on voit c'est bon !!
//on peut écrire le reste et voir que ça rentre dans mongoDB

// GET    /api/phones
router.get("/comments", (req, res, next)=>{
  Comment
    .find()
    .limit(20)
    .sort({createdAt: -1}) //from newest to older
    .then((comments)=>{
      res.json(comments);
    })
    .catch((err)=>{
      next(err);
    });
});

// GET    /api/phone/:phoneId
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

//dans postman on peut donc faire une get sur http://localhost:3000/api/phone/5af0105070c2c7929eeb91c3 et voir l'ID de ce téléphone qui est dans mongoDb

// PUT    /api/phone/:phoneId
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

// DELETE /api/phone/:phoneId
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