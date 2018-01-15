  var express = require("express");
var router = express.Router();
var multer = require("multer");
var path = require("path");
var fs = require("fs");
var upload = multer({storage: multer.diskStorage({
  destination: function(req, file, callback){
    callback(null, "public/assets/images/cons");
  },
  filename: function(req, file, callback){
    callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }})
});

var Conventions = require("../models/cons");

router.get("/", function(req, res){
  Conventions.find({}, function(err, conventions){
    if(err){
      console.log(err);
    } else {
      res.render("conventions/index", {conventions:conventions});
    }
  });

});
//create new conventions
router.get("/newcon", isLoggedIn, function(req, res){
  res.render("conventions/newcon");
});
//====================
// New Convention POST
//====================

router.post("/", isLoggedIn, upload.single("conImg"), function(req, res){
  var name = req.body.name;
  var location = req.body.location;
  var image = req.file.path.slice(6);
  var description = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCon = {name:name, location:location, image:image, description:description, author: author};

  Conventions.create(newCon, function(err, newlyAdded){
    if(err){
      console.log(err);
    } else {
      console.log("Convention " + req.body.name + " has been added by " + req.user.username + " at " + Date.now());
      res.redirect("/");
    }
  })
});

//creates page for ID convention
router.get("/:id", function(req, res){
  Conventions.findById(req.params.id).populate("comments").exec(function(err, foundCon){
    if(err){
      console.log(err);
    } else {
      res.render("conventions/show", {convention: foundCon});
    }
  });
});

//EDIT Con
router.get("/:id/edit", checkOwnership, function(req, res){
    Conventions.findById(req.params.id, function(err, convention){
    res.render("conventions/edit", {convention:convention});
  });
});
//UPDATE CON
router.put("/:id",checkOwnership, function(req, res){
  //find and update convention and redir
  Conventions.findByIdAndUpdate(req.params.id, req.body.convention, function(err, updatedConvention){
    if(err){
      res.redirect("/cons");
    } else {

        res.redirect("/cons/" + req.params.id);

    }
  });
});
//==================
//DELETE CON ROUTE
//==================
router.delete("/:id",checkOwnership, function(req, res){
  Conventions.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/cons");
    } else {
      res.redirect("/cons");
    }
  })
});



function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
};

function checkOwnership(req, res, next){
  if (req.isAuthenticated()){
    Conventions.findById(req.params.id, function(err, convention){
      if(err){
        res.redirect("back");
      } else {
            if (convention.author.id.equals(req.user._id)){
              next();
            } else {
              res.redirect("back");
            }
      }
    });

  } else {
    res.redirect("back");
  }
};

module.exports = router;
