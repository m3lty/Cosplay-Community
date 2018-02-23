var express = require("express");
var router = express.Router();
var multer = require("multer");
var path = require("path");
var fs = require("fs");
var middleware = require("../middleware")
var tools = require("../public/js/index.js");
var upload = multer({storage: multer.diskStorage({
  destination: function(req, file, callback){
    callback(null, "public/assets/images/cons");
  },
  filename: function(req, file, callback){
    callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }})
});
var Conventions = require("../models/cons");
var User = require("../models/user");
//================
//convention list index page; upcoming etc etc
//================
router.get("/", function(req, res){
  Conventions.find({}, function(err, conventions){
    if(err){
      console.log(err);
    } else {
      conventions.sort(tools.upcomingSort);
      res.render("conventions/index", {conventions:conventions});
    }
  });

});
//==============
//full convention list
//==============
router.get("/showall", function(req,res){
  Conventions.find({}, function(err, conventions){
    if(err){
      console.log(err);
    } else {
      conventions.sort(tools.alphaSort);
      res.render("conventions/showall", {conventions:conventions});
    }
  });
})

//create new conventions
router.get("/newcon", middleware.isLoggedIn, function(req, res){
  res.render("conventions/newcon");
});
//====================
// New Convention POST
//====================

router.post("/", middleware.isLoggedIn, upload.single("conImg"), function(req, res){
  var name = req.body.name;
  var location = req.body.location;
  var image = req.file.path.slice(6);
  var date = req.body.date;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCon = {name:name, location:location, image:image, date:date, author: author};

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
  Conventions.findById(req.params.id).populate("comments").populate("attending").exec(function(err, foundCon){
    if(err){
      console.log(err);
    } else {
      res.render("conventions/show", {convention: foundCon});
    }
  });
});

//EDIT Con
router.get("/:id/edit", middleware.checkConOwnership, function(req, res){
    Conventions.findById(req.params.id, function(err, convention){
    res.render("conventions/edit", {convention:convention});
  });
});
//UPDATE CON
router.put("/:id",middleware.checkConOwnership, function(req, res){
  //find and update convention and redir
  Conventions.findByIdAndUpdate(req.params.id, req.body.convention, function(err, updatedConvention){
    if(err){
      res.redirect("/cons");
    } else {
        console.log(req.body.convention);
        res.redirect("/cons/" + req.params.id);

    }
  });
});
//==================
//DELETE CON ROUTE
//==================
router.delete("/:id",middleware.checkConOwnership, function(req, res){
  Conventions.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/cons");
    } else {
      res.redirect("/cons");
    }
  })
});
//====================
// ATTENDING LOGIC
//====================
router.post("/:id/attending", middleware.isLoggedIn, function(req, res){
  User.findById(req.user._id, function(err, user){
    if(err){
      console.log(err);
    } else {
      user.attending.push(req.params.id);
      user.save();
      Conventions.findById(req.params.id, function(err, con){
        if(err){
          console.log(err);
        } else {
          con.attending.push(req.user);
          con.save();
        }
      });
      res.redirect("back")
    }
  });
});

router.put("/:id/unattend", middleware.isLoggedIn, function(req, res){
  User.findById(req.user._id, function(err, user){
    if(err){
      console.log(err);
    } else {
      user.attending.remove(req.params.id);
      user.save();
      Conventions.findById(req.params.id, function(err, con){
        con.attending.remove(req.user._id);
        con.save();
      });
      res.redirect("back");
    }
  })
})




module.exports = router;
