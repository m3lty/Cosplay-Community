var middlewareObj = {};
var Conventions = require("../models/cons");
var Users = require("../models/user");
var Comments = require("../models/comment");


middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
};

middlewareObj.checkConOwnership = function(req, res, next){
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

module.exports = middlewareObj;
