var express = require("express");
var router = express.Router({mergeParams: true});
var Conventions = require("../models/cons");
var Comment = require("../models/comment");
//=========
// New comment page
//=========
router.get("/new", isLoggedIn, function(req, res){
  Conventions.findById(req.params.id, function(err, convention){
    if(err){
      console.log(err);
    } else {
        res.render("comments/new",{convention: convention});
    }
  });
});

//=================
//New comment POST
//=================

router.post("/", isLoggedIn, function(req, res){
  Conventions.findById(req.params.id, function(err, convention){
    if(err){
      console.log(err);
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err);
        } else{
              comment.author.id = req.user._id;
              comment.author.username = req.user.username;
              comment.save();
              console.log(comment);
              convention.comments.push(comment);
              convention.save();
              res.redirect("/cons/" + convention._id);
        }
      })

    }
  });
});

router.get("/:comment_id/edit", function(req, res){
  res.render("comments/edit");
});


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}


module.exports = router;
