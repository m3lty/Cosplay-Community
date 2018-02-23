var express = require("express");
var router = express.Router();
var Cosplays = require("../models/cosplay");
var Conventions = require("../models/cons");
var User = require("../models/user");
var multer = require("multer");
var path = require("path");
var tools = require("../public/js/index.js");
var fs = require("fs");
var middleware = require("../middleware");

var upload = multer({storage: multer.diskStorage({
  destination: function(req, file, callback){
    callback(null, "public/assets/images/cosplay");
  },
  filename: function(req, file, callback){
    callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }})
});
//=================
//Cosplay Landing page
//=================
router.get("/", function(req, res){
  Cosplays.find({}, function(err, cosplays){
    if(err){
      console.log(err);
    } else {
      res.render("cosplay/index", {cosplays:cosplays});

    }
  });
});
//=============================
// New Cosplay page
//=============================
router.get("/new", middleware.isLoggedIn, function(req, res){
  Conventions.find({}, function(err, cons){
    if(err){
      console.log(err);
    } else {
        res.render("cosplay/new", {cons:cons});
    }
  });

});
//==========================
// New Cosplay POST
//==========================
router.post("/", middleware.isLoggedIn, upload.single("usrPhoto"), function(req, res){
  var character = req.body.character;
  var series = req.body.series;
  var image = req.file.path.slice(6);
  var uploaded = Date.now();
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCosplay = {character:character,series:series,image:image, uploaded:uploaded, author:author};


  Cosplays.create(newCosplay, function(err, newCosplay){
    if(err){
      console.log(err);
    } else {
      console.log("Cosplay " + req.body.character + " had been posted by " + req.user.username);
      User.findById(req.user._id, function(err, user){
        if(err){
          console.log(err);
        } else {
          user.uploads.push(newCosplay._id);
          console.log(newCosplay._id);
          console.log(newCosplay.id);
          console.log(newCosplay);
          user.save();
        }
      });
      res.redirect("/");
    }
  });



});

router.get("/:id", function(req, res){
  res.render("cosplay/show");
})

module.exports = router;
