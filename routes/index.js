var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Conventions = require("../models/cons");
var multer = require("multer");
var path = require("path");
var upload = multer({storage: multer.diskStorage({
  destination: function(req, file, callback){
    callback(null, "public/assets/images/usr");
  },
  filename: function(req, file, callback){
    callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }})
});

//==========================
// LANDING PAGE ROUTE
//==========================

router.get("/", function(req, res){
  res.render("landing");
})
//==========================
// NEW USER PAGE ROUTE
//==========================
router.get("/register", function(req,res){
  res.render("register");
});
//===================
// NEW USER POST
//===================
router.post("/register", function(req, res){
  var newUser = new User({
    username: req.body.username,
    email: req.body.email,
    birthday:req.body.birthday
  });
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      console.log("User " + req.body.username + " registered at " + Date.now());
      res.redirect("/");
    });
  });

});

//login logic
router.get("/login", function(req,res){
  res.render("login");
});

router.post("/login", userToLowerCase, passport.authenticate("local", {
  successRedirect: "/cons",
  failureRedirect: "/login"
}), function(req, res){

  User.findOne({ username: username.toLowerCase() }).exec(callback)

});

//logout logic
router.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});



function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
};

function userToLowerCase(req, res, next){
  req.body.username = req.body.username.toLowerCase();
  next();
}

module.exports = router;
