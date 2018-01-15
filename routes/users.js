var express = require("express");
var router = express.Router();
var Users = require("../models/user.js");

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
  Users.findById(req.params.id).exec(function(err, foundUser){
    if (err){
      console.log(err);
    } else {
      console.log(foundUser);
      res.render("user/profile", {user: foundUser});
    }
  });
});

module.exports = router;
