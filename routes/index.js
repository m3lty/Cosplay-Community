var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Conventions = require("../models/cons");
var Cosplays = require("../models/cosplay");
var tools = require("../public/js/index.js");
var multer = require("multer");
var path = require("path");
var middleware = require("../middleware/index")
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
  Conventions.find({}, function(err, conventions){
    if(err){
      console.log(err);
    } else {
      Cosplays.find({}, function(err,cosplays){
        if(err){
          console.log(err);
        } else {
          conventions.sort(tools.upcomingSort);
          cosplays.sort(tools.upcomingSort);
          User.find({}, function(err, users){
            if(err){
              console.log(err);
            } else {
              if(req.user){
                res.render("userhome", {conventions:conventions, cosplays:cosplays, users:users});
              } else {
                res.render("landing", {conventions:conventions, cosplays:cosplays, users:users});
              }
            }
          });
        }
      });
    }
  });
});



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
      return res.redirect("back");
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
  successRedirect: "/",
  failureRedirect: "back"
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
