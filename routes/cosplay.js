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
  var defaultPicture = req.file.path.slice(6);
  var desc = req.body.desc;
  var uploaded = Date.now();
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCosplay = {character:character,desc:desc,series:series,defaultPicture:defaultPicture, uploaded:uploaded, author:author};


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

//=================
// SHOW COSPLAY PAGE
//=================


router.get("/:id", function(req, res){
  Cosplays.findById(req.params.id).exec(function(err, foundCosplay){
    if(err){
      console.log(err);
    } else {
      res.render("cosplay/show", {cosplay: foundCosplay});
    }
  });

});
//================
//Delete COSPLAY
//================
router.delete("/:id", middleware.checkCosplayOwnership, function(req, res){
  Cosplays.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/cosplay");
    } else {
      res.redirect("/cosplay");
    }
  });
});
//===============
//Cosplay LIKE logic
//===============
router.post("/:id/like", middleware.isLoggedIn, function(req, res){
  User.findById(req.user._id, function(err, user){
    if(err){
      console.log(err);
    } else {
      user.likes.push(req.params.id);
      user.save();
      Cosplays.findById(req.params.id, function(err, cosplay){
        if(err){
          console.log(err);
        } else {
          cosplay.likedBy.push(req.user);
          cosplay.save();

          User.findById(cosplay.author.id, function(err, user){
              if(err){ console.log(err);}
              var notify = {
                from: req.user,
                about: req.params.id
              };
              user.notification.push(notify);
              user.save();

              console.log(user.notification);
          });
        }
      });
      res.redirect("back");
    }
  });
});
//================
//Cosplay UNLIKE
//================
router.put("/:id/unlike", middleware.isLoggedIn, function(req,res){
  User.findById(req.user._id, function(err, user){
    if(err){
      console.log(err);
    } else {
      user.likes.remove(req.params.id);
      user.save();
      Cosplays.findById(req.params.id, function(err, cosplay){
        cosplay.likedBy.remove(req.user._id);
        cosplay.save();
      });
      res.redirect("back");
    }
  })
});
//==================
//Edit Cosplay
//==================
router.get("/:id/edit", middleware.checkCosplayOwnership, function(req, res){
  Cosplays.findById(req.params.id, function(err, cosplay){
    res.render("cosplay/edit", {cosplay:cosplay});
  });
});
//==================
//Update Cosplay
//==================
router.put("/:id",middleware.checkCosplayOwnership, function(req, res){
  //find and update convention and redir
  Conventions.findByIdAndUpdate(req.params.id, req.body.cosplay, function(err, updatedCosplay){
    if(err){
      res.redirect("/cons");
    } else {
        console.log(req.body.convention);
        res.redirect("/cons/" + req.params.id);

    }
  });
});
//==================
//Delete Cosplay
//==================
router.delete("/:id", middleware.checkCosplayOwnership, function(req, res){
  Cosplays.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/");
    } else {
      res.redirect("/")
    }
  });
});
module.exports = router;
