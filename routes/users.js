var express = require("express");
var router = express.Router();
var Users = require("../models/user");

//===============
// USER LIST ROUTE
//===============
router.get("/", function(req, res){
  Users.find({}, function(err, users){
    if (err){
      console.log(err);
    } else {
      res.render("user/users", {users:users});
    }
  });
});


//==============
// USER SHOW ROUTE
//==============

router.get("/:id", function(req, res){
  Users.findById(req.params.id).populate("attending").exec(function(err, foundUser){
    if (err){
      console.log(err);
    } else {
      console.log(foundUser);
      res.render("user/profile", {user: foundUser});
    }
  });
});
//================
//User Edit Route
//================
router.get("/:id/edit", function(req, res){
  Users.findById(req.params.id, function(err, user){
    res.render("user/edit", {user: user});
  });
});

router.put("/:id", function(req, res){
  Users.findById(req.params.id, function(err, user){
    if (err){
      console.log(err);
    } else {
    console.log(req.body.update);
    user.bio = req.body.update.bio;
    user.socialmedia.twitter = req.body.update.twitter;
    user.socialmedia.instagram = req.body.update.instagram;
    user.socialmedia.tumblr = req.body.update.tumblr;
    user.socialmedia.facebook = req.body.update.facebook;
    user.save();
    res.redirect("/");
  }
});
})

module.exports = router;
